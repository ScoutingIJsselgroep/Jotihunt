/**
 *
 * GroupListItem
 *
 */

import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';
import Gpsbutton from 'components/Gpsbutton';
import GroupVisits from 'components/GroupVisits';

const Label = styled.span`
  background-color: ${(props) => props.color} !important;
`;

function GroupListItem({ group, increment }) {
  return (
    <tr>
      <td>
        <Label className="label label-default" color={`#${group.Subarea.color}`}> {group.Subarea.name}</Label>
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
        <GroupVisits visits={group.visits} increment={increment} groupId={group.id} />
      </td>
      <td>
        <div className="btn-group" role="group">
          <Link to={`/map/${group.latitude}/${group.longitude}`} className="btn btn-default"><i
            className="fa fa-map-o" aria-hidden="true"
          ></i> Toon op kaart</Link>

          <Gpsbutton latitude={group.latitude} longitude={group.longitude} />
        </div>
      </td>
    </tr>
  );
}

GroupListItem.propTypes = {};

export default GroupListItem;
