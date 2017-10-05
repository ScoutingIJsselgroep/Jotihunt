/*
 *
 * Login
 *
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createAndShow } from './lib';

const Container = styled.div`
  margin: 2em 0;
`;

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const nextPathname = this.props.location.state && this.props.location.state.nextPathname;
    createAndShow(nextPathname || '/', false);
  }
  render() {
    return (
      <Container />
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      nextPathname: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Login);
