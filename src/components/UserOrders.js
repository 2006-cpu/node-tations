import React from 'react';
import { Grid, Text, Box, Image } from '@chakra-ui/react';
import './productpreviewcard.css'


export const UserOrders = ({orders, currentUser}) => {
    console.log(orders)
    
	return (
		<Box textAlign="center" className="orders">
        <Text color="white" fontSize='40px'><i><b>Welcome back {currentUser.username}!</b></i></Text>
		<Grid templateColumns="repeat(3, 1fr)" margin='25px'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'>
                {orders.map(({id, status, userId, datePlaced, products, username}) =>
                
				
        		<Box key={id} className="products" border="5px groove white">
                <Text fontSize='xl'><b>Order By:  {username} </b></Text>
          		<Text>Order Status:  {status} </Text>
            	<Text>Order Date: {datePlaced }</Text>
                <Text>Items: {products && products.map(({id ,name, description, price, imageurl, inStock, category  }) =>
                
                <Box key={id} className="Products">
                <Text> Product Name: {name} </Text>
                <Text> Details: {description} </Text>
                <Text> Price: {price} </Text>
                <Image src={imageurl ? imageurl : ""}/>
                <Text> Availability: {inStock ? 'In Stock' : 'Out of Stock'} </Text>
                <Text> Category: {category} </Text>
				</Box>
				
                )}</Text>
                </Box>
                
                )}
		</Grid>
		</Box>
	)
};