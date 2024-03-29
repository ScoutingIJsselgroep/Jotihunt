/**
 *
 * ClairvoyanceResult
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ClairvoyanceResultMapper from '../ClairvoyanceResultMapper/index';

// import styled from 'styled-components';


class ClairvoyanceResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={'row'}>
        <div className={'col-sm-6'}>
          <h4>Beste resultaat</h4>
          <ClairvoyanceResultMapper onSubmitValuesAsHint={this.props.onSubmitValuesAsHint} result={this.props.result.best} hints={this.props.hints}/>
        </div>
        <div className={'col-sm-6'}>
          <h4>Overige resultaten <span className="label label-default">{this.props.result.other.length}</span></h4>
          {this.props.result.other.map((result, i) => <ClairvoyanceResultMapper
            key={i} onSubmitValuesAsHint={this.props.onSubmitValuesAsHint}
            result={result}
            hints={this.props.hints}
          />)}
        </div>
      </div>
    );
  }
}

ClairvoyanceResult.propTypes = {
  result: PropTypes.object,
  onSubmitValuesAsHint: PropTypes.func,
  hints: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default ClairvoyanceResult;
