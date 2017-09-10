import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_COMPLETE,
    GET_ALL_JOBS_ERROR,
    CREATE_JOB_REQUEST,
    CREATE_JOB_CANCEL,
    CREATE_JOB_COMPLETE,
    CREATE_JOB_START,
    CREATE_JOB_ERROR,
    GET_JOB_BY_NAME_REQUEST,
    GET_JOB_BY_NAME_COMPLETE,
    GET_JOB_BY_NAME_ERROR
} from './types';
import {
    getAllJobs as getAllJobQL,
    createJob as createJobQL,
    getJobByName as getJobByNameQL
} from '../helpers/graphql';
import {showError} from '../helpers/alert';

export const getAllJobs = async () => async (dispatch) => {

    dispatch({
        type: GET_ALL_JOBS_REQUEST
    });

    try {
        const jobs = await getAllJobQL();
        dispatch({
            type: GET_ALL_JOBS_COMPLETE,
            jobs
        });
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: GET_ALL_JOBS_ERROR,
            error
        });
    }
};

export const requestJobByName = (name) => async (dispatch) => {
      dispatch({
          type: GET_JOB_BY_NAME_REQUEST,
          name
      });

      try {
          const job = await getJobByNameQL(name);

          dispatch({
              type: GET_JOB_BY_NAME_COMPLETE,
              job
          });

          return job;
      } catch (error) {
          console.error(error.stack);
          showError("Oops!", error.message);

          dispatch({
              type: GET_JOB_BY_NAME_ERROR,
              error
          });
      }
};

export const startCreatingJob = (accountId, repo) => {
    return {
        type: CREATE_JOB_START,
        accountId,
        repo
    }
};

export const cancelCreatingJob = () => {
    return {
        type: CREATE_JOB_CANCEL
    }
};

export const requestCreatingJob = async (jobName, accountId, repoFullName) => async (dispatch) => {
    dispatch({
        type: CREATE_JOB_REQUEST,
        jobName,
        accountId,
        repoFullName
    });

    try {
        const newJob = await createJobQL(jobName, accountId, repoFullName);

        dispatch({
            type: CREATE_JOB_COMPLETE,
            job: newJob
        });

        return newJob;
    } catch (error) {
        console.error(error.stack);
        showError("Oops!", error.message);

        dispatch({
            type: CREATE_JOB_ERROR,
            error
        });
    }
};

