const stripeRouter = require('express').Router();
const { LOCAL_URL, STRIPE_KEY } = process.env;
const stripe = require('stripe')(STRIPE_KEY);
const { requireUser } = require('./utils');
const { getCartByUser } = require('../db/orders');

stripeRouter.post('/create-session', requireUser, async (req, res, next) => {
	const { id } = req.user;

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: await buildLineItems(id),
		mode: 'payment',
		success_url: `${LOCAL_URL + '/cart'}`,
		cancel_url: `${LOCAL_URL + '/cart'}`
	});

	res.send({ id: session.id });
});

const convertToCents = total => {
	cents = total * 100;
	Math.trunc(cents);
	return cents;
};

const buildLineItems = async userId => {
	const [cartData] = await getCartByUser(userId);

	let stripeItems = [];

	cartData.products.forEach(product => {
		stripeItems.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.name,
					images: [product.imageurl]
				},
				unit_amount: convertToCents(product.price)
			},
			quantity: Math.trunc(product.quantity)
		});
	});

	return stripeItems;
};

module.exports = { stripeRouter };
