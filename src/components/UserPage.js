import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import{
    useDisclosure, 
    FormLabel, 
    Modal,
    Input,
    ModalCloseButton,
    Button,
    ModalContent,
    ModalOverlay,
    Checkbox,
    Grid,
    Image,
    Text
} from '@chakra-ui/react';
import { callApi } from '../api';

export const UserPage = ({ token, currentUser }) => {
	const { userId } = useParams();
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchUser = async () => {
		const userData = await callApi({ path: `/users/${userId}`, token: token });
		setUser(userData);
    };
    
    useEffect(() => {
		fetchUser();
    }, []);

    const handleEditUserSubmit = async event => {
        event.preventDefault();
        try {
            const createUser = await callApi(
                { method: 'patch', path: `/users/${user.id}`, token: token },
                {
                    firstname: firstName ? firstName: user.firstname,
                    lastname: lastName ? lastName: user.lastname,
                    email: email ? email: user.email,
                    username: username ? username: user.username,
                    password: password ? password: user.password,
                    imageURL: imageUrl ? imageUrl: user.imageurl,
                    isAdmin: isAdmin ? "true" : "false"
                }
            );
            console.log(createUser);
        } catch (error) {
            console.log(error);
        }
    };
    
    return ( <>
        {currentUser && currentUser.isAdmin ? 
        <Grid>
            {
                currentUser && currentUser.isAdmin ? <Button variant='outline' onClick={onOpen}>Edit Users</Button> : null
            }      
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <form onSubmit={handleEditUserSubmit}>
                <FormLabel>Username</FormLabel>
                    <Input
                        type='text'
                        placeholder='enter username'
                        value={username}
                        onChange={e => {setUsername(e.target.value);}}
                    />
                <FormLabel>Password</FormLabel>
                    <Input
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={e => {setPassword(e.target.value);}}
                    />
                <FormLabel>First Name</FormLabel>
                    <Input
                        type='text'
                        placeholder='Enter First Name'
                        value={firstName}
                        onChange={e => {setFirstName(e.target.value);}}
                    />
                <FormLabel>Last Name</FormLabel>
                    <Input
                        type='text'
                        placeholder='Enter Last Name'
                        value={lastName}
                        onChange={e => {setLastName(e.target.value);}}
                    />
                <FormLabel>Email</FormLabel>
                    <Input
                        type='text'
                        placeholder='Enter Email'
                        value={email}
                        onChange={e => {setEmail(e.target.value);}}
                        />
                <FormLabel>ImageURL</FormLabel>
                    <Input
                        type='text'
                        placeholder='Enter URL'
                        value={imageUrl}
                        onChange={e => {setImageUrl(e.target.value);}}
                        />
                <FormLabel>isAdmin</FormLabel>
                    <Checkbox
                        value={isAdmin}
                        onChange={() => {setIsAdmin(!isAdmin)}}
                        />
                    <Button type='submit' onClick={onClose}>
                        Submit
                    </Button>
                </form>
                <ModalCloseButton />
            </ModalContent>
            </Modal>
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