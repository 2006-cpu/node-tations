import React, { useState, useEffect } from 'react';
import { 
    Grid, 
    Text, 
    Box, 
    Image
} from '@chakra-ui/react';
import { callApi } from '../api';
import { AddUser } from './AddUser';

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
        <Text>Users</Text>
        {
        currentUser && currentUser.isAdmin ? 
        <Grid templateColumns="repeat(3, 1fr)">
        {users.map(({id, firstname, lastname, email, imageurl, username, isAdmin}) =>
            <Box key={id} className="users" border="1px solid black">
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
            </Box>)}
        </Grid>
        : null
        }
        </>
    )}
                
