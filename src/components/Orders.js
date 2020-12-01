import React, { useEffect } from 'react';
import { callApi } from '../api';
import { MyOrders } from './MyOrders';

export const Orders = ({orders, currentUser, setOrders}) => {

    
	console.log("orders:", orders)
    
	
	const fetchOrders = async () => {
		const config = {
			method: 'GET',
			path: '/orders'
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
        fetchOrders()
	}, []);

	
	return <MyOrders currentUser={currentUser} orders={orders} setOrders={setOrders} />
};
