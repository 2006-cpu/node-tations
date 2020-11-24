const ordersRouter = require('express').Router();
const { getAllProducts } = require('../db/products');
const { getAllOrders, getCartByUser, createOrder } = require('../db/orders');
const { requireUser, requireAdmin } = require('./utils');

ordersRouter.get('/', requireAdmin, async (req, res, next) => {
	try {
		const orders = await getAllOrders();
		res.send({ orders });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
	try {
		const cartOrders = await getCartByUser(req.user);
		res.send({ cartOrders });
	} catch (error) {}
});

ordersRouter.post('/', async (req, res, next) => {
	const { status } = req.body;
	const datePlaced = Date.now();

	try {
		const newOrder = await createOrder(status, req.user.id, datePlaced);

		res.send({ newOrder });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

ordersRouter.get('/users/:userId/orders', async (req, res, next) => {
	const { userId } = req.params;
	try {
		const cartToCheckout = await getPendingOrdersByUser(userId);
		// const orders = await getAllOrders();
		console.log('newlyAddedProduct:', newProduct);
		req.user
			? res.send({
					cartToCheckout: cartToCheckout
			  })
			: null;
	} catch (error) {}
});

module.exports = { ordersRouter };
