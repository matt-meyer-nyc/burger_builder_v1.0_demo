import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // if new show state not equal to current state
/*      if (nextProps.show !== this.props.show) {
           return true;
         }
*/
    // optimized to:
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

  }

  componentWillUpdate() {

  }

  render() {

    return (

      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
          >
          {this.props.children}
        </div>
      </Aux>

    )

  }

}



export default Modal;



//originally functional component
// const modal = (this.props) => (
//
//   <Aux>
//     <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
//     <div
//       className={classes.Modal}
//       style={{
//         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
//         opacity: this.props.show ? '1' : '0'
//       }}
//       >
//       {this.props.children}
//     </div>
//   </Aux>
//
// );
