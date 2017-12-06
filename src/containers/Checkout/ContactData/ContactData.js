import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends Component {

  state = {
    orderForm: {

        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        address: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Address'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Zip Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        deliveryMetod: {
          elementType: 'select',
          elementConfig: {
            options: [{value: 'fastest', displayValue: 'Fastest'},
                      {value: 'cheapest', displayValue: 'Cheapest'}]
          },
          value: 'fastest', //created bug if set to empty string // needs default value or won't get sent to db if not toggled
          validation: {}, // added to make all controls configured equally ... treated as undefined, but in this case does not adveresly effect the app
          valid: true // set to true b/c even though doesn't have validation rules, will return undefined when orderForm is looped through in inputChangedHandler, will in turn makes all the other inputs register as undefined as well b/c never gets set to true (undefined by default is false)
        }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    // prevent default behavior of sending request which reload the pagewith form submit
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifiier in this.state.orderForm) {
                                                          // value dynamically updated via inputChangeHandler function (is just value user enters)
      formData[formElementIdentifiier] = this.state.orderForm[formElementIdentifiier].value;

    }

    const order = {

      ingredients: this.props.ings,
      price: this.props.price.toFixed(2), //  should recalculate total price on server to ensure user hasn't manipluated browser
      orderData: formData,
      userId: this.props.userId

    }

    this.props.onOrderBurger(order, this.props.token)

  }

  checkValidity(value, rules) {

    let isValid = true;

    if (!rules ) {

      return true;

    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid; //returns true or false

  }

  inputChangedHandler = (event, inputIdentifier) => {

      // note: this does not create deep clone...want to get 'value' property, but since it's nested,
      // can't access it here and then set state b/c would mutate the original state object
      const updatedOrderForm = {

        ...this.state.orderForm

      }

      // creates deep clone by pulling properties out of nested object
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      }

      // can now reassign updatedOrderForm in a way that won't mutate orginal state
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;

      for (let inputIdentifier in updatedOrderForm) {
                       // && required to make sure don't run into problem of being set to true only b/c last check in loop is true
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

      }

      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})

  }

  render() {

    const formElementsArray = [];

    for (let key in this.state.orderForm) {

      formElementsArray.push({

        id: key,
        config: this.state.orderForm[key]

      });

    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (

          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} //turn true to false and vice versae b/c passing the opposite
            shouldValidate={formElement.config.validation} // if validation property isn't set (i.e. like on delieveryMethod) will return false and 'if (props.invalid && props.shouldValidate' (around line 11 in Input.css) will not run and won't get invalid input for dropdown
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} //anonymous function allows to be able to pass arguments to inputChangeHandler call
          />

        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );                              // disabled is true if form is not valid
                                    // ...disabled property now added to Button element (wasn't initially set)
    if(this.props.loading) {

      form = <Spinner />

    }

    return (

      <div className={classes.ContactData}>
        <h4>Enter your Contact Info</h4>
        {form}
      </div>

    );

  }

}

const mapStateToProps = state => {

  return {

    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId

  }

};

const mapDispatchToProps = dispatch => {

  return {

    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

  }

}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
