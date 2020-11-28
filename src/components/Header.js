import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { callApi } from '../api';
import { 
	Input, 
	Button, 
	Flex,
	FormLabel,
    useDisclosure,
	ModalCloseButton,
	Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
	ModalFooter
 } from '@chakra-ui/react';

 import {
    storeCurrentUser,
	storeCurrentUserToken,
	clearCurrentUser,
	clearCurrentUserToken
  } from '../auth';

const Header = ({
	token,
	setToken,
	setCurrentUser,
	currentUser,
	setIsAdmin,
	isAdmin,
	setUser,
	user

}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [register, setRegister] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleChange = async event => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();
	};

    const handleSubmitLogin = async event => {
        event.preventDefault();
        console.log(username);
        console.log(password);
        try {
            if(register)
            {
                const registration = await callApi({method: 'post', path: '/users/register'},{firstName: firstName, lastName: lastName, email: email, username: username, password: password});
				console.log(registration);
				if(registration.newUser && registration.token)
				{
					storeCurrentUser(registration.newUser);
					setCurrentUser(registration.newUser);
					
					storeCurrentUserToken(registration.token);
					setToken(registration.token);
				}
            }
            else
            {
                const login = await callApi({method: 'post', path: '/users/login'},{username: username, password: password});
				console.log(login);
				if(login.token && login.user)
				{      
					setCurrentUser(login.user);	
					storeCurrentUser(login.user);
					setUser(login.user);
					setToken(login.token);
					storeCurrentUserToken(login.token);
					login.user.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
				}
            }
        } catch (error) {
            console.error(error);
        }
	};

	const handleUserLogout = () => {
		clearCurrentUser();
		clearCurrentUserToken();
		setCurrentUser(null);
		setToken(null);
	  }

	return (
		<header>
			<h1 className='Title'>Title of the Application</h1>
			<Flex>
				<NavLink to='/home' activeClassName='current'>
					Home
				</NavLink>
				<NavLink to='/products' activeClassName='current'>
					Products
				</NavLink>
				{user.isAdmin ? <NavLink to='/orders' activeClassName='current'>
					MyOrders
				</NavLink> : ""}
				<NavLink to='/cart' activeClassName='current'>
					<i class="material-icons">shopping_cart</i>
				</NavLink>
				<Flex>
					<form onSubmit={handleSubmit}>
						<Input
							placeholder='Search for a Product'
							value={searchQuery}
							onChange={handleChange}
							size='md'
						></Input>
						<Button>Submit</Button>
					</form>
				</Flex>
				<>
				{
					token ? null : <Button onClick={onOpen}>Login</Button>
				}
					<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
						<ModalHeader>{register ? "Register": "Login"}</ModalHeader>
						<Button onClick={() => {setRegister(!register)}}>{register ? "Login": "Register"}</Button>
						<ModalCloseButton />
						{register ?
						<form onSubmit={handleSubmitLogin}>
							<FormLabel>Username</FormLabel>
							<Input 							
								type="text" 
								placeholder="enter username" 
								value={username} 
								onChange={(e) => {setUsername(e.target.value)}}/>
							<FormLabel>Password</FormLabel>
							<Input           
								type= "password"
								placeholder="enter password" 
								value={password} 
								onChange={(e) => {setPassword(e.target.value)}}/>
							<FormLabel>First Name</FormLabel>
							<Input           
								type="text" 
								placeholder="Enter First Name" 
								value={firstName} 
								onChange={(e) => {setFirstName(e.target.value)}}/>
							<FormLabel>Last Name</FormLabel>
							<Input           
								type="text" 
								placeholder="Enter Last Name" 
								value={lastName} 
								onChange={(e) => {setLastName(e.target.value)}}/>
							<FormLabel>Email</FormLabel>
							<Input           
								type="text" 
								placeholder="Enter Email" 
								value={email} 
								onChange={(e) => {setEmail(e.target.value)}}/>
							<Button type="submit" onClick={onClose}>Submit</Button>
						</form>
						:
						<form onSubmit={handleSubmitLogin}>
						<FormLabel>Username</FormLabel>
						<Input 							
							type="text" 
							placeholder="enter username" 
							value={username} 
							onChange={(e) => {setUsername(e.target.value)}}/>
						<FormLabel>Password</FormLabel>
						<Input           
							type="password" 
							placeholder="enter password" 
							value={password} 
							onChange={(e) => {setPassword(e.target.value)}}/>
						<Button type="submit" onClick={onClose}>Submit</Button>
						</form>
						}
							<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}> close </Button>
						</ModalFooter>
						</ModalContent>
					</Modal>
				</>
				{
					token && currentUser.username ? <Button className="Logout" type="submit" onClick={ handleUserLogout }>LOG OUT, { currentUser.username }</Button> : null
				}
			</Flex>
		</header>
	);
};

export default Header;
