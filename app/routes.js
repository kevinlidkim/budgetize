import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Purchase from './components/Purchase';
import PurchaseHistory from './components/PurchaseHistory';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/purchase" component={Purchase} />
    <Route path="/purchase_history" component={PurchaseHistory} />
  </Route>
);