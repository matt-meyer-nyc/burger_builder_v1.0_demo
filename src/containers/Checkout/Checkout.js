import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';



class Checkout extends Component {


  // state = {
  //   ingredients: null,
  //   price: 0
  // }

  // componentWillMount() {
  //   // references search url string created in BurgerBuilder
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {};
  //   let price = 0;
  //
  //   for (let param of query.entries()) {
  //     // entries creates array of key value pairs in as ex. ['salad': '1'] so needs to be parced
  //
  //     if (param[0] === 'price') {
  //
  //       price = param[1];
  //
  //     } else {
  //     // updated ingredients state object
  //                             //note: '+' infront of param[1] converts it to a number
  //       ingredients[param[0]] = +param[1]; // value from key: value (from example above '1')
  //
  //     }
  //
  //     this.setState({ ingredients: ingredients, totalPrice: price })
  //
  //
  //   }
  //
  // }


  checkoutCanceledHandler = () => {
    // '.history.goBack()'' provided by react router
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    // ''.history.replace()' provided by react router'
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    // if no ingredients loaded (sp. example /contact-data page and a rerfresh a page which throws error )
    // redirect user to root page
    let summary = <Redirect to="/" />

    // if ingredients added/loaded, render CheckoutSummary & Route to contact-data
    if (this.props.ings) {

       // if purchased true, redirect to home page
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

     summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );

    }

    // refactored update since <div> returned above
    return summary;

  }

}

const mapStateToProps = state => {

  return {

    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased

  };

}



export default connect(mapStateToProps)(Checkout);
