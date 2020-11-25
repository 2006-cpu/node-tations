import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { callApi } from '../api';
import { MyOrders } from './MyOrders';

export const Orders = ({orders, setOrders}) => {
	
    
	
	const fetchOrders = async () => {
		const config = {
			method: 'GET',
			path: '/orders'
		};

		try {
            const orders = await callApi(config);
            
            console.log("orders:", orders)
            // setOrders(orders);
			
			
		} catch (error) {
			console.error(error);
		} finally {
            
        }
	};

	useEffect(() => {
		fetchOrders().then(setOrders)
	}, []);

	
	return <MyOrders  orders={orders} setOrders={setOrders} />
};
