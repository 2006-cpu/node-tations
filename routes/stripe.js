const stripeRouter = require('express').Router();
const { LOCAL_URL, STRIPE_KEY } = process.env;
const stripe = require('stripe')(process.env.STRIPE_KEY);
// const { requireUser } = require('./utils');
const { getCartByUser } = require('../db/orders');

stripeRouter.post('/create-session', async (req, res, next) => {
	const { cartId } = req.body;
	const { id } = req.user;
	console.log(cartId);
	try {
		if (req.user && cartId) {
			
	
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: await buildLineItems(id),
				mode: 'payment',
				success_url: `${process.env.LOCAL_URL}/myorders?success=true&cartId=${cartId}`,
				cancel_url: `${process.env.LOCAL_URL}/cart?canceled=true`
			});
	
			console.log(session);
	
			res.send({ id: session.id });
		} else {
			const { line_items } = req.body;
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: line_items,
				mode: 'payment',
				success_url: `${process.env.LOCAL_URL + '/store?success=true'}`,
				cancel_url: `${process.env.LOCAL_URL + '/cart?canceled=true'}`
			});
	
			res.send({ id: session.id });
		}
	} catch (error) {
		
	}
	
	
});

const convertToCents = total => {
	let cents = total * 100;
	Math.trunc(cents);
	return cents;
};

const buildLineItems = async userId => {
	console.log(userId);
	let id = userId;
	try {
		const [cartData] = await getCartByUser(id);

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
	} catch (error) {
		
	}
	
};

module.exports = { stripeRouter };
