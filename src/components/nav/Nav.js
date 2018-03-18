import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import {getUserInfo} from '../../reducers';
import {logout} from '../../actions/auth';
import './Nav.css';

class NavComponent extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  _navigateTo(path) {
    const {history} = this.props;
    history.replace(path);
  }

  _logout = async () => {
    const {logout, history} = this.props;
    await logout();
    history.replace('/login');
  }

  _renderLink(path, name, icon) {
    return (
      <NavLink to={path} className="nav-item" replace activeClassName="active">
        {icon}
        <span className="nav-item-text">
          {name}
        </span>
      </NavLink>
    );
  }

  _renderUserInfo() {
    const {userInfo} = this.props;

    return (
      <ButtonToolbar>
        <DropdownButton
          bsStyle="default"
          title={userInfo.email}
        >
          <MenuItem eventKey="1">Change password</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4" onClick={this._logout}>Log out</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <div className="nav-component">
        <div className="nav-header">
          <div className="app-name">cd.js</div>
          <div className="user-info">
            {this._renderUserInfo()}
          </div>
        </div>
        <div className="nav-content">
          {this._renderLink('/jobs', 'Jobs', <i className="fa fa-server nav-item-icon" aria-hidden="true" />)}
          {this._renderLink('/credentials', 'Credentials', <i className="fa fa-lock nav-item-icon" aria-hidden="true" />)}
          {this._renderLink('/agents', 'Agents', <i className="fa fa-sitemap nav-item-icon" aria-hidden="true" />)}
          {this._renderLink('/users', 'Users', <i className="fa fa-users nav-item-icon" aria-hidden="true" />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: getUserInfo(state),
});

export default withRouter(connect(mapStateToProps, {
  logout,
})(NavComponent));