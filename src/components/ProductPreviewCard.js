import React from 'react';
import { Grid, Image, Text, Box  } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import './productpreviewcard.css'


export const ProductPreviewCard = ({ product }) => {
	

	return (
		<Link to={`/products/${product.id}`}>
			<Box  borderRadius="40px" border="5px groove white" className='products'>
			<Grid 
				className='products'
				margin='25px'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'
				
				
			>
				<Text fontFamily='courier' letterSpacing='1px' fontSize='xl'>Name: <b>{product.name}</b></Text>
				<Image borderRadius='20px' src={product.imageurl} />
				<Text fontSize='l'>Description: {product.description}</Text>
				<Text fontSize='l'>Price: ${product.price}</Text>
				<Text fontSize='l'>Category: {product.category}</Text>
                <Text fontSize='l'>inStock: {product.inStock ? 'True': 'False'}</Text>
			</Grid>
			</Box>
		</Link>
	);
};
