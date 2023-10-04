/**
*
* GroupVisits
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';


class GroupVisits extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="input-group">
        <span className="input-group-btn">
          <button onClick={() => this.props.increment(-1, this.props.groupId)} className="btn btn-default" type="button"><span className="fa fa-minus"/></button>
        </span>
        <input type="text" className="form-control" disabled value={this.props.visits} />
        <span className="input-group-btn">
          <button onClick={() => this.props.increment(1, this.props.groupId)} className="btn btn-default" type="button"><span className="fa fa-plus"/></button>
        </span>
     </div>
    );
  }
}

GroupVisits.propTypes = {
  increment: PropTypes.func,
  groupId: PropTypes.number,
  visits: PropTypes.number,
};

export default GroupVisits;
