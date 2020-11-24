const ordersRouter = require('express').Router();
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
	const { id } = req.user
	try {
		const cartOrders = await getCartByUser(id);
		res.send({ cartOrders });
	} catch (error) {}
});

ordersRouter.post('/', async (req, res, next) => {
	const { status } = req.body;

	try {
		const newOrder = await createOrder(status, req.user.id);

		res.send({ newOrder });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

ordersRouter.get('/users/:userId/orders', async (req, res, next) => {
	const { userId } = req.params;
	try {
		const cartToCheckout = await getPendingOrdersByUser(userId);

		console.log('newlyAddedProduct:', newProduct);
		req.user
			? res.send({
					cartToCheckout: cartToCheckout
			  })
			: null;
	} catch (error) {}
});

module.exports = { ordersRouter };
