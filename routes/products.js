const productsRouter = require('express').Router();
const { getAllProducts, getProductById, createProducts, deleteProduct, updateProduct } = require('../db/products');
const { getOrderByProduct } = require('../db/orders');
const { requireAdmin } = require('./utils');

productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await getAllProducts();
		console.log('products:', products);
		res.send(products);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

productsRouter.get('/:productId', async (req, res, next) => {
	const { productId } = req.params;
	const id = Number(productId);
	try {
		const product = await getProductById(id);
		res.send(product);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

productsRouter.post('/', requireAdmin, async (req, res, next) => {
	
	try {
		const user = await createProducts(req.body);
		res.send(
			user
		);
	} catch ({ name, message }) {
		res.send({ name, message });
	};
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
	const { productId } = req.params;
	const id = Number(productId);

	try {
		const user = await deleteProduct(id);
		res.send(
			user
		);
	} catch ({ name, message }) {
		res.send({ name, message });
	};
});

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
	const { productId } = req.params;
	const id = Number(productId);

	try {
		const user = await updateProduct(id, req.body);
		res.send(
			user
		);
	} catch ({ name, message }) {
		res.send({ name, message });
	};
});

productsRouter.get('/:productId/orders', requireAdmin, async (req, res, next) => {
	const { productId } = req.params;
	const id = Number(productId);

	try {
		const user = await getOrderByProduct(id);
		res.send(
			user
		);
	} catch ({ name, message }) {
		res.send({ name, message });
	};
});

module.exports = { productsRouter };
