import React from 'react';
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
				<Text fontSize='xl'>Name: {product.name}</Text>
				<Image src={product.imageurl} />
				<Text fontSize='md'>Description: {product.description}</Text>
				<Text fontSize='sm'>Price: ${product.price}</Text>
				<Text>Category: {product.category}</Text>
                <Text>inStock: {product.inStock ? 'True': 'False'}</Text>
			</Grid>
			</Box>
		</Link>
	);
};
