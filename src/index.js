import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog, ProductPage, Orders, ShoppingCart } from './components';
import { getCurrentUser, getCurrentUserToken } from './auth';

const App = () => {
	const [token, setToken] = useState(getCurrentUserToken());
	const [user, setUser] = useState({});
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	const [ isAdmin, setIsAdmin ] = useState(Boolean);
	const [orders, setOrders] = useState([{}]);
	return (
		<Router>
			<ChakraProvider>
				<div className='App'>
					<Header
						token={token}
						setToken={setToken}
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
						setIsAdmin={setIsAdmin}
						setUser={setUser}
						user={user}
					/>
					<Switch>
						<Route path='/store'>
							<Catalog />
						</Route>
						<Route path={'/products/:productId'}>
							<ProductPage />
						</Route>
					</Switch>
					<Switch>
					<Route exact path='/orders' >
							<Orders  currentUser={currentUser} orders={orders} setOrders={setOrders} user={user} setUser={setUser} />
						</Route>
						<Route exact path='/cart'>
						<ShoppingCart/>
					</Route>
					</Switch>
				</div>
			</ChakraProvider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
