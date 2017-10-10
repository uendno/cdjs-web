import {GraphQLClient} from 'graphql-request';
import _ from 'lodash';
import config from '../config';

const client = new GraphQLClient(config.api.uri + "/graphql");

export const getAllJobs = async () => {
    const res = await client.request(
        `    
            {
                allJobs {
                    _id
                    name
                    repoType
                    lastBuild {
                        status
                        startAt
                        doneAt
                    }
                }
            }
        `
    );

    return res.allJobs;
};

export const checkJobName = async (name) => {
    const res = await client.request(
        `
            {
                checkJobName(name: "${name}"){
                    valid
                    generatedSecret,
                    webhookUrl
              }
            }
        `
    );

    return res.checkJobName;
};

export const createJob = async (name, repoType, repoUrl, branch, credentialId, description, secret, cdFilePath) => {

    let params = `name: "${name}", repoType: "${repoType}", repoUrl: "${repoUrl}", branch: "${branch}", secret: "${secret}"`;

    const optionalParams = _.pickBy({
        credentialId,
        description,
        cdFilePath
    }, _.identity);


    Object.keys(optionalParams).forEach(key => {
        const value = optionalParams[key];
        params = params + ` ${key}: "${value}"`;
    });

    const res = await client.request(
        `
            mutation {
                createJob(${params}) {
                    _id
                    name
                    createdAt
                    repoUrl
                    repoType
                    branch
                    credential {
                        _id
                        name
                        type
                        data
                    }
                }
            }
        `
    );

    return res.createJob;
};

export const getAllCredentials = async () => {
    const res = await client.request(
        `
            {
                allCredentials {
                    _id
                    type
                    name
                    data
                    createdAt
                }
            }
        `
    );

    return res.allCredentials;
};

export const checkCredentialName = async (name, currentCredentialId) => {

    let query;

    if (currentCredentialId) {
        query = `
            {   
                checkCredentialName(name: "${name}", currentCredentialId: "${currentCredentialId}"){
                    valid
                }
            }
        `
    } else {
        query = `
            {   
                checkCredentialName(name: "${name}"){
                    valid
                }
            }
        `
    }

    const res = await client.request(query);
    return res.checkCredentialName;
};

export const createCredential = async (name, type, data) => {

    const {username, password, sshLocation} = data;

    let params;

    if (type === 'username/password') {
        params = `username: "${username}", password: "${password}"`;
    }

    const res = await client.request(
        `
            mutation {
                createCredential(name: "${name}", type: "${type}", ${params}) {
                    _id
                    type
                    name
                    data
                    createdAt
                }
            }
        `
    );

    return res.createCredential;
};

export const updateCredential = async (id, {type, name, data}) => {

    const {username, password, sshLocation} = data;

    let params;

    if (type === 'username/password') {
        params = `name: "${name}", type: "${type}", username: "${username}", password: "${password}"`;
    }

    const res = await client.request(
        `
            mutation {
                updateCredential(id: "${id}" ${params}) {
                    _id
                    type
                    name
                    data
                    createdAt
                }
            }
        `
    );

    return res.updateCredential;
};

export const deleteCredential = async (id) => {
    const res = await client.request(
        `
            mutation {
                deleteCredential(id: "${id}") 
            }
        `
    );

    return res.deleteCredential;
};

export const play = async (id) => {
    const res = await client.request(
        `
            mutation {
                play(id: "${id}") 
            }
        `
    );

    return res.play;
};

export const jobDetails = async (id) => {
    const res = await client.request(
        `
            query {
                jobDetails(id: "${id}") {
                    _id
                    name
                    repoType
                    cdFilePath
                    description
                    createdAt
                    repoUrl
                    branch
                    lastBuild {
                        _id
                        number
                        status
                        startAt
                        doneAt
                        pusher
                        commits
                        stages {
                            _id
                            status
                            startAt
                            doneAt
                        }
                    }
                    builds {
                        _id
                        number
                        status
                        startAt
                        doneAt
                        pusher
                        commits
                        stages {
                            _id
                            status
                            startAt
                            doneAt
                        }
                    }
                }
            }
        `
    );

    return res.jobDetails;
};