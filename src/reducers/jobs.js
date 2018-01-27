import _ from 'lodash';
import {
  GET_ALL_JOBS_COMPLETE,
  GET_JOB_DETAILS_COMPLETE,
  CREATE_BUILD_COMPLETE,
  CREATE_BUILD,
  DELETE_JOB_COMPLETE,
} from '../actions/types';


const jobs = (state = {
  byId: {},
  ids: [],
}, action) => {
  const ids = [];
  const byId = {};


  const addOrUpdateJobIfNeeded = (job) => {
    let clone = {...job};

    if (clone.lastBuild) {
      clone.lastBuild = clone.lastBuild._id;
    }

    if (clone.builds) {
      clone = _.omit(clone, 'builds');
    }

    byId[clone._id] = {
      ...byId[clone._id],
      ...clone,
    };

    if (ids.indexOf(clone._id) === -1) {
      ids.push(clone._id);
    }
  };

  switch (action.type) {
    case GET_ALL_JOBS_COMPLETE: {
      const jobs = action.data;

      jobs.forEach((job) => {
        addOrUpdateJobIfNeeded(job);
      });

      return {
        ...state,
        ids,
        byId,
      };
    }

    case GET_JOB_DETAILS_COMPLETE: {
      addOrUpdateJobIfNeeded(action.data);

      return {
        ...state,
        ids,
        byId,
      };
    }

    case CREATE_BUILD:
    case CREATE_BUILD_COMPLETE: {
      const build = action.data;

      //eslint-disable-next-line
      const job = getJob(state, build.job);

      addOrUpdateJobIfNeeded({...job, lastBuild: build});

      return {
        ...state,
        ids,
        byId,
      };
    }

    case DELETE_JOB_COMPLETE: {
      const id = action.identity;

      const byId = {...state.byId};
      const ids = [...state.ids].filter(i => i !== id);

      byId[id] = null;

      return {
        ...state,
        byId,
        ids,
      };
    }


    default:
      return state;
  }
};

export default jobs;


export const getAllJobs = state => state.ids.map(id => state.byId[id]);

export const getJob = (state, id) => state.byId[id];