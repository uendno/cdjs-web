import {
    GET_ALL_GITHUB_ACCOUNTS_REQUEST,
    GET_ALL_GITHUB_ACCOUNTS_COMPLETE,
    GET_ALL_GITHUB_ACCOUNTS_ERROR,
    GET_REPOS_FOR_GITHUB_ACCOUNTS_REQUEST,
    GET_REPOS_FOR_GITHUB_ACCOUNTS_COMPLETE,
    GET_REPOS_FOR_GITHUB_ACCOUNTS_ERROR,
    SET_PAGE
} from './types';

import {
    getAllGithubAccounts as getAllGithubAccountsQL,
    getAllReposForGithubAccountId as getAllReposForGithubAccountIdQL
} from '../helpers/graphql';

import {showError} from '../helpers/alert';

import {getCurrentSelectedGithubAccountId, getAllReposOfCurrentGithubAccount} from '../reducers';

export const requestAllGithubAccounts = async () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_GITHUB_ACCOUNTS_REQUEST
        });

        const accounts = await getAllGithubAccountsQL();

        dispatch({
            type: GET_ALL_GITHUB_ACCOUNTS_COMPLETE,
            accounts
        });

        return accounts;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);
        dispatch({
            type: GET_ALL_GITHUB_ACCOUNTS_ERROR,
            error
        });

        return [];
    }

};

export const requestAllReposForCurrentGithubAccountId = async (page = 0) => async (dispatch, getState) => {
    try {

        const state = getState();
        const accountId = getCurrentSelectedGithubAccountId(state);

        dispatch({
            type: GET_REPOS_FOR_GITHUB_ACCOUNTS_REQUEST,
            accountId,
            page
        });

        const res = await getAllReposForGithubAccountIdQL(accountId, page);

        dispatch({
            type: GET_REPOS_FOR_GITHUB_ACCOUNTS_COMPLETE,
            numberOfPages: res.numberOfPages,
            repos: res.repos,
            accountId,
            page
        })
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);
        dispatch({
            type: GET_REPOS_FOR_GITHUB_ACCOUNTS_ERROR,
            error
        });
    }

};

export const changePage = async (page) => async (dispatch, getState) => {
    const state = getState();

    const accountId = getCurrentSelectedGithubAccountId(state);

    dispatch({
        type: SET_PAGE,
        page,
        accountId
    });

    const repos = await getAllReposOfCurrentGithubAccount(state, page);

    if (repos.length === 0) {
        dispatch(requestAllReposForCurrentGithubAccountId(page));
    } else {

    }
};