/*
 *
 * JotihuntWiki
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { createStructuredSelector } from 'reselect';
import makeSelectJotihuntWiki, {makeSelectLoading, makeSelectResult} from './selectors';
import { loadWiki } from './actions';
import LoadingIndicator from "../../components/LoadingIndicator/index";

export class JotihuntWiki extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadWiki());
  }

  render() {
    console.log(this.props.result);

    return (
      <div className={'panel panel-default'}>
        <div className={'panel-body'}>
          {this.props.loading && <LoadingIndicator />}
          {this.props.result && <ReactMarkdown source={this.props.result}>

          </ReactMarkdown>}
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
    PropTypes.object,
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
