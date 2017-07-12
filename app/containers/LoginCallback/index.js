/*
 *
 * LoginCallback
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginCallbackRequest } from './actions';

export class LoginCallback extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(loginCallbackRequest());
  }
  render() {
    return (
      <span>Logging you in...</span>
    );
  }
}

LoginCallback.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LoginCallback);
