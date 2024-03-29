/**
*
* HintMarker
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-google-maps';
import moment from 'moment';
import HintInfoWindow from '../HintInfoWindow';
const hint = require('./Hint.png');
const hunt = require('./Hunt.png');
const message = require('./Message.png');
// import styled from 'styled-components';
const historyTime = require('../../../config').map.historyTime;


class HintMarker extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.props.hint.isOpen = !this.props.hint.isOpen;
    this.props.onInfoWindow("hints", this.props.hint.id, this.props.hint.isOpen)
    this.forceUpdate();
  }

  render() {
    const duration = moment.duration(moment(new Date()).diff(moment(this.props.hint.createdAt)));

    let icon;
    switch (this.props.hint.HintType.name) {
      case 'Hint':
        icon = hint;
        break;
      case 'Hunt':
        icon = hunt;
        break;
      case 'Message':
        icon = message;
        break;
      default:
        icon = hint;
        break;
    }

    if (this.props.history || duration.asHours() < historyTime) {
      return (<Marker
        onClick={this.onToggleOpen} icon={icon}
        opacity={this.props.tail ? 1.0 : 0.5}
        position={{ lat: this.props.hint.latitude, lng: this.props.hint.longitude }}
      >
        {this.props.hint.isOpen &&
        <HintInfoWindow hint={this.props.hint} onToggleOpen={this.onToggleOpen} />}
      </Marker>);
    }
    return null;
  }
}

HintMarker.propTypes = {
  hint: PropTypes.object,
  history: PropTypes.bool,
  onInfoWindow: PropTypes.func,
};

export default HintMarker;
