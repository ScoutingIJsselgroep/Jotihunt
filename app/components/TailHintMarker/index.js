/**
*
* TailHintMarker
*
*/

import React, { PropTypes } from 'react';
import { Marker } from 'react-google-maps';
import HintInfoWindow from '../HintInfoWindow';
// import styled from 'styled-components';


class TailHintMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.props.hint.isOpen = !this.props.hint.isOpen;
    this.forceUpdate();
  }

  render() {
    return (<Marker onClick={this.onToggleOpen} position={{ lat: this.props.hint.latitude, lng: this.props.hint.longitude }}>
      {this.props.hint.isOpen &&
      <HintInfoWindow hint={this.props.hint} onToggleOpen={this.onToggleOpen} />}
    </Marker>);
  }
}

TailHintMarker.propTypes = {
  hint: PropTypes.object,
};

export default TailHintMarker;
