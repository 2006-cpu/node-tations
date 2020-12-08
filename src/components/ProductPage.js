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
	InputGroup,
	Box,
	Input,
	InputRightAddon,
	IconButton,
	useToast
} from '@chakra-ui/react';
import { callApi } from '../api';
import { storeCart } from '../auth';


import {} from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa';

import './productpreviewcard.css'
import { text, submit, click} from '@chakra-ui/react';
// const getUserById  =  require('../../db/users');
// import { createReview } from '../../db/reviews';
// import { getUser, getUserById } from '../../db/users';
export const ProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [review, setReview] = useState('');

	const [cart , setCart] = useState([{}]);
	const [user , setUser] = useState({});
	console.log("user;", user)
	const [reviews, setReviews] = useState([]);
	const [singleReview, setSingleReview] = useState('');
	console.log(singleReview)
	console.log("testreview:", reviews)
	const [newReview, setNewReview] = useState(false)
	const [quantity, setQuantity] = useState(1);
	const toast = useToast();

	const fetchProduct = async () => {
		try {
			const productData = await callApi({ path: `/products/${productId}` });
			// console.log("postedreview:", productData)
			setProduct(productData);
		} catch (error) {
			
		}
	
		
	};

	const fetchReviews = async () => {
		try {
			const config = {
				method: 'GET',
				path: `/reviews/products`
				
			};
			
			const productData = await callApi(config);
			console.log("test:", productData)
			setReviews(productData);
			
		} catch (error) {
			
		}
		
	};

	const fetchReview = async () => {
		try {
			const config = {
				method: 'GET',
				path: `/reviews/products/${productId}`
				
			};
			
			const productData = await callApi(config);
			console.log("test:", productData)
			setSingleReview(productData)
			;
			
		} catch (error) {
			
		}
		
	};

	const handleAddReviewSubmit = async () => {
		
		const config = {
			method: 'POST',
			path: `/reviews/products/${productId}`,
			content: reviews.content,
			userId : currentUser.id 
		};
		
		try {
			
			console.log("user;", user)
			const createReview = await callApi({
			path: `/reviews/products/${productId}`, method: 'POST'}, { content : review ,  userId : currentUser.id});
			// console.log("newReview:", createReview );
			// console.log("just maybe" , review)
			setNewReview(true);
			console.log('freshreview:', {createReview});

		} catch (error) {
			console.log(error);
		}
	};
	const handleAddToCart = async e => {
		e.preventDefault();
		try {
			


		if(!cart && !token)
		{
			product.quantity = quantity
			let carts = [product]
			setCart(carts)
			storeCart(carts)
		} else if (cart && !token)
		{
			product.quantity = quantity
			cart.push(product)
			setCart(cart)
			storeCart(cart)
		} else
		{
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
				if (addProductToOrder.success) {
					toast({
						title: addProductToOrder.message,
						status: 'success',
						duration: '5000',
						isClosable: 'true',
						position: 'top'
					});
				}
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
				if (addProductToOrder.success) {
					toast({
						title: addProductToOrder.message,
						status: 'success',
						duration: '5000',
						isClosable: 'true',
						position: 'top'
					});
				}
			}
		};
		
		} catch (error) {
			
		}
		
	};



	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		fetchReviews().then(setNewReview(false));
		
		
	}, [newReview === true]);

	// useEffect(() => {
		
	// 	fetchReviews();
	// }, []);

	return (
		<Grid maxW="50%" className='products'>
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
			<Button
				maxW='100px'
				color={'black'}
				onClick={e => handleAddToCart(e)}
			>
				Add to Cart
			</Button>
			<InputGroup onChange={(e)=>{
				e.preventDefault()
				console.log(e.target.value)
				setReview(e.target.value)
				
			}}>
				<Input placeholder='Review' setReview={setReview} onSubmit={(event) => {
					event.preventDefault()
					console.log(event.target.value)
					setReview(event.target.value);
					
					

				}} ></Input>
				<InputRightAddon>
					<IconButton icon={<FaComment />} value={setNewReview} color="black"  onClick={(event) => {
						
						event.preventDefault();
						
						handleAddReviewSubmit()
						setNewReview(true)

					}} />
				</InputRightAddon>
			</InputGroup>
			{<Box className='reviews' value={reviews} letterSpacing={'1.5px'} padding={'8px'} border="5px groove white" borderRadius={'20px'}><Text> Reviews : { reviews && reviews.map((review, idx) => 
			
			<>
			<Text></Text>
			<Text> <b><i>{review.userId === currentUser.id ? currentUser.username : "Member:"}</i></b> : {review.productId === product.id ? review.content : ""}</Text>
			
			
			</>
			)}</Text></Box>}
		</Grid>
	);
};
