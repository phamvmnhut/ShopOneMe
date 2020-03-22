//Saga effects
import {put, takeLatest, fork, call} from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';

import {host} from '../Api/hostname';

function* getdataInit() {
  const response = yield fetch(host, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: '',
  });
  const dataInit = yield response.status === 200 ? response.json() : {};
  return dataInit;
}

//Saga effects
function* fetchDatainit() {
  try {
    const receivedData = yield getdataInit();
    yield console.log('dataInit : fetch Data');
    yield put({type: 'FETCH_SUCCEEDED', receivedData: receivedData});
  } catch (error) {
    yield put({type: 'FETCH_FAILED', error});
  }
}
function* watchFetchDataInit() {
  yield takeLatest('INIT_DATA', fetchDatainit);
}

function* getCart() {
  try {
    const value = yield AsyncStorage.getItem('@cart');
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (error) {
    // Error retrieving data
    console.log('Err in getCart: ', error);
    return [];
  }
}
function* getCartStorage() {
  try {
    const receivedData = yield getCart();
    yield console.log('CartInit : get Storage');
    yield put({
      type: 'CART_IMPORT_STORAGE_SUCCEED',
      receivedData: receivedData,
    });
  } catch (error) {
    yield put({type: 'CART_IMPORT_STORAGE_FAIL', error});
  }
}
function* watchCartStorage() {
  yield takeLatest('CART_STORAGE_GET', getCartStorage);
}

function* getTokenStorage() {
  console.log('TokenInit : get Storage');
  try {
    const value = yield AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    // Error retrieving data
    console.log('Err in getToken: ', error);
    return '';
  }
}

function* checkToken() {
  try {
    const token = yield getTokenStorage();
    const res = yield fetch(`${host}check_login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({token}),
    });
    const resLogin = yield res.status === 200 ? res.json() : {};
    yield put({
      type: 'LOGIN',
      resLogin: resLogin,
    });
  } catch (error) {
    yield put({type: 'LOGIN_FAIL', error});
  }
}

function* getNewToken(token) {
  fetch(`${host}refresh_token.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token}),
  }).then(res => res.text());
}
function* refreshToken() {
  try {
    const token = yield getTokenStorage();
    if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
      console.log('Chua co token');
    }
    const newToken = yield getNewToken(token);
    yield AsyncStorage.setItem('@token', newToken);
    console.log('New Token: ', newToken);
  } catch (e) {
    console.log('EER in refresh Token: ', e);
  }
}

function* tokenAllTask() {
  yield checkToken();
  //function* not using in ssssetInterval
  //yield call(setInterval, refreshToken, 1000);
}

function* watchUserToken() {
  yield takeLatest('INIT_USER', tokenAllTask);
}

export default function* rootSaga() {
  yield fork(watchFetchDataInit);
  yield fork(watchCartStorage);
  yield fork(watchUserToken);
}
