import {host} from './hostname';

function login(data) {
  return fetch(`${host}login.php`, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function register(data) {
  return fetch(`${host}register.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function changeinfo(data) {
  return fetch(`${host}change_info.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export {login, register, changeinfo};
