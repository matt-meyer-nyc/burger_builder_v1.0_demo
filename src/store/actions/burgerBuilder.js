import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {

  return {

    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name

  };

};

export const removeIngredient = (name) => {

  return {

    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name

  };

};

export const setIngredients = (ingredients) => {

  return {

    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients

  };

};

export const fetchIngredientsFailed = () => {

  return {

    type: actionTypes.FETCH_INGREDIENTS_FAILED

  };

};

export const initIngredients = () => {
  // returns function that recieves dispatch function which can then be used in returned funciton body
  // syntax available from redux-thunk that allows action creators to be used like this
  return dispatch => {

    axios.get('https://react-burger-builder-a485f.firebaseio.com/ingredients.json')
     .then(response => {

       dispatch(setIngredients(response.data));

     }).catch(error => {

       dispatch(fetchIngredientsFailed());

     });

  };

};
