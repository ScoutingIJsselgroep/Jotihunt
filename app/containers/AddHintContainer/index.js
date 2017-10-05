/*
 *
 * AddHintContainer
 *
 */

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import NewHintForm from 'components/NewHintForm';
import {getCoordinates} from './actions';
import makeSelectAddHintContainer from './selectors';
import messages from './messages';

export class AddHintContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onCoordinateChange.bind(this);
  }

  onCoordinateChange({rdx, rdy}) {
    // dispatch(getCoordinates(rdx, rdy));
  }

  render() {
    return (

      <div className="row">
        <Helmet
          title="Hint toevoegen"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            {name: 'description', content: 'Hint toevoegen aan het systeem'},
          ]}
        />
        <div className="col-md-8 col-md-offset-2 col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              Hint toevoegen
            </div>
            <div className="panel-body">
              <NewHintForm onCoordinateChange={this.onCoordinateChange}/>
            </div>

            <hr/>

          </div>
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
