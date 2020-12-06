import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	Grid,
	Image,
	Text,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper
} from '@chakra-ui/react';
import { callApi } from '../api';

export const ProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);

	const fetchProduct = async () => {
		const productData = await callApi({ path: `/products/${productId}` });
		setProduct(productData);
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
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	return (
		<Grid>
			<Text>{product.name}</Text>
			<Image src={product.imageurl}></Image>
			<Text>{product.description}</Text>
			<Text>{product.category}</Text>
			<Text>{product.price}</Text>
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
			<Button maxW='100px' onClick={e => handleAddToCart(e)}>
				Add to Cart
			</Button>
		</Grid>
	);
};
