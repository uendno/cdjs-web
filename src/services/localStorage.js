import _ from 'lodash';

let data;

const KEY = 'cdjs-data';

try {
  const persisted = localStorage.getItem(KEY);
  if (persisted) {
    data = JSON.parse(persisted);
  } else {
    data = {};
  }
} catch (error) {
  data = {};
}

const localStorageSrv = {
  get: key => data[key],
  set: (key, value) => {
    data[key] = value;
    localStorage.setItem(KEY, JSON.stringify(data));
  },
  remove: (key) => {
    data = _.omit(data, key);
    localStorage.setItem(KEY, JSON.stringify(data));
  },
};

export default localStorageSrv;

