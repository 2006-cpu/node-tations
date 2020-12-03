import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
	Header,
	Catalog,
	ProductPage,
	Account,
	Orders,
	ShoppingCart,
	Users, 
	AddUser,
	UserPage,
	AdminOrders,
	AdminProducts,
	AddProduct,
	AdminProductPage
} from './components';

import { getCurrentUser, getCurrentUserToken } from './auth';

const App = () => {
	const [token, setToken] = useState(getCurrentUserToken());
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
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
					/>
					<Switch>
						<Route path='/store'>
							<Catalog />
						</Route>
						<Route path={'/products/:productId'}>
							<ProductPage
								token={token}
								currentUser={currentUser}
							/>
						</Route>
						<Route path='/account'>
							<Account currentUser={ currentUser } token={ token }/>
						</Route>
					</Switch>
					<Switch>
						<Route exact path='/orders'>
							{currentUser && currentUser.isAdmin ? <AdminOrders
								currentUser={currentUser}
								orders={orders}
								setOrders={setOrders}
								token={token}
							/> : null}				
						</Route>
						<Route exact path='/Myorders'>
							<Orders
								currentUser={currentUser}
								orders={orders}
								setOrders={setOrders}
								token={token}
							/>
						</Route>
						<Route exact path='/cart'>
							<ShoppingCart token={token} />
						</Route>
					<Route exact path='/users'>
						<Users currentUser={ currentUser } token={ token }/>
					</Route>
					<Route exact path='/users/add'>
						<AddUser currentUser={ currentUser }/>
					</Route>
					<Route path={`/users/:userId`}>
						<UserPage currentUser={ currentUser } token={ token }/>
					</Route>
					<Route exact path='/adminproduct'>
						<AdminProducts currentUser={ currentUser } token={ token }/>
					</Route>
					<Route exact path='/adminproduct/add'>
						<AddProduct currentUser={ currentUser } token={ token }/>
					</Route>
					<Route path={`/adminproduct/:productId`}>
						<AdminProductPage currentUser={ currentUser } token={ token }/>
					</Route>
					</Switch>
				</div>
			</ChakraProvider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
