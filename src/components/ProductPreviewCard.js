import React, { useState } from 'react';
import { Grid, Image, Text, Box  } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import './productpreviewcard.css'


export const ProductPreviewCard = ({ product }) => {
	

	return (
		<Link to={`/products/${product.id}`}>
			<Box className="products">
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
			</Box>
		</Link>
	);
};
