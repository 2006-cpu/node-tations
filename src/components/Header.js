import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { callApi } from '../api';
import {
	Grid,
	Heading,
	Input,
	InputGroup,
	InputRightAddon,
	IconButton,
	Button,
	FormControl,
	FormLabel,
	useDisclosure,
	ModalCloseButton,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Tabs,
	Tab,
	TabList,
	TabPanels,
	TabPanel
} from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';

import {
	storeCurrentUser,
	storeCurrentUserToken,
	clearCurrentUser,
	clearCurrentUserToken
} from '../auth';

export const Header = ({ token, setToken, setCurrentUser, currentUser }) => {
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
			if (register) {
				const registration = await callApi(
					{ method: 'post', path: '/users/register' },
					{
						firstName: firstName,
						lastName: lastName,
						email: email,
						username: username,
						password: password
					}
				);
				console.log(registration);
				if (registration.newUser && registration.token) {
					storeCurrentUser(registration.newUser);
					setCurrentUser(registration.newUser);
					storeCurrentUserToken(registration.token);
					setToken(registration.token);
				}
			} else {
				const login = await callApi(
					{ method: 'post', path: '/users/login' },
					{ username: username, password: password }
				);
				console.log(login);
				if (login.token && login.user) {
					setCurrentUser(login.user);
					storeCurrentUser(login.user);
					setToken(login.token);
					storeCurrentUserToken(login.token);
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
	};

	return (
		<Grid
			templateColumns='15% 60% 15% 10%'
			margin='25px'
			justifyItems='center'
		>
			<Link to='/store'>
				<Heading>STORE</Heading>
			</Link>
			<InputGroup>
				<Input placeholder='Search'></Input>
				<InputRightAddon>
					<IconButton icon={<FaSearch />} />
				</InputRightAddon>
			</InputGroup>
			<Button variant='outline' onClick={onOpen}>
				Login
			</Button>

			<IconButton
				variant='outline'
				icon={<MdShoppingCart />}
				maxWidth='30px'
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Tabs>
						<TabList>
							<Tab>Register</Tab>
							<Tab>Login</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<FormControl
									isRequired
									onSubmit={handleSubmitLogin}
									// gridTemplateRows = ''
								>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										placeholder='enter username'
										value={username}
										onChange={e => {
											setUsername(e.target.value);
										}}
									/>
									<FormLabel>Password</FormLabel>
									<Input
										type='password'
										placeholder='enter password'
										value={password}
										onChange={e => {
											setPassword(e.target.value);
										}}
									/>
									<FormLabel>First Name</FormLabel>
									<Input
										type='text'
										placeholder='Enter First Name'
										value={firstName}
										onChange={e => {
											setFirstName(e.target.value);
										}}
									/>
									<FormLabel>Last Name</FormLabel>
									<Input
										type='text'
										placeholder='Enter Last Name'
										value={lastName}
										onChange={e => {
											setLastName(e.target.value);
										}}
									/>
									<FormLabel>Email</FormLabel>
									<Input
										type='text'
										placeholder='Enter Email'
										value={email}
										onChange={e => {
											setEmail(e.target.value);
										}}
									/>
									<Button type='submit' onClick={onClose}>
										Submit
									</Button>
								</FormControl>
							</TabPanel>
							<TabPanel>
								<form onSubmit={handleSubmitLogin}>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										placeholder='enter username'
										value={username}
										onChange={e => {
											setUsername(e.target.value);
										}}
									/>
									<FormLabel>Password</FormLabel>
									<Input
										type='password'
										placeholder='enter password'
										value={password}
										onChange={e => {
											setPassword(e.target.value);
										}}
									/>
									<Button type='submit' onClick={onClose}>
										Submit
									</Button>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>
					<ModalCloseButton />
				</ModalContent>
			</Modal>
		</Grid>
	);
};
