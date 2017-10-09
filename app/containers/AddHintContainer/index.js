/*
 *
 * AddHintContainer
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NewHintForm from 'components/NewHintForm';
import { getCoordinates } from './actions';
import makeSelectAddHintContainer, { makeSelectWgs, makeSelectSubarea, makeSelectAddress, makeSelectLoading } from './selectors';
import AddHintMap from '../../components/AddHintMap/index';
import LoadingIndicator from '../../components/LoadingIndicator/index';

export class AddHintContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onCoordinateChange = this.onCoordinateChange.bind(this);
  }

  onCoordinateChange({ rdx, rdy }) {
    const { dispatch } = this.props;
    dispatch(getCoordinates(rdx, rdy));
  }

  render() {
    return (

      <div className="row">
        <Helmet
          title="Hint toevoegen"
          titleTemplate="%s | Jotihunt.js"
          meta={[
            { name: 'description', content: 'Hint toevoegen aan het systeem' },
          ]}
        />
        <div className="col-md-8 col-md-offset-2 col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              Hint toevoegen
            </div>
            <div className="panel-body">
              <NewHintForm onCoordinateChange={this.onCoordinateChange} />
              <hr />
              {this.props.loading ?
                <LoadingIndicator />
                :
                <div>
                  <div className="form-group">
                    <span htmlFor="rdx">Deelgebied</span>
                    <input
                      className="form-control" placeholder="Vul eerst coördinaten in" disabled
                      value={this.props.subarea ? this.props.subarea : ''}
                    />
                  </div>
                  < div className="form-group">
                    <span htmlFor="rdx">Adres</span>
                    <input className="form-control" placeholder="Vul eerst coördinaten in" disabled value={this.props.address.results && this.props.address.results[0] ? this.props.address.results[0].formatted_address : ''} />
                  </div>
                  <AddHintMap wgs={this.props.wgs} address={this.props.address} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddHintContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  subarea: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  wgs: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  AddHintContainer: makeSelectAddHintContainer(),
  subarea: makeSelectSubarea(),
  address: makeSelectAddress(),
  wgs: makeSelectWgs(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHintContainer);
