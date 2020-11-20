import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { callApi } from '../api';

export const Catalog = () => {
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const config = {
			method: 'GET',
			path: '/products'
		};

		try {
			const products = await callApi(config);
			setProducts(products);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return <ProductCard products={products} />;
};