const apiRouter = require('express').Router();
const { productsRouter } = require('./products');

apiRouter.get('/', (req, res, next) => {
	res.send({
		message: 'API is under construction!'
	});
});

apiRouter.use('/products', productsRouter);

module.exports = { apiRouter, productsRouter };
