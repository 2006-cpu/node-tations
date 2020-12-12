import React, { useState, useEffect } from 'react';
import { ProductPreviewCard } from '../components';
import { callApi } from '../api';
import { Grid, useToast, Box } from '@chakra-ui/react';

export const Catalog = ({ filterValue }) => {
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
			return products;
		} catch (error) {
			console.error(error);
		}
	};

	const filterProductList = () => {
		let filteredProducts = productList.filter(product => {
			return product.name.includes(filterValue);
		});

		if (filteredProducts.length !== 0) {
			setProductList(filteredProducts);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (filterValue === '') {
			fetchProducts();
		}
		filterProductList();
	}, [filterValue]);

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
		<Box className='products' >
			<Grid
				templateColumns='33% 33% 33%'
				justifyItems='center'
				
			>
				{productList.map(product => {
					return (
						<Box border='15px groove peru'>
						<ProductPreviewCard 
							product={product}
							key={product.id}
						/>
						</Box>
					);
				})}
			</Grid>
		</Box>
	);
};
