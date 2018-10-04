/*
 *
 * JotihuntWiki
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import makeSelectJotihuntWiki, { makeSelectLoading, makeSelectResult } from './selectors';
import { loadWiki } from './actions';
import LoadingIndicator from '../../components/LoadingIndicator/index';

export class JotihuntWiki extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadWiki());
  }

  render() {
    return (
      <div className="container">
        <div className={'panel panel-default'}>
          <Helmet
            title="Wiki de Viking"
            titleTemplate="%s | Jotihunt.js"
            meta={[
              { name: 'description', content: 'Een Wiki met alles over Wickie!' },
            ]}
          />
          <div className={'panel-body'}>
            {this.props.loading && <LoadingIndicator />}
            {this.props.result && <ReactMarkdown source={this.props.result}>

            </ReactMarkdown>}
          </div>
        </div>
      </div>
    );
  }
}

JotihuntWiki.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  result: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.any,
  ]),
};

const mapStateToProps = createStructuredSelector({
  JotihuntWiki: makeSelectJotihuntWiki(),
  loading: makeSelectLoading(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JotihuntWiki);
