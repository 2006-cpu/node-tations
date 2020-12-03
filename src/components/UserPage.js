import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Image, Text } from '@chakra-ui/react';
import { callApi } from '../api';

export const UserPage = ({ token, currentUser }) => {
	const { userId } = useParams();
	const [user, setUser] = useState({});

	const fetchUser = async () => {
		const userData = await callApi({ path: `/users/${userId}`, token: token });
		setUser(userData);
    };
    
    useEffect(() => {
		fetchUser();
    }, []);
    
    return ( <>
        {currentUser && currentUser.isAdmin ? 
        <Grid>
                <Text>Username:  {user.username} </Text>
                <Text>First Name: {user.firstname}</Text>
                <Text>Last Name: {user.lastname}</Text>
                <Text>Email: {user.email}</Text>
                <Text>isAdmin: {user.isAdmin ? 'True': 'False'}</Text>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={user.imageurl}
                    alt={user.username}
                /> 
        </Grid> : null
    }
    </>
	);
};