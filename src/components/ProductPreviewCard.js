import React, { useState } from 'react';
import { Grid, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const ProductPreviewCard = ({ product }) => {
	return (
		<Link to={`/products/${product.id}`}>
			<Grid
				margin='25px'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'
			>
				<Text fontSize='xl'>{product.name}</Text>
				<Image src={product.imageurl} />
				<Text fontSize='md'>{product.description}</Text>
				<Text fontSize='sm'>${product.price}</Text>
			</Grid>
		</Link>
	);
};
