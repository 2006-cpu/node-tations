import React, { useState, useEffect } from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { callApi } from '../api';

export const Account = ({currentUser, token}) => {
    const [account, setAccount] = useState({});

	const fetchAccount = async () => {
		const accountData = await callApi({method: 'get', path: `/users/me`, token: token });
        setAccount(accountData);
    };
    
	useEffect(() => {
    if(currentUser)
    {fetchAccount();}
	}, []);

return 	<Grid>
<Text>{account.firstname}</Text>
<Text>{account.lastname}</Text>
<Text>{account.email}</Text>
<Text>{account.imageurl}</Text>
<Text>{account.username}</Text>
</Grid>
}