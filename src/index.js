import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog, SoloCard, ProductCard } from './components';
import { getCurrentUser, getCurrentUserToken } from './auth';

const App = () => {
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState({});
	const [token, setToken] = useState(getCurrentUserToken());
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	console.log('product:', product);
	const [productId, setProductId] = useState({});
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
							<Catalog
								products={products}
								setProducts={setProducts}
								product={product}
								setProduct={setProduct}
								productId={productId}
								setProductId={setProductId}
							/>
						</Route>
						<Route exact path={`/product/${product}`}>
							<SoloCard
								productId={productId}
								product={product}
								setProduct={setProduct}
								setProductId={setProductId}
								products={products}
								setProducts={setProducts}
							/>
						</Route>
					</Switch>
				</div>
			</ChakraProvider>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
