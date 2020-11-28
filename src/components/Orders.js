import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { callApi } from '../api';
import { MyOrders } from './MyOrders';

export const Orders = ({orders, currentUser, setOrders, user}) => {

    
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

	
	return <MyOrders currentUser={currentUser} user={user} orders={orders} setOrders={setOrders} />
};
