import {
    GET_ALL_GITHUB_ACCOUNTS_COMPLETE,
    GET_REPOS_FOR_GITHUB_ACCOUNTS_REQUEST,
    GET_REPOS_FOR_GITHUB_ACCOUNTS_COMPLETE,
    SET_PAGE
} from '../actions/types';

const github = (state = {
    accounts: {
        byId: {},
        ids: []
    },

    repos: {
        byId: {},
        loading: false
    },

    currentAccountId: null,

}, action) => {
    switch (action.type) {
        case GET_ALL_GITHUB_ACCOUNTS_COMPLETE: {

            const accounts = action.accounts;

            const byId = {};
            const ids = [];

            accounts.forEach(account => {
                const id = account._id;
                byId[id] = {
                    ...account,
                    repos: [],
                    numberOfPages: 0,
                    currentPage: 0
                };
                ids.push(id);
            });

            return {
                ...state,
                accounts: {
                    byId,
                    ids
                },
                currentAccountId: ids[0]
            }
        }

        case GET_REPOS_FOR_GITHUB_ACCOUNTS_COMPLETE: {
            const repos = action.repos;
            const numberOfPages = action.numberOfPages;
            const page = action.page;
            const newAccountsById = {
                ...state.accounts.byId
            };

            // clone current account
            const currentAccount = newAccountsById[action.accountId];

            const reposById = {}; // repo by ids for all accounts
            const repoIds = {...currentAccount.repos}; // repo ids for current account

            repoIds[page] = [];

            repos.forEach(repo => {
                const id = repo.id;
                reposById[id] = {
                    ...repo
                };

                repoIds[page].push(id);
            });


            newAccountsById[action.accountId] = {
                ...currentAccount,
                repos: repoIds,
                numberOfPages,
                currentPage: page
            };

            return {
                ...state,
                accounts: {
                    ...state.accounts,
                    byId: newAccountsById
                },
                repos: {
                    byId: {
                        ...state.repos.byId,
                        ...reposById
                    },
                    loading: false
                }
            }
        }


        case GET_REPOS_FOR_GITHUB_ACCOUNTS_REQUEST:
        case SET_PAGE: {

            let loading = false;

            if (action.type === GET_REPOS_FOR_GITHUB_ACCOUNTS_REQUEST) {
                loading = true;
            }

            const accountId = action.accountId;
            const page = action.page;

            const newAccountsById = {
                ...state.accounts.byId
            };

            // clone current account
            const currentAccount = newAccountsById[accountId];
            newAccountsById[accountId] = {
                ...currentAccount,
                currentPage: page
            };

            return {
                ...state,
                accounts: {
                    ...state.accounts,
                    byId: newAccountsById
                },

                repos: {
                    ...state.repos,
                    loading
                }
            }

        }

        default:
            return state;
    }
};

export default github;

export const getAllAccounts = (state) => {
    return state.accounts.ids.map(id => state.accounts.byId[id]);
};

export const getCurrentPage = (state) => {
    if (!state.currentAccountId) {
        return 0;
    }

    const account = state.accounts.byId[state.currentAccountId];

    if (account) {
        return account.currentPage;
    } else {
        return 0;
    }
};

export const getCurrentNumberOfPages = (state) => {
    if (!state.currentAccountId) {
        return 0;
    }

    const account = state.accounts.byId[state.currentAccountId];
    return account.numberOfPages;
};

export const getAllReposOfCurrentAccount = (state, page) => {
    if (!state.currentAccountId) {
        return [];
    }

    const account = state.accounts.byId[state.currentAccountId];

    if (!account.repos[page]) {
        return [];
    }

    return account.repos[page].map(id => state.repos.byId[id]);
};

export const getCurrentSelectedAccountId = (state) => {
    return state.currentAccountId;
};

export const checkIfReposAreLoading = (state) => {
    return state.repos.loading;
};