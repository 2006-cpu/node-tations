import React from 'react';
import { Grid, Text, Image, Button } from '@chakra-ui/react';

export const CartProductCard = ({ product }) => {
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
			<Button width='50%' justifySelf='center'>
				Remove from cart
			</Button>
		</Grid>
	);
};
