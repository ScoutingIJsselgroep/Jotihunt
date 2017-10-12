/**
 *
 * Gpsbutton
 *
 */

import React from 'react';
// import styled from 'styled-components';


function Gpsbutton({ latitude, longitude }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
      className="btn btn-default"
    >
      <i className="fa fa-location-arrow" aria-hidden="true"></i> Nav
    </a>
  );
}

Gpsbutton.propTypes = {
  latitude: React.PropTypes.number,
  longitude: React.PropTypes.number,
};

export default Gpsbutton;
