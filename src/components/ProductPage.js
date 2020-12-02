import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid, Image, Text, Button } from '@chakra-ui/react';
import { callApi } from '../api';

export const ProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});

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
					path: `/orders/${existingOrder.id}/products`,
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

	return (
		<Grid>
			<Text>{product.name}</Text>
			<Image src={product.imageurl}></Image>
			<Text>{product.description}</Text>
			<Text>{product.category}</Text>
			<Text>{product.price}</Text>
			<Button maxW='100px' onClick={e => handleAddToCart(e)}>
				Add to Cart
			</Button>
		</Grid>
	);
};
