/**
*
* ClairvoyanceResultMapper
*
*/

import React, { PropTypes } from 'react';
const config = require('../../../config');
// import styled from 'styled-components';


class ClairvoyanceResultMapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="panel panel-default">
        <table className="table">
          <tbody>
            {this.props.result.map((result, i) => <tr><td>{config.dbMappings.nArea[i]}</td><td>{result.split(' ')[0]}</td><td>{result.split(' ')[1]}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

ClairvoyanceResultMapper.propTypes = {
  result: PropTypes.array,
};

export default ClairvoyanceResultMapper;
