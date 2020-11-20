const productsRouter = require('express').Router();
const { getAllProducts, getProductById } = require('../db/products');

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

module.exports = { productsRouter };
