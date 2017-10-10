/*
 *
 * Clairvoyance
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectClairvoyance, { makeSelectLoading, makeSelectResult } from './selectors';
import ClairvoyanceForm from '../../components/ClairvoyanceForm/index';
import { submitValues } from './actions';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import ClairvoyanceResult from '../../components/ClairvoyanceResult/index';


export class Clairvoyance extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmitValues = this.onSubmitValues.bind(this);
  }

  onSubmitValues(values) {
    const { dispatch } = this.props;
    dispatch(submitValues(values));
  }

  render() {
    return (
      <div>
        <h1>Clairvoyance</h1>
        <p className="lead">Clairvoyance (letterlijk <i>clear vision</i>) stelt je in staat om zonder de puzzel te
          weten,
          de oplossing te bruteforcen!</p>
        {this.props.result &&
        <ClairvoyanceResult result={this.props.result} />}
        {this.props.loading ?
          <LoadingIndicator />
          :
          <ClairvoyanceForm onSubmitValues={this.onSubmitValues} />
        }
      </div>
    );
  }
}

Clairvoyance.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  result: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  Clairvoyance: makeSelectClairvoyance(),
  loading: makeSelectLoading(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clairvoyance);
