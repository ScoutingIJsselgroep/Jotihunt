/**
 *
 * Gpsbutton
 *
 */

import React from 'react';
import { Link } from 'react-router';
// import styled from 'styled-components';


function Gpsbutton({ latitude, longitude }) {
  return (
    <Link
      target={'_blank'}
      to={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
      className="btn btn-default"
    >
      <i className="fa fa-location-arrow" aria-hidden="true"></i> Nav
    </Link>
  );
}

Gpsbutton.propTypes = {
  latitude: React.PropTypes.number,
  longitude: React.PropTypes.number,
};

export default Gpsbutton;
