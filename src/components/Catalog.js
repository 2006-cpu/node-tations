import React, { useState, useEffect } from 'react';
import { ProductPreviewCard } from '../components';
import { callApi } from '../api';
import { Grid, useToast, Box } from '@chakra-ui/react';

export const Catalog = () => {
	const [productList, setProductList] = useState([]);
	const toast = useToast();

	const fetchProducts = async () => {
		const config = {
			method: 'GET',
			path: '/products'
		};

		try {
			const products = await callApi(config);
			setProductList(products);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);

		if (query.get('success')) {
			toast({
				title: 'Purchase successful',
				status: 'success',
				duration: '5000',
				isClosable: 'true',
				position: 'top'
			});
		}
	}, []);

	return (
		<Box>
		<Grid templateColumns='33% 33% 33%' justifyItems='center' className="products">
			{productList.map(product => {
				return (
					<ProductPreviewCard product={product} key={product.id} />
				);
			})}
		</Grid>
		</Box>
	);
};
