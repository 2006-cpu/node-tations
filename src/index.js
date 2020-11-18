import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from "@chakra-ui/react"

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Header
} from './components';

import {
  getProducts
} from './api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProducts()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <Router>
      <ChakraProvider>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/home">
              <h2 className="Home">Welcome to Title of Website</h2>
            </Route>
            <Route path="/products">
              <h2 className="Products">Welcome to Products Page</h2>
            </Route>
          </Switch>
          <h1>Hello, World!</h1>
          <h2>{ message }</h2>
        </div>
      </ChakraProvider>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);