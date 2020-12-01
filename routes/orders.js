const ordersRouter = require('express').Router();
const { getAllOrders, getCartByUser, createOrder } = require('../db/orders');
const { getOrderProductById, addProductToOrder, updateOrderProduct } = require('../db/order_products');
const { requireUser, requireAdmin } = require('./utils');

ordersRouter.get('/', requireAdmin, async (req, res, next) => {
	try {
		const orders = await getAllOrders();
		res.send( orders );
	} catch ({ name, message }) {
		next({ name, message });
	}
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
	const { id } = req.user
	try {
		const cartOrders = await getCartByUser(id);
		res.send({ cartOrders });
	} catch ({ name, message }) {
		next({ name, message }); }
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

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
	const { productId, price, quantity } = req.body;
	const { orderId } = req.params;

	try {
		const existingProductOrder = await getOrderProductById(orderId)
		if (existingProductOrder === null)
		{
			const newProductOrder = await addProductToOrder(orderId, productId, price, quantity);
			res.send({ newProductOrder });
		}
		else if (existingProductOrder.productId === productId)
		{
			const edittedProductOrder = await updateOrderProduct(existingProductOrder.id, price, quantity);
			res.send({ edittedProductOrder });
		}

	} catch ({ name, message }) {
		next({ name, message });
	}
});

module.exports = { ordersRouter };
