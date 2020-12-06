const apiRouter = require('express').Router();

//Routers
const { productsRouter } = require('./products');
const { usersRouter } = require('./users');
const { ordersRouter } = require('./orders');
const { reviewsRouter } = require('./reviews');
const { orderProductsRouter } = require('./order_products');
const { stripeRouter } = require('./stripe');

//Auth utils
const { verify } = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { JWT_SECRET } = process.env;

apiRouter.use('/', async (req, res, next) => {
	const auth = req.header('Authorization');

	if (!auth) {
		return next();
	}

	if (auth.startsWith('Bearer ')) {
		const token = auth.slice('Bearer '.length);

		const { id } = verify(token, JWT_SECRET);

		if (id) {
			req.user = await getUserById(id);
			return next();
		}
	} else {
		next({ name: 'Auth error', message: 'Error in auth format' });
	}
});

apiRouter.use('/products', productsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/order_products', orderProductsRouter);
<<<<<<< HEAD
apiRouter.use('/reviews', reviewsRouter);

=======
apiRouter.use('/stripe', stripeRouter);
>>>>>>> dev

module.exports = { apiRouter };
