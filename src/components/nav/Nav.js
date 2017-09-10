import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import './Nav.css';

class NavComponent extends Component {
    render() {
        const {location} = this.props;

        return (
            <div className="nav-component">
                <div data-detail-page-header className="bx--detail-page-header bx--detail-page-header--with-tabs">
                    <div className="bx--detail-page-header-content">
                        <div className="bx--detail-page-header-title-container">
                            <h1 className="bx--detail-page-header-title">cd.js</h1>
                        </div>
                        <nav data-tabs className="bx--tabs" role="navigation">
                            <div className="bx--tabs-trigger">
                                <a href="#" className="bx--tabs-trigger-text"/>
                                <svg width="10" height="5" viewBox="0 0 10 5" fillRule="evenodd">
                                    <path d="M10 0L5 5 0 0z"/>
                                </svg>
                            </div>
                            <ul className="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
                                {this._renderLink(1, "/", "Jobs")}
                                {this._renderLink(1, "/github", "Github")}
                                {this._renderLink(1, "/settings", "Settings")}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }

    _navigateTo(path) {
        const {history} = this.props;
        history.replace(path);
    }

    _renderLink(index, path, name) {
        const {location} = this.props;

        return (
            <li className={`bx--tabs__nav-item ${location.pathname === path ? "bx--tabs__nav-item--selected" : ""}`}
                data-target={`.tab-${index}`}
                role="presentation"
                onClick={() => this._navigateTo(path)}
            >
                <Link to={path} id={`tab-link-${index}-with-tabs`} className="bx--tabs__nav-link"
                      replace
                      role="tab" aria-selected={`${location.pathname === path}`}>{name}</Link>
            </li>
        )
    }
}

export default withRouter(NavComponent);