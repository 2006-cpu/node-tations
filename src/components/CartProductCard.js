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
	NumberDecrementStepper,
	useToast
} from '@chakra-ui/react';
import { callApi } from '../api';
import { clearCart, storeCart } from '../auth';

export const CartProductCard = ({ cart, setCart, product, token, setUpdate, cartProducts }) => {
	const [quantity, setQuantity] = useState(1);
	const toast = useToast();

	const handleRemoveFromCart = async (e, id) => {
		e.preventDefault();
		if(!token)
		{
			cart.splice(id, 1)
			setCart(cart);
			clearCart();
			storeCart(cart);
		} 
		else
		{
			const deletedOrderProduct = await callApi({
				path: `/order_products/${product.orderProductId}`,
				method: 'DELETE',
				token
			});
	
			if (deletedOrderProduct.success) {
				toast({
					title: deletedOrderProduct.message,
					status: 'success',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			}
	
			console.log(deletedOrderProduct);
			setUpdate(true);
		}
	};

	const handleUpdateQuantity = async (e, id) => {
		e.preventDefault();
		if(!token)
		{
			cart[id].quantity = quantity
			setCart(cart);
			clearCart();
			storeCart(cart);
		} 
		const editOrderProduct = await callApi(
			{
				path: `/order_products/${product.orderProductId}`,
				method: 'PATCH',
				token
			},
			{ quantity: quantity, price: product.price }
		);

		console.log(editOrderProduct);
		setUpdate(true);
	};

	return (
		<Grid
			
			borderRadius='10px'
			border='1px solid black'
			margin='5px'
			padding='5px'
			justifySelf='left'
			className="products"
		>	
			
			<Text fontSize='xl'>{product.name}</Text>
			<Image src={product.imageurl} />
			<Text fontSize='md'>{product.description}</Text>
			<Text fontSize='sm'>${product.price}</Text>
			<Text fontSize='sm'>Quantity: {product.quantity}</Text>
			<NumberInput
				min={1}
				max={10}
				value={quantity}
				onChange={value => setQuantity(value)}
			>
				<NumberInputField  fontSize='xl' color='black' backgroundColor='cornFlowerBlue'/>
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Button
				fontFamily='courier'
				letterSpacing='2px'
			    border='6px groove darkCyan'
				color={'black'}
				justifySelf='center'
				onClick={e => handleUpdateQuantity(e, cartProducts.indexOf(product))}
			>
				Update Quantity
			</Button>
			<Button

				fontFamily='courier'
				letterSpacing='2px'
				border='6px groove darkCyan'
				color={'black'}
				justifySelf='center'
				onClick={e => handleRemoveFromCart(e, cartProducts.indexOf(product))}
			>
				Remove from cart
			</Button>
		</Grid>
	);
};
