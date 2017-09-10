import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './Account.css';
import {requestAllGithubAccounts} from '../../../actions/github';
import {getAllGithubAccounts as accountsSelector} from '../../../reducers';
import {getCurrentSelectedGithubAccountId} from "../../../reducers/index";

class GithubComponent extends Component {


    render() {
        const {accounts, currentAccountId} = this.props;

        return (
            <div className="accounts-component">
                <div className="top-line"/>

                <nav role="navigation" aria-label="Interior Left Navigation"
                     data-interior-left-nav
                     className="accounts-nav bx--interior-left-nav bx--interior-left-nav--collapseable">
                    <div className="account-header">
                        <span className="add-account-label">Accounts</span>
                        <button className="add-account-button bx--btn bx--btn--primary bx--btn--sm"
                                type="button"
                                onClick={() => {
                                    window.location.href = '/api/git/github-oauth-gateway'
                                }}
                        >Add
                            <svg className="bx--btn__icon" width="16" height="16" viewBox="0 0 16 16"
                                 fillRule="evenodd">
                                <path
                                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"/>
                            </svg>
                        </button>
                    </div>

                    <ul role="menubar" className="left-nav-list" data-interior-left-nav-list
                        aria-hidden="false">
                        {accounts.map((account, index) => (
                            <li key={index} role="menuitem" tabIndex={index}
                                className={`left-nav-list__item ${currentAccountId === account._id && 'left-nav-list__item--active' }`}
                                data-interior-left-nav-item>
                                <a className="left-nav-list__item-link">
                                    {account.username}
                                    <img className="account-avatar" src={account.avatarUrl}/>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        )
    }

}

GithubComponent.propTypes = {
    getAllGithubAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
    currentAccountId: PropTypes.string
};

const mapStateToProps = (state) => ({
    accounts: accountsSelector(state),
    currentAccountId: getCurrentSelectedGithubAccountId(state)
});

export default connect(mapStateToProps, {
    getAllGithubAccounts: requestAllGithubAccounts
})(GithubComponent);