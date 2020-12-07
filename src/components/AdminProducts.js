import React, { useState, useEffect } from 'react';
import { AddProduct } from './AddProduct';
import { callApi } from '../api';
import { 
    Grid, 
    Text, 
    Box, 
    Image
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './productpreviewcard.css'
export const AdminProducts = ({currentUser, token}) => {
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
        <>
        {
        currentUser && currentUser.isAdmin ? <AddProduct currentUser={ currentUser} token={ token }/> : null
        }
        <Text>ProductList</Text>
        {
        currentUser && currentUser.isAdmin ? 
        <Grid templateColumns="repeat(3, 1fr)" className="products">
        {productList.map(({id, name, imageurl, description, price, category, inStock}) =>
            <Box key={id} className="admin_products" borderRadius="40px" maxW="fit-content" border="5px groove white" className="products">
		<Link to={`/adminproduct/${id}`}>
			<Grid
				margin='25px'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'
			>
                <Text>Name:  {name} </Text>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={imageurl}
                    alt={name}
                /> 
                <Text>Description: {description}</Text>
                <Text>Price: {price}</Text>
                <Text>Category: {category}</Text>
                <Text>inStock: {inStock ? 'True': 'False'}</Text>
			</Grid>
            </Link>
            </Box>)}
        </Grid>
        : null
        }
        </>
    )}