//Saga effects
import {put, takeLatest, fork} from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

import {host} from '../Api/hostname';

//function* for Cart
function* getCartStorage() {
  try {
    const value = yield AsyncStorage.getItem('@cart');
    if (value !== null) {
      return JSON.parse(value);
    }
    throw 'cart NULL';
  } catch (error) {
    // Error retrieving data
    console.log('Err in get Cart Storage: ', error);
    throw error;
  }
}
function* CartStorage() {
  try {
    const cartArr = yield getCartStorage();
    yield console.log('CartInit : get Storage');
    yield put({
      type: 'CART_IMPORT_STORAGE_SUCCEED',
      payload: cartArr,
    });
  } catch (error) {
    yield put({type: 'CART_IMPORT_STORAGE_FAIL', error});
  }
}

//function* for dataInit FETCH
function* fetchDataInit() {
  try {
    const response = yield fetch(host, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: '',
    });
    const res = yield response.json();
    return res;
  } catch (err) {
    yield console.log('Err in fetch DataInit: ', err);
    throw err;
  }
}
function* DataInitFetch() {
  try {
    const datainit = yield fetchDataInit();
    yield console.log('dataInit : fetch Data');
    yield put({type: 'FETCH_DATAINIT_SUCCEEDED', payload: datainit});
  } catch (error) {
    yield put({type: 'FETCH_DATAINIT_FAILED', error});
  }
}
//function* for dataInit STORAGE
function* getDataInitStorage() {
  try {
    const value = yield AsyncStorage.getItem('@datainit');
    if (value !== null) {
      return JSON.parse(value);
    }
    throw 'data NULL';
  } catch (err) {
    console.log('Err in get DataInit Storage: ', err);
    throw err;
  }
}
function* DataInitStorage() {
  try {
    const datainit = yield getDataInitStorage();
    yield console.log('dataInit : get Storage');
    yield put({
      type: 'DATA_IMPORT_STORAGE_SUCCEED',
      payload: datainit,
    });
  } catch (error) {
    yield put({type: 'DATA_IMPORT_STORAGE_FAIL', error});
  }
}

//function* for user STORAGE
function* getUserStorage() {
  try {
    const value = yield AsyncStorage.getItem('@user');
    if (value !== null) {
      return JSON.parse(value);
    }
    throw 'user NULL';
  } catch (err) {
    console.log('Err in get User Storage: ', err);
    throw err;
  }
}
function* UserInfoStorage() {
  try {
    const userinfo = yield getUserStorage();
    yield console.log('UserInit : get Storage');
    yield put({
      type: 'USER_IMPORT_STORAGE_SUCCEED',
      payload: userinfo,
    });
  } catch (error) {
    yield put({type: 'USER_IMPORT_STORAGE_FAIL'});
  }
}
//function* for user ONLINE
function* checkToken() {
  const user = yield getUserStorage();
  yield console.log('UserInit : get Token Storage');
  const token = user.token;
  const res = yield fetch(`${host}check_login.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token}),
  });
  const resLogin = yield res.status === 200 ? res.json() : {};
  return resLogin;
}
function* LoginUser() {
  try {
    const resLogin = yield checkToken();
    yield console.log('UserInit : check Token');
    yield put({
      type: 'LOGIN_SECCEEDED',
      payload: resLogin,
    });
  } catch (error) {
    yield put({type: 'LOGIN_FAIL', error});
  }
}

//Token all TASK
//function* for refresh token
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
    const user = yield getUserStorage();
    const token = user.token;
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

//function* for get Info Internet
function* getInfoInternet() {
  const state = yield NetInfo.fetch();
  const isConnected = yield state.isConnected;
  return isConnected;
}

function* initApp() {
  try {
    yield console.log('-------------INIT APP ------------');
    yield CartStorage();
    const internet = yield getInfoInternet();
    yield console.log('INTERNET: ', internet, ' -------------');
    if (internet) {
      yield DataInitFetch();
      yield LoginUser();
    } else {
      yield UserInfoStorage();
      yield DataInitStorage();
    }
    yield put({type: 'IN_IT_SECCEEDED', payload: internet});
  } catch (err) {
    yield put({type: 'IN_IT_FAIL', err: err});
  }
}

function* watchInitapp() {
  yield takeLatest('INIT_APP', initApp);
}

export default function* rootSaga() {
  yield fork(watchInitapp);
}
