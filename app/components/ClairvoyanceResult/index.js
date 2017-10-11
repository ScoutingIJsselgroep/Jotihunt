/**
 *
 * ClairvoyanceResult
 *
 */

import React, { PropTypes } from 'react';
import ClairvoyanceResultMapper from '../ClairvoyanceResultMapper/index';

// import styled from 'styled-components';


class ClairvoyanceResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={'row'}>
        <div className={'col-sm-6'}>
          <h4>Beste resultaat</h4>
          <ClairvoyanceResultMapper onSubmitValuesAsHint={this.props.onSubmitValuesAsHint} result={this.props.result[1]} />
        </div>
        <div className={'col-sm-6'}>
          <h4>Overige resultaten</h4>
          {this.props.result[0].map((result, i) => <ClairvoyanceResultMapper
            key={i} onSubmitValuesAsHint={this.props.onSubmitValuesAsHint}
            result={result}
          />)}
        </div>
      </div>
    );
  }
}

ClairvoyanceResult.propTypes = {
  result: PropTypes.array,
  onSubmitValuesAsHint: PropTypes.func,
};

export default ClairvoyanceResult;
