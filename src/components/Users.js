import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    Text, 
    Box, 
    Image
} from '@chakra-ui/react';
import { callApi } from '../api';
import { AddUser } from './AddUser';
import { Link } from 'react-router-dom';
import './productpreviewcard.css'

export const Users = ({currentUser, token}) => {
    const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const users = await callApi({method: 'get', path: `/users`, token: token });
        setUsers(users);
    };
    
	useEffect(() => {
    if(currentUser)
    {fetchUsers()};
    }, []);
    
    return 	(
        <>
        {
        currentUser && currentUser.isAdmin ? <AddUser currentUser={ currentUser}/> : null
        }
        <Text fontSize='xl'><b>&nbsp;&nbsp;Users</b></Text>
        {
        currentUser && currentUser.isAdmin ? 
        <Grid templateColumns="repeat(3, 1fr)" className="products">
        {users.map(({id, firstname, lastname, email, imageurl, username, isAdmin}) =>
            <Box key={id} className="users" border="5px groove white">
            <Link to={`/users/${id}`}>              
                <Text>Username:  {username} </Text>
                <Text>First Name: {firstname}</Text>
                <Text>Last Name: {lastname}</Text>
                <Text>Email: {email}</Text>
                <Text>isAdmin: {isAdmin ? 'True': 'False'}</Text>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={imageurl}
                    alt={username}
                />
            </Link>
            </Box>)}
        </Grid>
        : null
        }
        </>
    )}
                
