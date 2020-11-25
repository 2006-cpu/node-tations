import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog, ProductPage } from './components';
import { getCurrentUser, getCurrentUserToken } from './auth';

const App = () => {
	const [token, setToken] = useState(getCurrentUserToken());
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	return (
		<Router>
			<ChakraProvider>
				<div className='App'>
					<Header
						token={token}
						setToken={setToken}
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
					/>
					<Switch>
						<Route path='/store'>
							<Catalog />
						</Route>
						<Route path={'/products/:productId'}>
							<ProductPage />
						</Route>
					</Switch>
				</div>
			</ChakraProvider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
