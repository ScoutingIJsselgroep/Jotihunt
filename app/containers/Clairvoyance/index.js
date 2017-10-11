/*
 *
 * Clairvoyance
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectClairvoyance, {
  makeSelectLoading, makeSelectResult, makeSelectSuccess, makeSelectError,
  makeSelectHintValues
} from './selectors';
import ClairvoyanceForm from '../../components/ClairvoyanceForm/index';
import { submitValues, submitValuesAsHint } from './actions';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import ClairvoyanceResult from '../../components/ClairvoyanceResult/index';
import SuccessComponent from '../../components/SuccessComponent/index';
import ErrorComponent from '../../components/ErrorComponent/index';


export class Clairvoyance extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmitValues = this.onSubmitValues.bind(this);
    this.onSubmitValuesAsHint = this.onSubmitValuesAsHint.bind(this);
  }

  onSubmitValues(values) {
    const { dispatch } = this.props;
    dispatch(submitValues(values));
  }

  onSubmitValuesAsHint(values) {
    const { dispatch } = this.props;
    dispatch(submitValuesAsHint(values));
  }

  render() {
    return (
      <div>
        {this.props.success && <SuccessComponent message={'De volgende hints zijn verstuurd:'} values={this.props.sendValues} />}
        {this.props.error && <ErrorComponent message={'Er is iets fout gegaan'} />}
        <h1>Clairvoyance</h1>
        <p className="lead">Clairvoyance (letterlijk <i>clear vision</i>) stelt je in staat om zonder de puzzel te
          weten,
          de oplossing te bruteforcen!</p>
        <span>
          Puzzels bij de Jotihunt zitten vaak op dezelfde manier in elkaar. Ze bestaan (per deelgebied) uit tien plaatjes.
          Je kunt vaak herleiden welk plaatje een 1, 2 of 4 is. Met deze tool kun je de rest ook herleiden!. Zo doe je dat:
          <ol>
            <li>Vertaal ieder plaatje naar een letter. Het plaatje met Thor wordt A, die met Wodan B, enzovoort! </li>
            <li>Doe dit voor elk coordinaat en vul ze in als <code>ABCCD DABDA</code></li>
            <li>Klik op verstuur. Er komen enkele mogelijkheden.</li>
            <li>Zoek de meest waarschijnlijke uit!</li>
          </ol>
        </span>
        {this.props.result &&
        <ClairvoyanceResult result={this.props.result} onSubmitValuesAsHint={this.onSubmitValuesAsHint} />}
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
  success: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  result: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  sendValues: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

const mapStateToProps = createStructuredSelector({
  Clairvoyance: makeSelectClairvoyance(),
  loading: makeSelectLoading(),
  result: makeSelectResult(),
  success: makeSelectSuccess(),
  error: makeSelectError(),
  sendValues: makeSelectHintValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clairvoyance);
