const stripeRouter = require('express').Router();
const stripe = require('stripe');

stripeRouter.post('/create-session', (req, res, next) => {
	res.send('wasup');
});

module.exports = { stripeRouter };
