import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {

  return {

    type: actionTypes.AUTH_START

  };

};

export const authSuccess = (token, userId) => {

  return {

    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId

  };

};

export const authFail = (error) => {

  return {

    type: actionTypes.AUTH_FAIL,
    error: error

  };


};

export const logout = () => {

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');


  return {

    type: actionTypes.AUTH_LOGOUT

  };

};

export const checkAuthTimeout = (expirationTime) => {

  return dispatch => {

    setTimeout(() => {

      dispatch(logout());

    }, expirationTime * 1000);

  }

};

export const auth = (email, password, isSignup) => {

  return dispatch => {

    // dispatch to authenticate user
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCRfQptlmocbZ15NdUFPxtFd5UOwaFzpmc';

    if (!isSignup) {

        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCRfQptlmocbZ15NdUFPxtFd5UOwaFzpmc';

    }

    axios.post(url, authData)
      .then(response => {

        console.log(response.data);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); // new Date (nested inside) w/o arguments creates current date
                                                                                                 // new Date with arguments produces date with date passed as argument
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));

      }).catch(err => {

        console.log(err);
                          // get this endpoint from axios which wraps resposne in this error object
        dispatch(authFail(err.response.data.error));

      });

  };

};

export const setAuthRedirectPath = (path) => {

  return {

    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path

  }

};

export const authCheckState = () => {

  return dispatch => {

    const token = localStorage.getItem('token');

    if (!token) {

      dispatch(logout());

    } else {

      const expirationDate = new Date (localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {

        dispatch(logout())

        } else {

        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        // pass difference between user date and current date (in miliseconds)
        // difference is expiry date in miliseconds divided by 1000
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));

      }

    }

  }

};
