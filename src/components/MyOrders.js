import React from 'react';
import { Grid, Text, Box } from '@chakra-ui/react';


export const MyOrders = ({orders, user, isAdmin, currentUser}) => {
    console.log(orders)
    console.log("admin:", user.isAdmin)
	// setProductId({ productId : id})
	return (
		<Box textAlign="center">MyOrders
		<Grid templateColumns="repeat(3, 1fr)">
                {orders.map(({id, status, userId, datePlaced}) =>
                
				
        		<Box key={id} className="Activity" border="1px solid black">
          		<Text>Order Status:  {status} </Text>
            	<Text>Order Date: {datePlaced }</Text>
				
				</Box>
                )}
		</Grid>
		</Box>
	)
};