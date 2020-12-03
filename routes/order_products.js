const orderProductsRouter = require('express').Router();

const {
	updateOrderProduct,
	destroyOrderProduct,
	getUserOrderProducts
} = require('../db/order_products');
const { requireUser } = require('./utils');

//PATCH /order_products/:orderProductId (**)
//Update the quantity or price on the order product

orderProductsRouter.patch('/:orderProductId', requireUser, async (req, res) => {
	const { orderProductId } = req.params;
	const { price, quantity } = req.body;
	const { id } = req.user;
	try {
		const orderProducts = await getUserOrderProducts(id, orderProductId);
		if (orderProducts.id === orderProductId) {
			const order_products = await updateOrderProduct({
				id: orderProductId,
				price: price,
				quantity: quantity
			});

			res.send(order_products);
		} else {
			next({
				name: 'Incorrect User',
				message: 'You need to be the creator of the order'
			});
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});

orderProductsRouter.delete(
	'/:orderProductId',
	requireUser,
	async (req, res, next) => {
		let { orderProductId } = req.params;
		const { id } = req.user;

		orderProductId = Number(orderProductId);
		try {
			const [orderProducts] = await getUserOrderProducts(
				id,
				orderProductId
			);

			console.log(orderProducts);
			if (orderProducts.id == orderProductId) {
				const order_products = await destroyOrderProduct(
					orderProductId
				);

				res.send(order_products);
			} else {
				next({
					name: 'Incorrect User',
					message: 'You need to be the creator of the order'
				});
			}
		} catch ({ name, message }) {
			next({ name, message });
		}
	}
);

module.exports = { orderProductsRouter };
