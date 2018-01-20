import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router'
import './Nav.css';

class NavComponent extends Component {
    render() {
        return (
            <div className="nav-component">
                <div className="nav-header">
                    <span className="app-name">cd.js</span>
                </div>
                <div
                    className="nav-content"
                >
                    {this._renderLink("/jobs", "Jobs", <i className="fa fa-server nav-item-icon" aria-hidden="true"/>)}
                    {this._renderLink("/credentials", "Credentials", <i className="fa fa-lock nav-item-icon" aria-hidden="true"/>)}
                    {this._renderLink("/agents", "Agents", <i className="fa fa-sitemap nav-item-icon" aria-hidden="true"/>)}
                    {this._renderLink("/settings", "Settings")}
                </div>
            </div>
        )
    }

    _navigateTo(path) {
        const {history} = this.props;
        history.replace(path);
    }

    _renderLink(path, name, icon) {
        return (
            <NavLink to={path}
                     className="nav-item"
                     replace
                     activeClassName="active">
                {icon}
                <span className="nav-item-text"> {name} </span>
            </NavLink>
        )
    }
}

export default withRouter(NavComponent);