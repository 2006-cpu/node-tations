
const reviewsRouter = require('express').Router();
const { getProductById } = require('../db/products');
const {getAllReviews, addReview} = require( '../db/reviews');



reviewsRouter.get('/products/:productId', async (req, res, next) => {
    const { review } = req.body
    const { productId} = req.params
	try {
		const reviews = await getAllReviews();
		console.log('reviews:', reviews);
		res.send(reviews);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

reviewsRouter.patch('/products/:productId', async (req, res, next) => {
    const {productId} = req.params
    const id = Number(productId);

   
    
	try {
   
        
		const updatedReview= await addReview( id, req.body);
		
		res.send(updatedReview);
	} catch ({ name, message }) {
		next({ name, message });
	}
});






module.exports = { reviewsRouter };