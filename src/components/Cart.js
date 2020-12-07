import React, { useState, useEffect } from 'react';
import { CartProductCard } from '../components';
import { Grid, Text, Button, useToast } from '@chakra-ui/react';
import { callApi } from '../api';

//Stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
	'pk_test_51Hv5dPAJufyTIvrkuzYxDGPBwmCxhlQXMeEv1FRigHCopVezl1re7DJePj5SDz4WljqK6CL14GCStyp1ZnLl2TVm00TOQiWdT0'
);

export const ShoppingCart = ({ token, cart, setCart }) => {
	const [cartProducts, setCartProducts] = useState([0]);
	const [cartTotal, setCartTotal] = useState(0);
	const [update, setUpdate] = useState(false);
	const toast = useToast();

	const fetchCartData = async () => {
		if (token) {
			const [cartData] = await callApi({
				path: '/orders/cart',
				token: token
			});
			if (cartData) {
				console.log(cartData);
				setCart(cartData);
				setCartProducts(cartData.products);
				setUpdate(false);
			}
		} else if (cart)
		{
			console.log(cart)
			setCartProducts(cart);
			setUpdate(false);
		}
	};

	const calculateCartTotal = () => {
		if (cartProducts.length !== 0) {
			let prices = [];
			cartProducts.forEach(product =>
				prices.push(Number(product.price * product.quantity))
			);
			let total = prices.reduce((total, price) => total + price);
			total = Math.round(total * 100) / 100;
			setCartTotal(total);
		} else {
			setCartTotal(0);
		}
	};

	const convertToCents = total => {
		let cents = total * 100;
		Math.trunc(cents);
		return cents;
	};

	const buildLineItems = async () => {
		let stripeItems = [];

		cartProducts.forEach(product => {
			stripeItems.push({
				price_data: {
					currency: 'usd',
					product_data: {
						name: product.name,
						images: [product.imageurl]
					},
					unit_amount: convertToCents(product.price)
				},
				quantity: Math.trunc(product.quantity)
			});
		});

		return stripeItems;
	};

	const handleCheckout = async e => {
		e.preventDefault();

		if (token) {
			const stripe = await stripePromise;

			const session = await callApi({
				path: '/stripe/create-session',
				method: 'POST',
				token
			});

			const result = await stripe.redirectToCheckout({
				sessionId: session.id
			});

			if (result.error) {
				toast({
					title: 'Checkout error, please try again',
					status: 'error',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			}
		} else {
			const stripe = await stripePromise;

			const session = await callApi(
				{
					path: '/stripe/create-session',
					method: 'POST'
				},
				{
					line_items: await buildLineItems()
				}
			);

			const result = await stripe.redirectToCheckout({
				sessionId: session.id
			});

			if (result.error) {
				toast({
					title: 'Checkout error, please try again',
					status: 'error',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			}
		}
	};

	useEffect(() => {
		fetchCartData();
	}, [update]);

	useEffect(() => {
		calculateCartTotal();
	}, [cartProducts]);

	return (
		<Grid textAlign='center' marginBottom='20px'>
			<Text>
				{!cart
					? 'Your cart is empty!'
					: `You have ${cartProducts.length} items in your cart!`}
			</Text>
			<Grid templateColumns="repeat(3, 1fr)">
			{!cart
				? null
				: cartProducts.map((product, i) => {
						return (
							<CartProductCard
								product={product}
								key={product.name + i}
								token={token}
								setUpdate={setUpdate}
								cart={cart}
								setCart={setCart}
							/>
						);
				  })}
			</Grid>
			{!cart ? null : <Text>Your total is ${cartTotal}</Text>}

			{!cart ? null : (
				<Button
					width='300px'
					justifySelf='center'
					onClick={e => handleCheckout(e)}
				>
					Proceed to Checkout
				</Button>
			)}

			{/* {viewCheckout ? <Checkout /> : ''} */}
		</Grid>
	);
};
