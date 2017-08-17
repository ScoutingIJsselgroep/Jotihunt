/*
 *
 * AddHintContainer
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import NewHintForm from 'components/NewHintForm';
import { getCoordinates } from './actions';
import makeSelectAddHintContainer from './selectors';
import messages from './messages';

export class AddHintContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onCoordinateChange.bind(this);
  }
  onCoordinateChange({ rdx, rdy }) {
    // dispatch(getCoordinates(rdx, rdy));
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-12 panel panel-default">
          <NewHintForm onCoordinateChange={this.onCoordinateChange} />
        </div>
        <div className="col-md-8 col-sm-12 panel panel-default">
        </div>
      </div>
    );
  }
}

AddHintContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AddHintContainer: makeSelectAddHintContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHintContainer);
