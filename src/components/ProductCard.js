import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {SoloCard} from './SoloCard'
import { Grid, Image, Text, Box } from '@chakra-ui/react';

export const ProductCard = ({products, setProduct }) => {
	console.log(products)
	// setProductId({ productId : id})
	return (
		<Box textAlign="center">Products
		<Grid templateColumns="repeat(3, 1fr)">
				{products.map(({ id, name, description, price, imageurl, inStock, category}) => (
				
        		<Box key={ id } className="Activity" border="1px solid black">
          		<Text>Name: { <Link to="./viewitem" id={id} setProduct={setProduct} onClick={()=> {
					  console.log("productId:", id)
					  setProduct(id)
				  }}>{name}</Link> }</Text>
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
