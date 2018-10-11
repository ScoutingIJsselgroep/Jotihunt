/**
 *
 * StatusBar
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import LoadingIndicator from '../LoadingIndicator/index';

// import styled from 'styled-components';

class StatusBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    } else if (this.props.status) {
      const sortedStatus = this.props.status.sort((a, b) => parseFloat(a.SubareaId) - parseFloat(b.SubareaId));

      return (
        <div className={'text-center'}>
          <div className="btn-group" role="group" aria-label="...">
            {sortedStatus.map((status, i) =>
              <button key={i} onClick={() => this.props.changeMapCenter([status.latCenter, status.lonCenter])} className={`btn btn-${status.statuscolor}`}>
                {status.name}
                <br />
                <small><small>{moment(status.createdAt).calendar()}</small></small>
              </button>
            )}
            <button className={'btn btn-default'}>
              {this.props.huntCount}
              <br />
              Aantal hunts
            </button>
<<<<<<< HEAD
            <button className={'btn btn-default disabled'}>
              <span className="fa fa-refresh"></span>
              <br />
              Auto
            </button>
=======
>>>>>>> 2c1e422e87cc2d806b43ce10bd04e0705ee2228d
            {this.props.children}
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
  huntCount: PropTypes.number,
};

export default StatusBar;
