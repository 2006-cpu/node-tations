import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Catalog } from './components';

const App = () => {
	return (
		<Router>
			<ChakraProvider>
				<div className='App'>
					<Header />
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
