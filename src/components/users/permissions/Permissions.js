import React, {Component} from 'react';
import {} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {requestUserPermissions} from '../../../actions/users';
import {getPermissionsForAnUser} from '../../../reducers';
import './Permissions.css';

class Permissions extends Component {
  static propTypes = {
    requestUserPermissions: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {requestUserPermissions, match} = this.props;
    const userId = match.params.userId;
    requestUserPermissions(userId);
  }

  render() {
    return (
      <div className="permissions-component" />
    );
  }
}

const mapStateToProp = (state, ownProp) => {
  const {match} = ownProp;
  const userId = match.params.userId;

  return {
    permissions: getPermissionsForAnUser(state, userId),
  };
};

export default withRouter(connect(mapStateToProp, {
  requestUserPermissions,
})(Permissions));