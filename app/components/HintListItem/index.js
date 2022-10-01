/**
 *
 * HintListItem
 *
 */

import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';
import Gpsbutton from 'components/Gpsbutton';
const Color = require('color');


const MixLabel = styled.span`
  background-color: ${(props) => Color('#777777').mix(Color(props.color))} !important;
`;

const Label = styled.span`
  background-color: ${(props) => props.color} !important;
`;


function HintListItem({ hint, deleteHint }) {
  moment.locale('nl');
  // Label
  return (
    <tr>
      <td><MixLabel className="label label-default" color={`#${hint.HintType.color}`}><i
        className={hint.HintType.icon}
      /> {hint.HintType.name}</MixLabel></td>
      <td><Label className="label label-default" color={`#${hint.Subarea.color}`}> {hint.Subarea.name}</Label></td>
      <td>{hint.address}</td>
      <td>{hint.rdy || hint.longitude} / {hint.rdx || hint.latitude}</td>
      <td>{moment(hint.createdAt).calendar()}</td>
      <td>
        <div className="btn-group">
          <Link to={`/map/${hint.latitude}/${hint.longitude}`} className="btn btn-default"><i
            className="fa fa-map-o" aria-hidden="true"
          /> Kaart</Link>
          <Gpsbutton latitude={hint.latitude} longitude={hint.longitude} />
          <button onClick={() => deleteHint(hint.id)} className="btn btn-default" alt="Verwijderen"><i
            className="fa fa-trash"
          /></button>
        </div>
      </td>
    </tr>
  );
}

HintListItem.propTypes = {
  hint: React.PropTypes.object.isRequired,
  deleteHint: React.PropTypes.func.isRequired,
};

export default HintListItem;
