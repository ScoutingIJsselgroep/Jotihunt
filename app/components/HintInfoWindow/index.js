/**
*
* HintInfoWindow
*
*/

import React, { PropTypes } from 'react';
import { InfoWindow } from 'react-google-maps';
import moment from 'moment';
import Gpsbutton from '../Gpsbutton/index';

// import styled from 'styled-components';


function HintInfoWindow({ hint, onToggleOpen }) {
  moment.locale('nl');
  return (
    <InfoWindow onCloseClick={onToggleOpen}>
      <div>
        <span className="pull-right label label-default" style={{ backgroundColor: `#${hint.HintType.color}` }}>{hint.HintType.name}</span>
        <span className="pull-right label label-default" style={{ backgroundColor: `#${hint.Subarea.color}` }}>{hint.Subarea.name}</span>
        <b>{hint.address}</b> <br />
        {hint.HintType.name == "Hint" ? moment(hint.createdAt).calendar() : moment(hint.createdAt).calendar() } <br />
        {hint.rdy && hint.rdx &&
        <code>{hint.rdy} {hint.rdx}</code>} <br />
        <Gpsbutton latitude={hint.latitude} longitude={hint.longitude} />
      </div>
    </InfoWindow>
  );
}

HintInfoWindow.propTypes = {
  hint: PropTypes.object,
  onToggleOpen: PropTypes.func,
};

export default HintInfoWindow;
