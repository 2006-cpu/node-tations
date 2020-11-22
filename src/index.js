import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog } from './components';
import { getCurrentUser, getCurrentUserToken } from './auth';

const App = () => {
	const [token, setToken] = useState(getCurrentUserToken());
	const [currentUser, setCurrentUser] = useState(getCurrentUser());


	return (
		<Router>
			<ChakraProvider>
				<div className='App'>
					<Header token={ token } setToken={ setToken } currentUser={ currentUser } setCurrentUser={ setCurrentUser }/>
					<Switch>
						<Route path='/home'>
							<h2 className='Home'>
								Welcome to Title of Website
							</h2>
						</Route>
						<Route path='/products'>
							<Catalog />
						</Route>
					</Switch>
				</div>
			</ChakraProvider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
