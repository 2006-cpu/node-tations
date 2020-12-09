import React, { useEffect } from 'react';
import { Grid, Text, Box, Image } from '@chakra-ui/react';
import './productpreviewcard.css';
import { callApi } from '../api';

export const MyOrders = ({ orders, currentUser, token }) => {
	useEffect(() => {
		updateOrder();
	}, []);

	const updateOrder = async cartId => {
		if (token) {
			const query = new URLSearchParams(window.location.search);

			if (query.get('cartId')) {
				const cartId = query.get('cartId');

				const updatedOrder = await callApi(
					{ path: `/orders/${cartId}`, method: 'PATCH', token },
					{ status: 'completed' }
				);

				console.log(updatedOrder);

				await callApi(
					{
						path: '/orders',
						method: 'POST',
						token
					},
					{ status: 'created' }
				);
			}
		}
	};

	return (
		<Box textAlign='center' textColor='white' className='myorders'>
			myOrders
			<Grid
				templateColumns='repeat(3, 1fr)'
				margin='25px'
				className='orders'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'
			>
				{orders.map(({ id, status, datePlaced, products }) => (
					<Box
						key={id + currentUser}
						className='products'
						border='5px groove white'
					>
						<Text fontSize='xl'>
							<b>Order By: {currentUser.username} </b>
						</Text>
						<Text>Order Status: {status} </Text>
						<Text>Order Date: {datePlaced}</Text>
						<Box>
							Items:{' '}
							{products &&
								products.map(
									({
										id,
										name,
										description,
										price,
										imageurl,
										inStock,
										category
									}) => (
										<Box key={id} className='Products'>
											<Text> Product Name: {name} </Text>
											<Text>
												{' '}
												Details: {description}{' '}
											</Text>
											<Text> Price: {price} </Text>
											<Image
												src={imageurl ? imageurl : ''}
											/>
											<Text>
												{' '}
												Availability:{' '}
												{inStock
													? 'In Stock'
													: 'Out of Stock'}{' '}
											</Text>
											<Text> Category: {category} </Text>
										</Box>
									)
								)}
						</Box>
					</Box>
				))}
			</Grid>
		</Box>
	);
};
