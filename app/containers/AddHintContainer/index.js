/*
 *
 * AddHintContainer
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NewHintForm from 'components/NewHintForm';
import { getCoordinates, submitCoordinates, loadLastHint } from './actions';
import makeSelectAddHintContainer, {
  makeSelectWgs, makeSelectSubarea, makeSelectAddress, makeSelectLoading,
  makeSelectHintSubmitted, makeSelectLoadingLastHint, makeSelectLastHintError,
  makeSelectLastHint,
} from './selectors';
import AddHintMap from '../../components/AddHintMap/index';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import SuccessComponent from '../../components/SuccessComponent/index';
import moment from 'moment';
import { REFRESH_ARTICLES } from '../../../server/socket_actions';

function addGoogleLens(html) {

  let matches = html.matchAll(/<img\s+[^>]*src="([^"]*)"[^>]*>/gm);

  for (const match of matches) {
    html = html.replace(match[0], match[0] + `<br/><a target="_blank" href="https://lens.google.com/uploadbyurl?url=${match[1]}&st=1664807042074&ep=gisbubu"><span title="Search Google Lens" class="fa fa-google"></span></a>`)
  }

  return html
}

export class AddHintContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onCoordinateChange = this.onCoordinateChange.bind(this);
    this.onCoordinateSubmit = this.onCoordinateSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadLastHint());

    const socket = openSocket();
    socket.on(REFRESH_ARTICLES, function (msg) {
      dispatch(loadLastHint());
    });
  }

  onCoordinateChange({ rdx, rdy, subarea }) {
    const { dispatch } = this.props;
    dispatch(getCoordinates(rdx, rdy, subarea));
  }

  onCoordinateSubmit() {
    const { dispatch } = this.props;
    dispatch(submitCoordinates());
  }

  render() {
    moment.locale('nl');

    return (
      <div className="">
        <div className="row">
          <Helmet
            title="Hint toevoegen"
            titleTemplate="%s | Jotihunt.js"
            meta={[
              { name: 'description', content: 'Hint toevoegen aan het systeem' },
            ]}
          />
          <div className="col-md-4 col-sm-12 sidebar">
            {this.props.hintSubmitted && <SuccessComponent message={'De hint is ingestuurd.'} />}
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Hint toevoegen</h3>
              </div>
              <div className="panel-body">
                Voeg een hint toe aan het systeem. Door op 'versturen' te klikken, wordt de hint toegevoegd aan het systeem en verstuurd via Telegram.<br /><br />

                <NewHintForm onCoordinateChange={this.onCoordinateChange} onSubmitCoordinates={this.onCoordinateSubmit} />
                <hr />
                {this.props.loading ?
                  <LoadingIndicator />
                  :
                  <div>
                    < div className="form-group">
                      <span htmlFor="rdx">Adres</span>
                      <input className="form-control" placeholder="Vul eerst coördinaten in" disabled value={this.props.address && this.props.address[0] ? this.props.address[0].formatted_address : ''} />
                    </div>
                    <AddHintMap wgs={this.props.wgs} address={this.props.address} />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  {this.props.lastHint ? this.props.lastHint.title : "Laatst bekende hint"}
                </h3>
                {this.props.lastHint && this.props.lastHint.start && moment(this.props.lastHint.start).calendar()}
              </div>
              <div className="panel-body">
                {this.props.loadingLastHint && <LoadingIndicator />}
                {this.props.lastHintError && "Error!"}
                {this.props.lastHint && <div dangerouslySetInnerHTML={{ __html: addGoogleLens(this.props.lastHint.content) }} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddHintContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  subarea: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  wgs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
  hintSubmitted: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  AddHintContainer: makeSelectAddHintContainer(),
  subarea: makeSelectSubarea(),
  address: makeSelectAddress(),
  wgs: makeSelectWgs(),
  loading: makeSelectLoading(),
  hintSubmitted: makeSelectHintSubmitted(),
  loadingLastHint: makeSelectLoadingLastHint(),
  lastHint: makeSelectLastHint(),
  lastHintError: makeSelectLastHintError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHintContainer);
