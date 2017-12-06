import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

                        // WrappedComponenet is any component that uses axios to handle it's errors
const withErrorHandler = (WrapppedComponent, axios) => {

  // anononymous class (factory fucntion)
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount() {
      // by adding 'this.' create new property for this anonoymous class that can be referenced later
       this.reqInterceptor = axios.interceptors.request.use(req => {

        // clears error so when make request, don't have
        // error set up anymore
        this.setState({error: null});
        // return req config so req can continue
        return req;

      });

      // res => res (response handler from returning response)
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {

        this.setState({ error: error })

      });

    }

    // removes interceptors so not used when not needed
    // making sure not to leak memory (or creating errors)
    // (if not, interceptor would get called multiple times)
    // depending on which component this withErrorHandler component gets wrapped around
    componentWillUnmount() {

      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);

    }

    errorConfirmedHandler = () => {

      this.setState({ error: null });

    }

    render () {

      return (

        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler} // also needed to clear error
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapppedComponent {...this.props} />
        </Aux>

      )

    }
  }

}

export default withErrorHandler;
