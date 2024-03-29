/**
*
* SuccessComponent
*
*/

import React from 'react';
import PropTypes from 'prop-types';


const subareas = require('../../../config').dbMappings.nArea;
// import styled from 'styled-components';


function SuccessComponent({ message, values }) {
  return (
    <div className="alert alert-success" role="alert">
      {message}
      {values && <ul>{values.map((value, i) => <li key={i}>{subareas[i]} {value[0]} {value[1]}</li>)}</ul>}
    </div>
  );
}

SuccessComponent.propTypes = {
  message: PropTypes.string,
  values: PropTypes.array,
};

export default SuccessComponent;
