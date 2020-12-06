import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Image, Text, Button, InputGroup, Box, Input, InputRightAddon, IconButton } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';
import { callApi } from '../api';
import './productpreviewcard.css'
import { text, submit, click} from '@chakra-ui/react';
export const ProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [review, setReview] = useState('');
	console.log("ohboyreview:", review);
	const [newReview, setNewReview] = useState(false)
	console.log(newReview)
	

	const fetchProduct = async () => {
		const productData = await callApi({ path: `/products/${productId}` });
		setProduct(productData);
	};

	const handleAddReviewSubmit = async () => {
		
		try {
			const {createReview} = await callApi(
				{ method: 'patch', path: `/reviews/products/${productId}`},
				{
					reviews: review ? review : product.review
                }
			);
			console.log("newReview:", createReview);
			console.log("just maybe" , review)
			setReview(review);

		} catch (error) {
			console.log(error);
		}
	};
	const handleAddToCart = async e => {
		e.preventDefault();

		const [existingOrder] = await callApi({ path: '/orders/cart', token });

		if (!existingOrder) {
			const newOrder = await callApi(
				{ path: '/orders', method: 'POST', token },
				{ status: 'created' }
			);
			console.log(newOrder);

			const addProductToOrder = await callApi(
				{
					path: `/orders/${newOrder.id}/products`,
					method: 'POST',
					token
				},
				{ productId, price: product.price, quantity: 1 }
			);
		} else {
			console.log('user has existing orders');

			const addProductToOrder = await callApi(
				{
					path: `/orders/${existingOrder.id}/products`,
					method: 'POST',
					token
				},
				{ productId, price: product.price, quantity: 1 }
			);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		fetchProduct();
	}, [review]);

	return (
		<Grid className='products' maxW="fit-content"  >
			<Text>{product.name}</Text>
			<Image src={product.imageurl}></Image>
			<Text>{product.description}</Text>
			<Text>{product.category}</Text>
			<Text>{product.price}</Text>
			
			
			<Button maxW='100px' color="black" onSubmit={e => handleAddToCart(e)}>
				Add to Cart
			</Button>
			<InputGroup >
				<Input placeholder='Review' setReview={setReview} onChange={(event) => {
					event.preventDefault();
					setReview(event.target.value)

				}} ></Input>
				<InputRightAddon>
					<IconButton icon={<FaComment />} value={setNewReview && review} color="black"  onClick={() => {
						console.log("review:", review)
						handleAddReviewSubmit()
						setNewReview(true)
					}} />
				</InputRightAddon>
			</InputGroup>
			{newReview ? <Box border="5px groove white" borderRadius={'20px'}><Text>{review}</Text></Box> : ""}
		</Grid>
	);
};
