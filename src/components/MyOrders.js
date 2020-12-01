import React from 'react';
import { Grid, Text, Box } from '@chakra-ui/react';


export const MyOrders = ({orders, currentUser}) => {
    console.log(orders)
    
	return (
		<Box textAlign="center">MyOrders
		<Grid templateColumns="repeat(3, 1fr)">
                {orders.map(({id, status, userId, datePlaced}) =>
                
				(userId === currentUser.id) ?
        		<Box key={id} className="Activity" border="1px solid black">
          		<Text>Order Status:  {status} </Text>
            	<Text>Order Date: {datePlaced }</Text>
				
				</Box>
				: "")}
		</Grid>
		</Box>
	)
};