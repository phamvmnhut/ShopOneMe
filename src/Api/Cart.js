import {host} from './hostname';

function orderhistory(token) {
  return fetch(`${host}order_history.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token}),
  });
}

function ordercard(data) {
  return fetch(`${host}cart.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function search(key) {
  return fetch(`${host}search.php?key=${key}`);
}
export {orderhistory, ordercard, search};
