/*
 *
 * Clairvoyance
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectClairvoyance, {
  makeSelectLoading, makeSelectResult, makeSelectSuccess, makeSelectError,
  makeSelectHintValues, hintsSelector,
} from './selectors';
import ClairvoyanceForm from '../../components/ClairvoyanceForm/index';
import { submitValues, submitValuesAsHint, loadHints } from './actions';
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadHints());
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
        <Helmet
          title="Clairvoyance"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            { name: 'description', content: 'Clairvoyance stelt je in staat om zonder de puzzel te weten de oplossing te bruteforcen!' },
          ]}
        />
        {this.props.success && <SuccessComponent message={'De volgende hints zijn verstuurd:'} values={this.props.sendValues} />}
        {this.props.error && <ErrorComponent message={'Er is iets fout gegaan'} />}
        <div className="panel panel-default">
          <div className="panel-body">
            <h1>Clairvoyance</h1>
            <p className="lead">Clairvoyance (letterlijk <i>clear vision</i>) stelt je in staat om zonder de puzzel te
            weten,
            de oplossing te bruteforcen!</p>
            <span>
            Puzzels bij de Jotihunt zitten vaak op dezelfde manier in elkaar. Ze bestaan (per deelgebied) uit tien plaatjes.
            Je kunt vaak herleiden welk plaatje een 1, 2 of 4 is. Met deze tool kun je de rest ook herleiden, door middel van grove hacks! Zo doe je dat:
            <ol>
              <li>Vertaal ieder plaatje naar een letter. Het plaatje met Tom Hanks wordt A, die met Tom Cruise B, Nicolas Cage C, enzovoort! </li>
              <li>Doe dit voor elk coordinaat en vul ze in als <code>ABCCD DABDA</code></li>
              <li>Klik op verstuur. Er komen enkele mogelijkheden.</li>
              <li>Zoek de meest waarschijnlijke uit!</li>
              <li>NB: als een deelgebied offline is, kan ook <code>XXXXX XXXXX</code> gebruikt worden! De nauwkeurigheid neemt af met het aantal deelgebieden dat offline is.</li>
            </ol>
            </span>
          </div>
        </div>

        {this.props.result &&
        <ClairvoyanceResult result={this.props.result} onSubmitValuesAsHint={this.onSubmitValuesAsHint} hints={this.props.hints} />}
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
    PropTypes.object,
  ]),
  sendValues: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  hints: PropTypes.oneOfType([
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
  hints: hintsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clairvoyance);
