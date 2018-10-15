/*
 *
 * AddHunt
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectAddHunt, {
  huntErrorSelector,
  huntLoadingSelector, huntResultSelector, locationErrorSelector, locationLoadingSelector,
  locationResultSelector,
} from './selectors';
import { loadLocation, submitHunt } from './actions';
import LoadingIndicator from '../../components/LoadingIndicator/index';
import ErrorComponent from '../../components/ErrorComponent/index';
import MapDetailView from '../../components/MapDetailView/index';
import capitalize from './capitalize';
import SuccessComponent from '../../components/SuccessComponent/index';

export class AddHunt extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadLocation([this.props.params.lat, this.props.params.lng]));
  }

  onSubmit() {
    const { dispatch } = this.props;
    dispatch(submitHunt([this.props.params.lat, this.props.params.lng], this.props.route.type, this.refs.time.value));
  }

  render() {
    if (this.props.locationLoading || this.props.huntLoading) {
      return <LoadingIndicator />;
    }
    if (this.props.locationError || this.props.huntError) {
      return <ErrorComponent error={'Er is iets fout gegaan.'} />;
    }
    if (this.props.locationResult) {
      const defaultDate = new Date();
      if (this.props.route.type === "hunt") {
        defaultDate.setMinutes(defaultDate.getMinutes() - 10);
      }
      const defaultTimestring = (""+defaultDate.getHours()).padStart(2, 0) + ':' + (""+defaultDate.getMinutes()).padStart(2, 0);

      return (
        <div className="container">
          <div className="row">
            <Helmet
              title="Markering toevoegen"
              titleTemplate="%s | Jotihunt.js"
              meta={[
              { name: 'description', content: 'Markering toevoegen aan het systeem' },
              ]}
            />
            <div className="col-md-8 col-md-offset-2 col-sm-12">
              {
                this.props.huntResult && <SuccessComponent message={'Succesvol opgeslagen'} />
              }
              <div className="panel panel-default">
                <div className="panel-heading">
                  {capitalize(this.props.route.type)} toevoegen
                </div>
                <div className="panel-body">
                  {!this.props.huntResult && <span>Controleer onderstaande informatie. Deze informatie wordt opgeslagen als {this.props.route.type} en in de Telegram-chat verstuurd.</span>}

                  <div className="form-group">
                    <span>Adres</span>
                    <input type="email" className="form-control" disabled value={!this.props.locationResult.address[0] ? 'Onbekende weg' : this.props.locationResult.address[0].formatted_address} />
                  </div>

                  <div className="form-group">
                    <span>Deelgebied</span>
                    <input type="email" className="form-control" disabled value={this.props.locationResult.subarea} />
                  </div>

                  <div className="form-group">
                    <span>Tijdstip</span>
                    <input ref="time" type="time" className="form-control" defaultValue={defaultTimestring} disabled={this.props.huntResult ? true : false} />
                  </div>

                  <MapDetailView lat={parseFloat(this.props.params.lat)} lng={parseFloat(this.props.params.lng)} />

                  {this.props.huntResult ?
                    <Link to="/map" className={'btn btn-default'}><i className={'fa fa-map'} /> Ga naar de kaart</Link>
                    :
                    <button className={'btn btn-primary'} onClick={this.onSubmit}>
                      Verstuur {this.props.route.type}</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>

      </div>
    );
  }
}

AddHunt.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationLoading: PropTypes.bool,
  locationError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  locationResult: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  params: PropTypes.object,
  huntLoading: PropTypes.bool,
  huntResult: PropTypes.bool,
  huntError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  AddHunt: makeSelectAddHunt(),
  locationLoading: locationLoadingSelector(),
  locationError: locationErrorSelector(),
  locationResult: locationResultSelector(),
  huntLoading: huntLoadingSelector(),
  huntResult: huntResultSelector(),
  huntError: huntErrorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHunt);
