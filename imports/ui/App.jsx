import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import PrivateRoute from './helpers/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import Visualiza from './pages/Visualiza';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

import logo from './assets/logo.png';
import history from './helpers/history';

function App() {
  return (
    <Router history={history}>
      <div>
        <Navbar logo={logo} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute path="/visualiza" component={Visualiza} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default hot(module)(App);
