/*
 *
 * MessageList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import MessageListItem from 'components/MessageListItem';
import SearchMessageList from 'components/SearchMessageList';
import Helmet from 'react-helmet';

import { Form, Text } from 'react-form';

import { createStructuredSelector } from 'reselect';
import { loadMessage, performSearch } from './actions';
import makeSelectMessageList, { searchSelector, errorLoadingMessageSelector, messageSelector, loadingMessageSelector } from './selectors';
import openSocket from 'socket.io-client';

import { REFRESH_ARTICLES } from '../../../server/socket_actions';


function find(item, text) {
  text = text.split(' ');
  return text.every(el => {
    return item.includes(el);
  });
}
export class MessageList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onIncrementMessage = this.onIncrementMessage.bind(this);
  }

  componentDidMount() {
    this.props.loadMessage();
    const { dispatch } = this.props;

    const socket = openSocket();
    socket.on(REFRESH_ARTICLES, function () {
      dispatch(loadLastHint());
    });
  }

  onSearchChange({ search }) {
    const { dispatch } = this.props;
    dispatch(performSearch(search));
  }

  onIncrementMessage(value, messageId) {
    const { dispatch } = this.props;
    dispatch(incrementMessage(value, messageId));
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default" style={{ overflow: 'auto' }}>
          <Helmet
            title="Groepen"
            titleTemplate="%s | Jotihunt.js"
            meta={[
              { name: 'description', content: 'Alle hints en hunts.' },
            ]}
          />
          <div className="panel-body">
            <SearchMessageList onSearchChange={this.onSearchChange} />
          </div>

        </div>
        {this.props.message && this.props.message.map((message, index) => {
          if (!this.props.search || this.props.search == "" ||
            find(JSON.stringify(message).toUpperCase(), this.props.search.toUpperCase())) {
            return <MessageListItem key={index} message={message} />;
          }
          return null;
        })}
      </div>
    );
  }
}

MessageList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadMessage: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  searchSelector: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  errorLoadingMessageSelector: PropTypes.oneOfType([
    PropTypes.obj,
    PropTypes.bool,
  ]),
  loadingMessage: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  MessageList: makeSelectMessageList(),
  message: messageSelector(),
  errorLoadingMessage: errorLoadingMessageSelector(),
  loadingMessage: loadingMessageSelector(),
  search: searchSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadMessage: () => {
      dispatch(loadMessage());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
