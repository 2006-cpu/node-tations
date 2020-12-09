
const reviewsRouter = require('express').Router();
const { getProductById } = require('../db/products');
const { getAllReviews, addReview, createReview } = require( '../db/reviews');



reviewsRouter.get('/products', async (req, res, next) => {
    
	try {
		const reviews = await getAllReviews();
		console.log('reviews:', reviews);
		res.send(reviews);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

reviewsRouter.get('/products/:productId', async (req, res, next) => {
    const {productId } = req.params
    const id = Number(productId);
	try {
		const {rows : review} = await getProductById(id)
		
		res.send(review);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

reviewsRouter.patch('/products/:productId', async (req, res, next) => {
    const {fields} = req.body
    const {productId} = req.params
    // const id = Number(productId);

   
    
	try {
   
        
		const updatedReview= await addReview( productId , fields );
		
		res.send(updatedReview);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

reviewsRouter.post('/products/:productId', async (req, res, next) => {
    const {productId} = req.params
    const { content, userId } = req.body;
    


   
    
	try {
   
        
		const { rows : updatedReview } = await createReview(  {content , userId , productId });
		
		res.send(updatedReview);
	} catch ({ name, message }) {
		next({ name, message });
	}
});






module.exports = { reviewsRouter };