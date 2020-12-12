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
        <Box textAlign="center">
        {
        currentUser && currentUser.isAdmin ? <AddProduct currentUser={ currentUser} token={ token }/> : null
        }
        </Box>
        <Text textAlign="center" fontWeight="bold" fontSize="xx-large">ProductList</Text>
        {
        currentUser && currentUser.isAdmin ? 
        <Grid templateColumns="repeat(3, 1fr)" className="products" border='15px groove peru'>
        {productList.map(({id, name, imageurl, description, price, category, inStock}) =>
            <Box key={id} borderRadius="40px" backgroundColor='navajoWhite' border="5px groove white">
		<Link to={`/adminproduct/${id}`}>
			<Grid
                border='15px groove peru' 
                backgroundColor='black'
				margin='25px'
				justifyItems='center'
				boxShadow='xs'
				rounded='md'
			>
                <Text  letterSpacing='1px' fontFamily='courier' fontSize='xl'>Name:  <b>{name}</b> </Text>
                <Image
                    src={imageurl}
                    alt={name}
                /> 
                <Text fontSize='l'>Description: {description}</Text>
                <Text fontSize='l'>Price: {price}</Text>
                <Text fontSize='l'>Category: {category}</Text>
                <Text fontSize='l'>inStock: {inStock ? 'True': 'False'}</Text>
			</Grid>
            </Link>
            </Box>)}
        </Grid>
        : null
        }
        </>
    )}