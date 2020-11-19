import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Button, Flex } from '@chakra-ui/react';

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleChange = async event => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();
	};

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
			</Flex>
		</header>
	);
};

export default Header;
