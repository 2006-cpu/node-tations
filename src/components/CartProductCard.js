import React from 'react';
import { Grid, Text, Image, Button } from '@chakra-ui/react';
import { callApi } from '../api';

export const CartProductCard = ({ product, token, setUpdate }) => {
	const handleRemoveFromCart = async e => {
		e.preventDefault();

		const deletedOrderProduct = await callApi({
			path: `/order_products/${product.orderProductId}`,
			method: 'DELETE',
			token
		});

		console.log(deletedOrderProduct);
		setUpdate(true);
	};

	return (
		<Grid
			border='1px solid black'
			margin='5px'
			padding='5px'
			justifySelf='left'
			width='33%'
		>
			<Text fontSize='xl'>{product.name}</Text>
			<Image src={product.imageurl} />
			<Text fontSize='md'>{product.description}</Text>
			<Text fontSize='sm'>${product.price}</Text>
			<Button
				width='50%'
				justifySelf='center'
				onClick={e => handleRemoveFromCart(e)}
			>
				Remove from cart
			</Button>
		</Grid>
	);
};
