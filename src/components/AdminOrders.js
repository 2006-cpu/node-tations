import React, { useEffect } from 'react';
import { callApi } from '../api';
import { UserOrders } from './UserOrders';

export const AdminOrders = ({orders, currentUser, setOrders, token}) => {

    
	console.log("orders:", orders)
    
	
	const fetchMyOrders = async () => {
		const config = {
			method: 'GET',
			path: `/orders`,
			token: token
		};
        
		try {
            
            const orders = await callApi(config);
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

	
	return <UserOrders currentUser={currentUser} orders={orders} setOrders={setOrders} />
};