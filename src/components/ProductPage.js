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

import { FaComment } from 'react-icons/fa';

import './productpreviewcard.css';

export const ProductPage = ({ token, currentUser, cart, setCart }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [review, setReview] = useState('');
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const toast = useToast();

	const fetchProduct = async () => {
		try {
			const productData = await callApi({
				path: `/products/${productId}`
			});
			setProduct(productData);
		} catch (error) {}
	};

	const fetchReviews = async () => {
		try {
			const config = {
				method: 'GET',
				path: `/reviews/products`
			};

			const productData = await callApi(config);
			console.log('test:', productData);
			setReviews(productData);
		} catch (error) {}
	};

	const handleAddReviewSubmit = async () => {
		try {
			const createReview = await callApi(
				{
					path: `/reviews/products/${productId}`,
					method: 'POST'
				},
				{ content: review, userId: currentUser.id }
			);
			setNewReview(true);
			console.log(createReview);
		} catch (error) {
			console.log(error);
		}
	};
	const handleAddToCart = async e => {
		e.preventDefault();
		try {
			if (!cart && !token) {
				product.quantity = quantity;
				let carts = [product];
				setCart(carts);
				storeCart(carts);
				toast({
					title: 'Added to cart!',
					status: 'success',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			} else if (cart && !token) {
				product.quantity = quantity;
				cart.push(product);
				setCart(cart);
				storeCart(cart);
				toast({
					title: 'Added to cart!',
					status: 'success',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			} else {
				const [existingOrder] = await callApi({
					path: '/orders/cart',
					token
				});

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
			}
		} catch (error) {}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		fetchReviews().then(setNewReview(false));
	}, [newReview === true]);

	return (
		<Grid maxW='50%' className='products'>
			<Text>Name: {product.name}</Text>
			<Image src={product.imageurl}></Image>
			<Text>Description: {product.description}</Text>
			<Text>Price: ${product.price}</Text>
			<Text>Category: {product.category}</Text>
			<Text>inStock: {product.inStock ? 'True' : 'False'}</Text>
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
			{currentUser ? (
				<InputGroup
					onChange={e => {
						e.preventDefault();
						console.log(e.target.value);
						setReview(e.target.value);
					}}
				>
					<Input
						placeholder='Review'
						setReview={setReview}
						onSubmit={event => {
							event.preventDefault();
							console.log(event.target.value);
							setReview(event.target.value);
						}}
					></Input>
					<InputRightAddon>
						<IconButton
							icon={<FaComment />}
							value={setNewReview}
							color='black'
							onClick={event => {
								event.preventDefault();

								handleAddReviewSubmit();
								setNewReview(true);
							}}
						/>
					</InputRightAddon>
				</InputGroup>
			) : null}
			{
				<Box
					className='reviews'
					value={reviews}
					letterSpacing={'1.5px'}
					padding={'8px'}
					border='5px groove white'
					borderRadius={'20px'}
				>
					<Text>
						{' '}
						Reviews :{' '}
						{reviews &&
							reviews.map((review, idx) => (
								<>
									<Text>
										{review.productId === product.id
											? `${review.username} : ${review.content}`
											: ''}
									</Text>
								</>
							))}
					</Text>
				</Box>
			}
		</Grid>
	);
};
