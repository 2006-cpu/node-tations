import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
	Grid,
	Image,
	Text,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	InputGroup, Box, Input, InputRightAddon, IconButton 
} from '@chakra-ui/react';
import { callApi } from '../api';

import { } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';

import './productpreviewcard.css'
export const ProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [review, setReview] = useState('');
	const [newReview, setNewReview] = useState(false)
	const [quantity, setQuantity] = useState(1);

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
				{ productId, price: product.price, quantity }
			);
			console.log(addProductToOrder)
		} else {
			console.log('user has existing orders');

			const addProductToOrder = await callApi(
				{
					path: `/orders/${existingOrder.id}/products`,
					method: 'POST',
					token
				},
				{ productId, price: product.price, quantity }
			);
			console.log(addProductToOrder)
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
			<Text>Name: {product.name}</Text>
			<Image src={product.imageurl}></Image>
			<Text>Description: {product.description}</Text>
			<Text>Price: ${product.price}</Text>
			<Text>Category: {product.category}</Text>
            <Text>inStock: {product.inStock ? 'True': 'False'}</Text>
			<NumberInput
				width='125px'
				min={1}
				max={10}
				value={quantity}
				onChange={value => setQuantity(value)}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Button maxW='100px' color={'black'} onClick={e => handleAddToCart(e)}>
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
			{newReview ? <Box letterSpacing={'1.5px'} padding={'8px'} border="5px groove white" borderRadius={'20px'}><Text>{ currentUser.username } : { review.toUpperCase()}</Text></Box> : ""}
		</Grid>
	);
};
