import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import DashboardPage from '../components/dashboardPage';
import UsersPage from '../components/usersPage';
import ContactPage from '../components/contactPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact={true} component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/users" component={UsersPage} />
            <PrivateRoute path="/contact" component={ContactPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
