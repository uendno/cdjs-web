import {
    GET_ALL_JOBS_COMPLETE,
    GET_JOB_DETAILS_COMPLETE,
    GET_BUILD_DETAILS_COMPLETE,
    UPDATE_JOB_BUILD_DATA,
    PLAY_JOB_COMPLETE
} from '../actions/types';


const initialState = {
    byId: {},
    ids: []
};

const builds = (state = initialState, action) => {

    let ids = [...state.ids];
    const byId = {...state.byId};

    const addOrUpdateBuildIfNeeded = (build, jobId, addToBeginning) => {
        byId[build._id] = {
            ...byId[build._id],
            ...build,
            jobId: jobId
        };

        if (ids.indexOf(build._id) === -1) {
            if (addToBeginning) {
                ids = [build._id, ...ids];
            } else {
                ids.push(build._id);
            }

        }
    };

    const addOrUpdateBuildsOfJob = (job) => {
        if (job.builds) {
            job.builds.forEach(build => {
                addOrUpdateBuildIfNeeded(build, job._id)
            })
        } else if (job.lastBuild) {
            addOrUpdateBuildIfNeeded(job.lastBuild, job._id)
        }
    };

    switch (action.type) {

        case GET_ALL_JOBS_COMPLETE: {
            const jobs = action.jobs;

            jobs.forEach(job => {
                addOrUpdateBuildsOfJob(job)
            });

            return {
                ...state,
                byId,
                ids
            };
        }

        case GET_JOB_DETAILS_COMPLETE: {
            const job = action.job;
            addOrUpdateBuildsOfJob(job);

            return {
                ...state,
                byId,
                ids
            }
        }

        case GET_BUILD_DETAILS_COMPLETE: {
            addOrUpdateBuildIfNeeded(action.build, action.jobId);

            return {
                ...state,
                byId,
                ids
            }
        }

        case PLAY_JOB_COMPLETE:
        case UPDATE_JOB_BUILD_DATA: {
            addOrUpdateBuildIfNeeded(action.build, action.jobId, true);

            return {
                ...state,
                byId,
                ids
            }
        }

        default:
            return state;
    }
};


export default builds;

export const getBuild = (state, buildId) => {
    return state.byId[buildId];
};

export const getBuildsForJob = (state, jobId) => {
    return state.ids.map(id => state.byId[id]).filter(build => build.jobId === jobId);
};