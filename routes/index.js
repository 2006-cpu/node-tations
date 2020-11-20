const apiRouter = require('express').Router();
const { productsRouter } = require('./products');
const { usersRouter } = require('./users');
const { ordersRouter } = require('./orders');

apiRouter.get('/', (req, res, next) => {
	res.send({
		message: 'API is under construction!'
	});
});

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', ordersRouter);

module.exports = { apiRouter };
