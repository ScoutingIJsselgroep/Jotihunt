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
    return (
      <div className="panel panel-default">
        <table className="table">
          <tbody>
            {_.map(this.props.result.rd, (result, i) => <tr key={i}>
              <td>{config.dbMappings.nArea[i]}</td>
              <td>{result[0]}</td>
              <td>{result[1]}</td>
              <td>{this.props.result.cost[i].toFixed(1)} km</td>
            </tr>)}
          </tbody>
        </table>
        <div className="panel-body">
          Klopt het resultaat? Verstuur het dan in één keer!
          <button onClick={() => this.props.onSubmitValuesAsHint(this.props.result.rd)} className="btn btn-default pull-right">Versturen</button>
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
