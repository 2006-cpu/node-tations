import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { callApi } from '../api';
import {
	Grid,
	Heading,
	Input,
	InputGroup,
	InputRightAddon,
	IconButton,
	Button,
	FormLabel,
	useDisclosure,
	ModalCloseButton,
	Modal,
	ModalOverlay,
	ModalContent,
	Tabs,
	Tab,
	TabList,
	TabPanels,
	TabPanel,
	useToast
} from '@chakra-ui/react';
import { MdShoppingCart, MdAccountBox } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import './header.css';
import {
	storeCurrentUser,
	storeCurrentUserToken,
	clearCurrentUser,
	clearCurrentUserToken
} from '../auth';

export const Header = ({
	token,
	setToken,
	currentUser,
	setCurrentUser,
	setIsAdmin
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const handleChange = async event => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();
	};

	const handleRegisterSubmit = async event => {
		event.preventDefault();
		try {
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

			if (!registration.success) {
				toast({
					title: registration.message,
					status: 'error',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			}
			console.log(registration);
			if (registration.newUser && registration.token) {
				storeCurrentUser(registration.newUser);
				setCurrentUser(registration.newUser);
				storeCurrentUserToken(registration.token);
				setToken(registration.token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitLogin = async event => {
		event.preventDefault();
		console.log(username);
		console.log(password);
		try {
			const login = await callApi(
				{ method: 'post', path: '/users/login' },
				{ username: username, password: password }
			);

			if (!login.success) {
				toast({
					title: login.message,
					status: 'error',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
			}
			if (login.token && login.user) {
				setCurrentUser(login.user);
				storeCurrentUser(login.user);
				setToken(login.token);
				storeCurrentUserToken(login.token);

				toast({
					title: login.message,
					status: 'success',
					duration: '5000',
					isClosable: 'true',
					position: 'top'
				});
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
			className='header'
			templateColumns='15% 60% 15% 10%'
			justifyItems='center'
			marginTop='25px'
			marginBottom='25px'
			borderBottom='1px solid #d3d3d3'
			paddingBottom='25px'
		>
			<Link to='/store'>
				<Heading>cutHub</Heading>
			</Link>
			<InputGroup>
				<Input placeholder='Search'></Input>
				<InputRightAddon>
					<IconButton icon={<FaSearch />} />
				</InputRightAddon>
			</InputGroup>
			{token && currentUser ? (
				<Link to='/store'>
					<Button variant='outline' onClick={handleUserLogout}>
						Logout
					</Button>
				</Link>
			) : (
				<Button variant='outline' onClick={onOpen}>
					Login
				</Button>
			)}
			{token && currentUser ? (
				<Link to='/account'>
					<IconButton
						variant='outline'
						icon={<MdAccountBox />}
						maxWidth='30px'
					/>
				</Link>
			) : null}
			{currentUser && token ? (
				<NavLink to='/Myorders' activeClassName='current'>
					MyOrders
				</NavLink>
			) : (
				''
			)}
			{currentUser && currentUser.isAdmin && token ? (
				<NavLink to='/orders' activeClassName='current'>
					Orders
				</NavLink>
			) : (
				''
			)}
			{currentUser && token && currentUser.isAdmin ? (
				<NavLink to='/users' activeClassName='current'>
					Users
				</NavLink>
			) : null}
			{currentUser && token && currentUser.isAdmin ? (
				<NavLink to='/adminproduct' activeClassName='current'>
					Admin Products
				</NavLink>
			) : null}
			<Link to='/cart'>
				<IconButton
					variant='outline'
					icon={<MdShoppingCart />}
					maxWidth='30px'
				/>
			</Link>
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
								<form onSubmit={handleRegisterSubmit}>
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
								</form>
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
