import React, { useState, useEffect } from 'react';
import { CartProductCard } from '../components';
import { Grid, Image, Text, Box } from '@chakra-ui/react';
import { callApi } from '../api';

export const ShoppingCart = ({ token }) => {
	const [cart, setCart] = useState({});
	const [cartProducts, setCartProducts] = useState([0]);
	const [cartTotal, setCartTotal] = useState(0);
	const [update, setUpdate] = useState(false);

	const fetchCartData = async () => {
		const [cartData] = await callApi({ path: '/orders/cart', token });
		console.log(cartData);
		setCart(cartData);
		setCartProducts(cartData.products);
		setUpdate(false);
	};

	const calculateCartTotal = () => {
		if (cartProducts.length !== 0) {
			let prices = [];
			cartProducts.forEach(product => prices.push(Number(product.price)));
			let total = prices.reduce((total, price) => total + price);
			total = Math.round(total * 100) / 100;
			setCartTotal(total);
		} else {
			setCartTotal(0);
		}
	};

	useEffect(() => {
		fetchCartData();
	}, [update]);

	useEffect(() => {
		calculateCartTotal();
	}, [cartProducts]);

	return (
		<Grid textAlign='center'>
			<Text>
				{!cart
					? 'Your cart is empty!'
					: `You have ${cartProducts.length} items in your cart!`}
			</Text>
			{cartProducts.map((product, i) => {
				return (
					<CartProductCard
						product={product}
						key={product.id + i}
						token={token}
						setUpdate={setUpdate}
					/>
				);
			})}
			{cart ? <Text>Your total is ${cartTotal}</Text> : ''}
		</Grid>
	);
};
