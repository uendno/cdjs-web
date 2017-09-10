import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './Repos.css';

import {
    getGithubReposCurrentPage,
    getCurrentSelectedGithubAccountId,
    getGithubCurrentNumberOfPages,
    getAllReposOfCurrentGithubAccount,
    checkIfGithubReposAreLoading
} from "../../../reducers";

import {changePage} from '../../../actions/github';
import {startCreatingJob} from '../../../actions/jobs';

class ReposComponent extends Component {
    render() {
        const {repos, numberOfPages, currentPage, loading} = this.props;

        return (
            <div className="repos-component">

                {this._renderPagination(numberOfPages, currentPage, loading)}
                <div className="repos bx--row">
                    {this._renderRepos(repos)}
                </div>
            </div>
        )
    }

    _renderPagination(numberOfPages, currentPage, loading) {

        console.log('Loading: ' + loading);

        return (
            <div className="pagination bx--pagination" data-pagination>
                <div className="bx--pagination__left">
                    <span className="bx--pagination__text">Repositories</span>
                    {loading === true ? (
                        <div data-loading className="bx--loading bx--loading--small">
                            <svg className=" bx--loading__svg " viewBox="-75 -75 150 150 ">
                                <title>Loading</title>
                                <circle cx="0 " cy="0 " r="37.5 "/>
                            </svg>
                        </div>) : null}
                </div>
                <div className="bx--pagination__right">
                        <span className="bx--pagination__text"><span data-displayed-page-number>{currentPage + 1}</span> of <span
                            data-total-pages>{numberOfPages}</span> pages</span>
                    <button className="bx--pagination__button bx--pagination__button--backward"
                            data-page-backward
                            aria-label="Backward button"
                            disabled={currentPage === 0}
                            onClick={this._goBackward.bind(this)}
                    >
                        <svg className="bx--pagination__button-icon" width="8" height="12"
                             viewBox="0 0 8 12"
                             fillRule="evenodd">
                            <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"/>
                        </svg>
                    </button>
                    <input id="page-number-input"
                           type="text"
                           className="bx--text-input"
                           placeholder="1"
                           value={currentPage + 1}
                           onChange={(e) => {
                               this._onPageValueChange(e.target.value - 1);
                           }}
                           data-page-number-input/>
                    <button className="bx--pagination__button bx--pagination__button--forward"
                            data-page-forward
                            aria-label="Forward button"
                            disabled={currentPage === (numberOfPages - 1)}
                            onClick={this._goForward.bind(this)}
                    >
                        <svg className="bx--pagination__button-icon" width="8" height="12"
                             viewBox="0 0 8 12"
                             fillRule="evenodd">
                            <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    _renderRepos(repos) {
        return repos.map((repo, index) => (
            <div key={index} className="bx--col-xl-4 bx--col-xxl-3">
                <article className="repo-card bx--card" tabIndex="0" aria-labelledby="card-title-1">
                    <div className="bx--card__card-overview">

                        <div className="bx--card-overview__about">
                            <figure className="owner-avatar-wrapper bx--about__icon">
                                <img src={repo.ownerAvatarUrl} alt=""
                                     className="owner-avatar bx--about__icon--img"/>
                            </figure>
                            <header className="bx--about__title">
                                <p id="card-title-1" className="bx--about__title--name bx--type-gamma">
                                    {repo.name}
                                </p>
                                <a href={repo.url} target="_blank"
                                   className="repo-full-name bx--link bx--about__title--link">
                                    {repo.fullName}
                                </a>
                            </header>
                        </div>
                    </div>
                    <div className="bx--card-footer">
                        {repo.private ? (
                                <div className="visibility bx--card-footer__app-status">

                                    <svg width='16' height='24' viewBox='0 0 16 24' fillRule='evenodd'>
                                        <path
                                            d='M13 9.8V5c0-2.8-2.2-5-5-5S3 2.2 3 5v4.8c-1.8 1.5-3 3.7-3 6.2 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.5-1.2-4.8-3-6.2zM4 5c0-2.2 1.8-4 4-4s4 1.8 4 4v4.1C10.8 8.4 9.5 8 8 8s-2.8.4-4 1.1V5zm4 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z'/>
                                        <path
                                            d='M9.6 14.4c0-.9-.7-1.6-1.6-1.6-.9 0-1.6.7-1.6 1.6 0 .5.2.9.6 1.2V18c0 .6.4 1 1 1s1-.5 1-1v-2.4c.3-.2.6-.7.6-1.2z'/>
                                    </svg>
                                    <span
                                        className="visibility-label bx--tag bx--tag--experimental">private</span>
                                </div>
                            )
                            : (
                                <div className="visibility bx--card-footer__app-status">
                                    <svg width='24' height='22' viewBox='0 0 24 22' fillRule='evenodd'>
                                        <path
                                            d='M16.3 5.9c-2-1.1-4.3-1.5-6.5-.9-.3.1-.5.5-.4.8.1.3.4.5.8.4 1-.3 2.1-.3 3.1-.1-1.6.8-3.4 2.7-4.9 5.2-.5.9-1 1.9-1.3 2.9-.4-.4-.7-.8-1-1.2-.8-1.3-.9-2.4-.5-3.2.5-.8 1.6-1.3 3.2-1.2.3 0 .6-.3.7-.6 0-.3-.3-.6-.6-.7-2.1-.2-3.6.5-4.4 1.8-.7 1.2-.5 2.8.5 4.4.4.7 1 1.3 1.6 2-.1.5-.2 1-.3 1.4V18c-.7-.9-1.2-1.9-1.5-3-.1-.3-.4-.5-.8-.5-.3.1-.5.4-.5.8.6 2.3 2 4.3 4.1 5.5C9 21.6 10.5 22 12 22c3 0 5.9-1.5 7.5-4.3 2.4-4.1.9-9.4-3.2-11.8zm-6.9 6c2.2-3.8 5-5.6 6.2-4.9 3.5 2 4.7 6.6 2.7 10.1-1 1.7-4.8 1.5-8.3-.5-.8-.4-1.5-1-2.1-1.5.5-1 .9-2.1 1.5-3.2zm-1.1 7.9c-.6-.3-.9-1.3-.7-2.7 0-.2.1-.4.1-.6l1.8 1.2c2.1 1.2 4.2 1.8 6 1.8h.6c-2.2 1.5-5.3 1.7-7.8.3zM3.2 7.6L.9 6.3c-.3-.2-.6-.1-.8.2-.2.3-.1.7.2.8l2.3 1.3c.1.1.2.1.3.1.2 0 .4-.1.5-.3.2-.3.1-.7-.2-.8zM12 3.5c.3 0 .6-.3.6-.6V.6c0-.3-.3-.6-.6-.6s-.6.3-.6.6v2.2c0 .4.3.7.6.7zm5 1.3c.1.1.2.1.3.1.2 0 .4-.1.5-.3l1.2-2c.2-.3.1-.7-.2-.8-.3-.2-.7-.1-.9.2l-1.2 2c-.1.2 0 .6.3.8zm-10 0c-.1 0-.2.1-.3.1-.2 0-.4-.1-.5-.3L5 2.6c-.1-.3 0-.7.3-.9.3-.2.7-.1.9.2l1.2 2c0 .3-.1.7-.4.9zm16.9 1.7c-.2-.3-.6-.4-.9-.2l-2.3 1.3c-.3.2-.4.6-.2.9.1.2.3.3.5.3.1 0 .2 0 .3-.1l2.3-1.3c.4-.2.5-.6.3-.9z'/>
                                    </svg>
                                    <span className="visibility-label bx--tag bx--tag--ibm">public</span>

                                </div>
                            )}

                        <div className="bx--card-footer__app-actions">
                            <button className="bx--btn bx--btn--secondary bx--btn--sm" type="button"
                                    onClick={() => this._handleCreateJob(repo)}>
                                Create job
                            </button>

                        </div>
                    </div>
                </article>
            </div>
        ))
    }

    _onPageValueChange(page) {
        const {changePage, numberOfPages} = this.props;

        if (page >= 0 && page < numberOfPages) {
            changePage(page);
        }
    }

    _goForward() {
        const {currentPage, changePage} = this.props;
        changePage(currentPage + 1);
    }

    _goBackward() {
        const {currentPage, changePage} = this.props;
        changePage(currentPage - 1);
    }

    _handleCreateJob(repo) {
        const {startCreatingJob, currentAccountId} = this.props;
        startCreatingJob(currentAccountId, repo);
    }
}

ReposComponent.propTypes = {
    currentAccountId: PropTypes.string,
    repos: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    startCreatingJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

    const currentPage = getGithubReposCurrentPage(state);

    return {
        repos: getAllReposOfCurrentGithubAccount(state, currentPage),
        currentAccountId: getCurrentSelectedGithubAccountId(state),
        currentPage,
        numberOfPages: getGithubCurrentNumberOfPages(state),
        loading: checkIfGithubReposAreLoading(state)
    }
};

export default connect(mapStateToProps, {
    changePage,
    startCreatingJob
})(ReposComponent);