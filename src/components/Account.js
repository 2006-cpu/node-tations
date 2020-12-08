import React, { useState, useEffect } from 'react';
import { Grid, Text, Image } from '@chakra-ui/react';
import { callApi } from '../api';

export const Account = ({currentUser, token}) => {
    const [account, setAccount] = useState({});

	const fetchAccount = async () => {
		const accountData = await callApi({method: 'get', path: `/users/me`, token: token });
        setAccount(accountData);
    };
    
	useEffect(() => {    
        if(currentUser)
        {fetchAccount()};
        }, [currentUser]);

return 	<>
        <Text fontWeight="bold" fontSize="xx-large">Account Information</Text>
            <Grid maxW="33%" className="account">
                <Text>First Name: {account.firstname}</Text>
                <Text>Last Name: {account.lastname}</Text>
                <Text>Email: {account.email}</Text>
                <Image 
                    borderRadius="full"
                    boxSize="150px"
                    src={account.imageurl}
                    alt={account.username}
                />
                <Text>Username: {account.username}</Text>
                </Grid>
        </>
}