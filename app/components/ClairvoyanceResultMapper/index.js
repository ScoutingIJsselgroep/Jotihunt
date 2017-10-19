/**
 *
 * ClairvoyanceResultMapper
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
const config = require('../../../config');

// import styled from 'styled-components';


class ClairvoyanceResultMapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.result);
    return (
      <div className="panel panel-default">
        <table className="table">
          <tbody>
            {_.map(this.props.result, (result, i) => <tr key={i}>
              <td>{config.dbMappings.nArea[i]}</td>
              <td>{result.split(' ')[0]}</td>
              <td>{result.split(' ')[1]}</td>
            </tr>)}
          </tbody>
        </table>
        <div className="panel-body">
          Klopt het resultaat? Verstuur het dan in één keer!
          <button onClick={() => this.props.onSubmitValuesAsHint(this.props.result)} className="btn btn-default pull-right">Versturen</button>
        </div>
      </div>
    );
  }
}

ClairvoyanceResultMapper.propTypes = {
  result: PropTypes.array,
  onSubmitValuesAsHint: PropTypes.func,
};

export default ClairvoyanceResultMapper;
