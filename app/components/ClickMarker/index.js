/**
*
* ClickMarker
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import createRef from 'create-react-ref/lib/createRef';
import { Marker, InfoWindow } from 'react-google-maps';
import LoadingIndicator from '../../components/LoadingIndicator/index';

// import styled from 'styled-components';

class ClickMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.infoWindow = createRef();
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.props.latlng.isOpen = !this.props.latlng.isOpen;
    this.forceUpdate();
  }

  render() {
    return (
      <Marker
        position={{ lat: this.props.latlng[0], lng: this.props.latlng[1] }}
        onClick={this.onToggleOpen}
      >
        {this.props.latlng.isOpen && <InfoWindow>
          {(this.props.loadRightClick || this.props.latlng) &&
          <div>
            {this.props.clickLocationInfo && !this.props.loading && <div>
                <b>{this.props.clickLocationInfo.address[0] ? this.props.clickLocationInfo.address[0].formatted_address : 'Onbekende weg'}</b>
                <br /><br />
                <div className="btn-group" role="group" aria-label="...">
                  <Link to={`/hint/addhint/${this.props.latlng[0]}/${this.props.latlng[1]}`} className={'btn btn-primary btn-small'}><i className="fa fa-map-marker" aria-hidden="true"></i> Verstuur locatie</Link>
                  <Link to={`/hint/addhunt/${this.props.latlng[0]}/${this.props.latlng[1]}`} className={'btn btn-primary btn-small'}><i className="fa fa-star" aria-hidden="true"></i> Meld hunt</Link>
                </div>
            </div>}
          </div>}
        </InfoWindow>}

      </Marker>
    );
  }
}

ClickMarker.propTypes = {
  latlng: React.PropTypes.array,
  isOpen: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  clickLocationInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default ClickMarker;


