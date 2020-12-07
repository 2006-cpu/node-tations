import React, { useState } from 'react';
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

export const CartProductCard = ({ product, token, setUpdate }) => {
	const [quantity, setQuantity] = useState(1);

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

	const handleUpdateQuantity = async e => {
		e.preventDefault();
	
		const editOrderProduct = await callApi({
			path: `/order_products/${product.orderProductId}`,
			method: 'PATCH',
			token
		}, {quantity: quantity, price: product.price});
	
		console.log(editOrderProduct);
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
			<Text fontSize='sm'>Quantity: {product.quantity}</Text>
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
			<Button maxW='100px' color={'black'} onClick={e => handleUpdateQuantity(e)}>
				Update Quantity
			</Button>
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
