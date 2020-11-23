import React, { useState } from 'react';
import { Grid, Image, Text, Box } from '@chakra-ui/react';

export const SoloCard = ({products, product}) => {
    // console.log(products)
    
	
	return (
        
        products.map(({ id, name, description, price, imageurl, inStock, category}) => {
            return(
            id === product ? (<Box textAlign="center">Products
            <Grid templateColumns="repeat(3, 1fr)">
                    
                    <Box key={ id } className="Activity" border="1px solid black">
                      <Text>Name: { name }</Text>
                    <Text>Description: { description }</Text>
                    <Text>Category: { category }</Text>
                    <Image src={imageurl} alt= "No Image" />
                    <Text>inStock: { inStock ? "In Stock": "Out of Stock" }</Text>
                    <Text>Price: { price }</Text>
                    </Box>
                    ))
            </Grid>
            </Box>) : ""
        )})
		
	);
};