/**
*
* ErrorComponent
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

function ErrorComponent({ message }) {
  return (
    <div className="alert alert-danger" role="alert">{message}</div>
  );
}

ErrorComponent.propTypes = {
  message: PropTypes.string,
};

export default ErrorComponent;
