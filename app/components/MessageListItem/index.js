/**
 *
 * MessageListItem
 *
 */

import React from 'react';
import styled from 'styled-components';

import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';


const Label = styled.span`
  background-color: ${(props) => props.color} !important;
`;

function MessageListItem({ message }) {
  moment.locale('nl');
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{message.title} </h3>
      </div>
      <div className="panel-body">
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
      <div className="panel-footer">{moment(message.start).add(2, 'hours').calendar()} {message.points && `• ${message.points} punten`} {message.end && `• Inleveren ${moment(message.end).add(2, 'hours').calendar()}`}</div>
    </div>
  );
}

MessageListItem.propTypes = {};

export default MessageListItem;
