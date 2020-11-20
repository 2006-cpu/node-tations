import React, { useState } from 'react';
import { Grid, Image, Text, Box } from '@chakra-ui/react';

export const ProductCard = ({products}) => {
	console.log(products)
	
	return (
		<Box textAlign="center">Products
		<Grid templateColumns="repeat(3, 1fr)">
				{products.map(({ id, name, description, price, imageurl, inStock, category}) => (
        		<Box key={ id } className="Activity" border="1px solid black">
          		<Text>Name: { name }</Text>
            	<Text>Description: { description }</Text>
				<Text>Category: { category }</Text>
				<Image src={imageurl} alt= "No Image" />
            	<Text>inStock: { inStock ? "In Stock": "Out of Stock" }</Text>
				<Text>Price: { price }</Text>
				</Box>
				))}
		</Grid>
		</Box>
	);
};