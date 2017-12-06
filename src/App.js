import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {

  componentDidMount() {

    this.props.onTryAutoSignUp();

  }

  render() {

    // routes broken up to guard routes
    // if user not signed in and goes to /orders for ex. will redirect to homepage

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {

      routes = (

        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>

      );

    };



    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {

    isAuthenticated: state.auth.token != null

  }

}

const mapDispatchToProps = dispatch => {

  return {

    onTryAutoSignUp: () => dispatch(actions.authCheckState())

  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
