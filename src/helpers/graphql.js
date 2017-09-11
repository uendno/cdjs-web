import ApolloClient, {createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';
import config from '../config';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: config.api.graphql,
    }),
});

export const getAllJobs = async () => {
    const res = await client.query({
        query: gql`
            {
                allJobs {
                    _id
                    name 
              }
            }
        `
    });

    return res.data.allJobs;
};

export const getJobByName = async (name) => {
    const res = await client.query({
        query: gql`
            {
                jobByName(name: "${name}"){
                    _id
                    name 
              }
            }
        `
    });

    return res.data.jobByName;
};

export const getAllGithubAccounts = async () => {
    const res = await client.query({
        query: gql`
        {
            allGithubAccounts {
                _id
                username
                avatarUrl
            }
        }
        `
    });

    return res.data.allGithubAccounts;
};

export const getAllReposForGithubAccountId = async (accountId, page) => {
    const res = await client.query({
        query: gql`
        {
            reposForAccountId(accountId: "${accountId}", page: ${page ? (page + 1) : 1}){
                numberOfPages
                repos {
                    name
                    fullName
                    url
                    private
                    id
                    ownerAvatarUrl
                }
            }
        }
        `
    });

    return res.data.reposForAccountId;
};

export const createJob = async (name, gitAccountId, repoFullName, branch) => {
    const res = await client.mutate({
        mutation: gql`
            mutation {
                createJob(name: "${name}", gitAccountId: "${gitAccountId}", repoFullName: "${repoFullName}", branch: "${branch}") {
                    _id,
                    name
                }
            }
        
        `
    });

    return res.data.createJob;
};

export const getBranchesForRepo = async (accountId, repoFullName) => {
    const res = await client.query({
        query: gql`
        {
            branchesForRepo(accountId: "${accountId}", repoFullName: "${repoFullName}")
        }
        `
    });

    return res.data.branchesForRepo;
};