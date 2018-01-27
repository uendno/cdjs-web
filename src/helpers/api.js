import {API_END_POINT} from '../config';
import localStorageSrv from '../services/localStorage';

const processResponse = async (res) => {
  const json = await res.json();

  if (res.status >= 400) {
    const error = new Error(res.statusText);
    error.statusCode = res.status;
    error.response = json;
    error.message = json.message;
    throw error;
  }

  return json.data;
};

export const request = async ({url = '/', method = 'GET', params = {}, data = {}, headers = {}}) => {
  let queryString = '';

  Object.keys(params).forEach((key, index) => {
    if (index === 0) {
      queryString += `?${key}=${params[key]}`;
    } else {
      queryString += `&${key}=${params[key]}`;
    }
  });

  const accessToken = localStorageSrv.get('accessToken');

  const newHeaders = {
    ...headers,
  };

  if (accessToken) {
    newHeaders.Authorization = accessToken;
  }

  switch (method) {
    case 'POST':
    case 'PUT': {
      const res = await fetch(API_END_POINT + url + queryString, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...newHeaders,
        },

        body: JSON.stringify(data),
      });

      return processResponse(res);
    }

    case 'GET':
    case 'DELETE':
    default: {
      const res = await fetch(API_END_POINT + url + queryString, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...newHeaders,
        },
      });

      return processResponse(res);
    }
  }
};

export const get = url => request({
  url,
});

export const del = url => request({
  url,
  method: 'DELETE',
});

export const post = (url, data) => request({
  method: 'POST',
  url,
  data,
});

export const put = (url, data) => request({
  method: 'PUT',
  url,
  data,
});
