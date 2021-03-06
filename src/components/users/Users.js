import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Panel, Table, Button} from 'react-bootstrap';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {requestAllUsers, openEditUserModal, openAddUserModal, requestDeleteUser} from '../../actions/users';
import {getAllUsers, getUserInfo} from '../../reducers';
import './Users.css';

class Users extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    requestAllUsers: PropTypes.func.isRequired,
    openEditUserModal: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    requestDeleteUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {requestAllUsers} = this.props;

    requestAllUsers();
  }

  _renderUser(user) {
    const {userInfo, openEditUserModal, requestDeleteUser} = this.props;
    const role = userInfo.role;

    return (
      <tr key={user._id}>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          {
            role === 'admin' &&
            <Button
              className="action-button"
              onClick={() => {
                openEditUserModal(user._id, user.email, user.role);
              }}
            ><i className="fa fa-pencil" aria-hidden="true"/>
            </Button>
          }
          {
            role === 'admin' &&
            <Button
              className="action-button red"
              onClick={() => {
              if (window.confirm('Are you sure want to delete this user?')) {
                requestDeleteUser(user._id);
              }
            }}
            ><i className="fa fa-trash-o" aria-hidden="true"/>
            </Button>
          }
        </td>
      </tr>
    );
  }

  render() {
    const {users, openAddUserModal} = this.props;

    return (
      <div className="users-component">
        <div className="page-header">
          <div className="header-info">
            <span className="page-title">Users</span>
          </div>
          <div className="action-buttons">
            <Button
              className="button-with-icon action-button new-credential-button"
              onClick={() => {
                openAddUserModal();
              }}
            ><i className="fa fa-plus-circle" aria-hidden="true"/>
              New User
            </Button>
          </div>
        </div>
        <Row className="content">
          <Col md={12}>
            <Panel>
              <Table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {users.map(this._renderUser.bind(this))}
                </tbody>
                <tbody/>
              </Table>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: getAllUsers(state),
  userInfo: getUserInfo(state),
});

export default withRouter(connect(mapStateToProps, {
  requestAllUsers,
  openEditUserModal,
  openAddUserModal,
  requestDeleteUser,
})(Users));