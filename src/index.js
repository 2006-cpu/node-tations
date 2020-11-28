import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog, SoloCard, MyOrders, Orders, ShoppingCart } from './components';
import { getCurrentUser, getCurrentUserToken, requireAdmin } from './auth';


const App = () => {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [token, setToken] = useState(getCurrentUserToken());
	const [user, setUser] = useState({});
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	const [ isAdmin, setIsAdmin ] = useState(Boolean);
	const [orders, setOrders] = useState([{}]);
	console.log("isAdmin:", isAdmin)
	console.log("product:", product)
	const [productId, setProductId] = useState({});
	return (
		<Router>
			<ChakraProvider>
				<div className='App'>
					<Header user={user} setUser={setUser} token={ token } setToken={ setToken } currentUser={ currentUser } setCurrentUser={ setCurrentUser } isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
					<Switch>
						<Route path='/home'>
							<h2 className='Home'>
								Welcome to Title of Website
							</h2>
						</Route>
						<Route exact path='/products'>
							<Catalog products={products} setProducts={setProducts} product={product} setProduct={setProduct} productId={productId} setProductId={setProductId} />
						</Route>
						<Route exact path={`/product/${product}`} >
							<SoloCard productId={productId} product={product} setProduct={setProduct} setProductId={setProductId} products={products} setProducts={setProducts}/>
						</Route>
						<Route exact path='/orders' >
							<Orders  currentUser={currentUser} orders={orders} setOrders={setOrders} user={user} setUser={setUser} productId={productId} product={product} setProduct={setProduct} setProductId={setProductId} products={products} setProducts={setProducts}/>
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
