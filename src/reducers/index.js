import {combineReducers} from 'redux';
import jobs, * as fromJobs from './jobs';
import github, * as fromGithub from './github';

const app = combineReducers({
    jobs,
    github
});

export default app;

export const getAllGithubAccounts = (state) => {
    return fromGithub.getAllAccounts(state.github);
};

export const getGithubReposCurrentPage = state => {
    return fromGithub.getCurrentPage(state.github);
};

export const getGithubCurrentNumberOfPages = (state) => {
    return fromGithub.getCurrentNumberOfPages(state.github);
};

export const getAllReposOfCurrentGithubAccount = (state, page) => {
    return fromGithub.getAllReposOfCurrentAccount(state.github, page);
};

export const getCurrentSelectedGithubAccountId = (state) => fromGithub.getCurrentSelectedAccountId(state.github);

export const checkIfGithubReposAreLoading = (state) => fromGithub.checkIfReposAreLoading(state.github);

export const getBeingCreatedJob = (state) => fromJobs.getBeingCreatedJob(state.jobs);