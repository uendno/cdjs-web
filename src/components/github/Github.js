import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './Github.css';
import {requestAllGithubAccounts, requestAllReposForCurrentGithubAccountId} from '../../actions/github';
import ReposComponent from './repos/Repos';
import AccountsComponent from './accounts/Accounts';

class GithubComponent extends Component {

    async componentDidMount() {
        const {requestAllGithubAccounts, requestAllReposForCurrentGithubAccountId} = this.props;
        const accounts = await requestAllGithubAccounts();
        if (accounts.length > 0) {
            requestAllReposForCurrentGithubAccountId();
        }

    }

    render() {
        return (
            <div className="github-component">
                <div className="bx--grid">
                    <div className="bx--row">
                        <div className="bx--col-md-4">
                            <AccountsComponent/>
                        </div>
                        <div className="bx--col-md-8">
                            <ReposComponent/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GithubComponent.propTypes = {
    requestAllGithubAccounts: PropTypes.func.isRequired,
    requestAllReposForCurrentGithubAccountId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    requestAllGithubAccounts,
    requestAllReposForCurrentGithubAccountId
})(GithubComponent);