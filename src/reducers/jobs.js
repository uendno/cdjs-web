import {
    GET_ALL_JOBS_COMPLETE,
    UPDATE_JOB_BUILD_DATA
} from '../actions/types';


const jobs = (state = {
    byId: {},
    ids: []
}, action) => {
    switch (action.type) {

        case GET_ALL_JOBS_COMPLETE: {
            const ids = [];
            const byId = {};
            const jobs = action.jobs;

            jobs.forEach(job => {
                ids.push(job._id);
                byId[job._id] = job;
            });

            return {
                ...state,
                ids,
                byId
            }
        }

        case UPDATE_JOB_BUILD_DATA: {
            const byId = {...state.byId};
            const job = byId[action.job];

            byId[job._id] = {
                ...job,
                lastBuild: action.build
            };

            return {
                ...state,
                byId
            }
        }

        default:
            return state;
    }
};

export default jobs;


export const getAllJobs = (state) => {
    return state.ids.map(id => state.byId[id]);
};