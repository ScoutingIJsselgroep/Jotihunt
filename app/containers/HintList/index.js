/*
 *
 * HintList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from 'components/LoadingIndicator';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import HintListItem from 'components/HintListItem';
import makeSelectHintList, { loadingHintsSelector, hintsSelector } from './selectors';

import { loadHints, deleteHint } from './actions';

export class HintList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadHints());
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Helmet
            title="Hints"
            titleTemplate="%s | Jotihunt.js"
            meta={[
              { name: 'description', content: 'Een lijst van alle hints.' },
            ]}
          />
          <div className="panel panel-default" style={{ overflow: 'auto' }}>
            <div className="panel-heading">
              Lijst van hints
            </div>
            <div className="panel-body">
              Hieronder vind je een lijst van alle hints, hunts en infopunten die in het systeem staan.
              {this.props.loadingHints && <LoadingIndicator />}
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Deelgebied</th>
                  <th>Adres</th>
                  <th>Lat/Lng</th>
                  <th>Tijdstip</th>
                  <th>Acties</th>
                </tr>
              </thead>
              <tbody>
                {!this.props.loadingHints && this.props.hints && this.props.hints.map((hint, i) => (
                  <HintListItem key={i} hint={hint} deleteHint={this.props.onDeleteHint} />
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

HintList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadingHints: PropTypes.bool.isRequired,
  hints: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]).isRequired,
  onDeleteHint: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  HintList: makeSelectHintList(),
  loadingHints: loadingHintsSelector,
  hints: hintsSelector,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onDeleteHint: (id) => {
      dispatch(deleteHint(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HintList);
