import {showError} from './alert';

export const errorHandler = (error, actionType, dispatch) => {
    console.error(error.stack);
    showError("Oops!", error.response ? error.response.message : error.message);

    dispatch({
        type: actionType,
        error
    });

    if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }
};