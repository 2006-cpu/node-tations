import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Grid, Image, Text } from '@chakra-ui/react';
import { callApi } from '../api';

export const ProductPage = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState({});

	const fetchProduct = async () => {
		const productData = await callApi({ path: `/products/${productId}` });
		setProduct(productData);
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	return (
		<Grid>
			<Text>{product.name}</Text>
			<Text>{product.description}</Text>
			<Text>{product.category}</Text>
			<Text>{product.price}</Text>
		</Grid>
	);
};
