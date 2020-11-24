import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { callApi } from '../api';

export const Catalog = ({products, setProducts, product, setProduct, setProductId}) => {
	

	const fetchProducts = async () => {
		const config = {
			method: 'GET',
			path: '/products'
		};

		try {
			const products = await callApi(config);
			setProducts(products);
			products.map(({ id, name, description, price, imageurl, inStock, category}) => {
				const productId = id
				setProductId(productId)
			})
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	
	return <ProductCard products={products} product={product} setProduct={setProduct} />
};
