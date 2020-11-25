import React from 'react';
import { Grid, Text, Box } from '@chakra-ui/react';


export const MyOrders = ({orders}) => {
    console.log(orders)
    
	// setProductId({ productId : id})
	return (
		<Box textAlign="center">MyOrders
		<Grid templateColumns="repeat(3, 1fr)">
				{orders && orders.map(({ status, userId, datePlaced}) => (
                    
				
        		<Box key={ userId } className="Activity" border="1px solid black">
          		<Text>Order Status:  {status} </Text>
            	<Text>Order Date: { datePlaced }</Text>
				
				</Box>
				))}
		</Grid>
		</Box>
	);
};