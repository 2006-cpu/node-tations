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
        }, []);

return 	<>
        <Text>Account Information</Text>
            <Grid>
                <Text>{account.firstname}</Text>
                <Text>{account.lastname}</Text>
                <Text>{account.email}</Text>
                <Image 
                    borderRadius="full"
                    boxSize="150px"
                    src={account.imageurl}
                    alt={account.username}
                />
                <Text>{account.username}</Text>
                </Grid>
        </>
}