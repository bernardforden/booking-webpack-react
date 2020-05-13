import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import List from '../List';
import Login from '../Login';
import Signup from '../Signup';
import Review from '../Review';
import Payment from '../Payment';
import Finish from '../Finish';

class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/list' component={List} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/review' component={Review} />
            <Route exact path='/payment' component={Payment} />
            <Route exact path='/finish' component={Finish} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;