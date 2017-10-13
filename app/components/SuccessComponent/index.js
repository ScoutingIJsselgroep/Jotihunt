/**
*
* SuccessComponent
*
*/

import React, { PropTypes } from 'react';

const subareas = require('../../../config').dbMappings.nArea;
// import styled from 'styled-components';


function SuccessComponent({ message, values }) {
  return (
    <div className="alert alert-success" role="alert">
      {message}
      {values && <ul>{values.map((value, i) => <li key={i}>{subareas[i]} {value}</li>)}</ul>}
    </div>
  );
}

SuccessComponent.propTypes = {
  message: PropTypes.string,
  values: PropTypes.array,
};

export default SuccessComponent;
