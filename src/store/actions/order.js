import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//expect id from database so can pass on
export const purchaseBurgerSuccess = (id, orderData) => {

  return {

    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,

  };

};

export const purchaseBurgerFail = (error) => {

  return {

    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error

  };

};

//note: both action creators above are synchronous


//below: asynchronous action creators;

// created so can be handled by Redux b/c being asnychornous gets handled by reducer
export const purchaseBurgerStart = () => {

  return {

    type: actionTypes.PURCHASE_BURGER_START

  }

}

//action dispatched from container when 'order' button is clicked
export const purchaseBurger = (orderData, token) => {

  return dispatch => {
    dispatch(purchaseBurgerStart()); // execute this function to dispatch action right at starT
                                      // make sure to wrap with dispatch() to gets dispatched to store

    // created endpoint in Firebase 'orders' (i.e. '/orders' added on to baseURL)
     // *note: Firebase also requires enpoint appended w/ '.json'
    axios.post('/orders.json?auth=' + token, orderData) // 2nd argument order is order variable from above
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error));
    });

  };

};

export const purchaseInit = () => {

  return {

    type: actionTypes.PURCHASE_INIT

  };

};


export const fetchOrdersSuccess = (orders) => {

  return {

    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders

  };

};

export const fetchOrdersFail = (error) => {

  return {

    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error

  };

};

export const fetchOrdersStart = () => {

  return {

    type: actionTypes.FETCH_ORDERS_START

  };

};

export const fetchOrders = (token, userId) => {

  return dispatch => {
    dispatch(fetchOrdersStart());
    // query param understood by Firebase
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
     .then(res => {

       //helper to convert json object returned,
       // and then push new object into fetchedOrders
       // with the properties of the order object fetched
         const fetchedOrders = [];
         for (let key in res.data) {
         fetchedOrders.push({
           ...res.data[key],
           id: key
         });
       }

       dispatch(fetchOrdersSuccess(fetchedOrders))

     }).catch(err => {

       dispatch(fetchOrdersFail(err))

     });

  }

};
