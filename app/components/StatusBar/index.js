/**
 *
 * StatusBar
 *
 */

import React from 'react';
import * as PropTypes from 'react/lib/ReactPropTypes';
import moment from 'moment';
import LoadingIndicator from '../LoadingIndicator/index';
import config from '../../../config';

// import styled from 'styled-components';

class StatusBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.loading) {
      return <LoadingIndicator/>;
    } else if (this.props.status) {
      const sortedStatus = this.props.status.sort((a, b) => parseFloat(a.SubareaId) - parseFloat(b.SubareaId));
      const reverseStatus = Object.assign([], config.dbMappings.status);
      console.log(reverseStatus);
      return (
        <div className={'text-center'}>
          <div className="btn-group" role="group" aria-label="...">
            {sortedStatus.map((status, i) =>
              <button key={i} className={`btn btn-lg btn-${status.statuscolor}`}>
                {status.name}
                <br />
                <small>{moment(status.createdAt).calendar()}</small>
              </button>
            )}
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

StatusBar.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  status: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
};

export default StatusBar;
