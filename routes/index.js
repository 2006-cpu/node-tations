const apiRouter = require('express').Router();
const { getAllProducts, getProductById } = require('../db/products');

apiRouter.get('/', (req, res, next) => {
	res.send({
		message: 'API is under construction!'
	});
});

apiRouter.get('/products', async (req, res, next) => {
	try {
		const products = await getAllProducts();
		console.log('products:', products);
		res.send({
			message: products
		});
	} catch (error) {}
});

apiRouter.get('/product/:productId', async (req, res, next) => {
	const { productId } = req.params;
	try {
		const products = await getProductById(productId);
		console.log('products:', products);
		res.send({
			message: products
		});
	} catch (error) {}
});

module.exports = apiRouter;
