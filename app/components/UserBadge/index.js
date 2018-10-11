import React from 'react';

export default class UserBadge extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    picture: React.PropTypes.string.isRequired,
  };

  render() {
    return <img alt="avatar" src={this.props.picture} />;
  }
}
