/**
 *
 * GroupListItem
 *
 */

import React from 'react';
import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

const Label = styled.span`
  background-color: ${props => props.color} !important;
`;

function GroupListItem({group}) {
  console.log(group);
  return (
    <tr>
      <td>
        <Label className="label label-default" color={'#' + group.Subarea.color}> {group.Subarea.name}</Label>
      </td>
      <td>
        {group.name}
      </td>
      <td>
        {group.town}
      </td>
      <td>
        {group.location}
      </td>
      <td>
        <div className="btn-group" role="group">
          <a href={'/map/' + group.latitude + '/' + group.longitude} className="btn btn-default"><i
            className="fa fa-map-o" aria-hidden="true"></i> Toon op kaart</a>
          <a href={'geo:' + group.latitude + ',' + group.longitude + ';u=35'} className="btn btn-default"><i
            className="fa fa-location-arrow" aria-hidden="true"></i> GPS</a>
        </div>
      </td>
    </tr>
  );
}

GroupListItem.propTypes = {};

export default GroupListItem;
