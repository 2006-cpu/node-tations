import React, { useEffect } from 'react';
import { callApi } from '../api';
import { MyOrders } from './MyOrders';

export const Orders = ({orders, currentUser, setOrders, token}) => {

    
	console.log("orders:", orders)
    
	
	const fetchMyOrders = async () => {
		const config = {
			method: 'GET',
			path: `/orders/users/${ currentUser.id }/orders`,
			token: token
		};
        
		try {
            
            const orders = await callApi(config);
            console.log("orders:", orders)
            setOrders(orders)
            console.log("orders:", orders)
           
			
			
		} catch (error) {
			console.error(error);
		} finally {
            
        }
	};

	useEffect(() => {
		if(currentUser)
		{
			fetchMyOrders()
		}
	}, [currentUser]);

	
	return <MyOrders currentUser={currentUser} orders={orders} setOrders={setOrders} />
};
