import React, { useState, useEffect } from 'react';
import { ProductPreviewCard } from '../components';
import { callApi } from '../api';
import { Grid, text } from '@chakra-ui/react';

export const Catalog = () => {
	const [productList, setProductList] = useState([]);
	

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

	return (
		<Grid templateColumns='33% 33% 33%' justifyItems='center' >
			{productList.map(product => {
				return (
					<ProductPreviewCard product={product} key={product.id} />
				);
			})}
		</Grid>
	);
};
