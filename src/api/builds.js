import {requestAuth} from '../helpers/api';

export const getBuildDetails = (id) => {
    return requestAuth({
        url: '/builds/' + id
    })
};

export const createBuild = (jobId) => {
    return requestAuth({
        url: '/builds',
        method: 'POST',
        data: {
            jobId
        }
    })
};

export const getFileList = (buildId) => {
    return requestAuth({
        url: '/builds/' + buildId + '/files'
    })
};