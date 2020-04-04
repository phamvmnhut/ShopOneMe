import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import AppContainer from './App.navigation';

import rootSaga from './redux/rootSaga';

import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const saveCart = async cartArray => {
  try {
    await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
  } catch (e) {
    console.log('Error in SaveCart: ', e);
  }
};
const saveData = async data => {
  try {
    await AsyncStorage.setItem('@datainit', JSON.stringify(data));
  } catch (e) {
    console.log('Error in SaveDataInit: ', e);
  }
};
const saveUser = async user => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  } catch (e) {
    console.log('Error in SaveUser: ', e);
  }
};

//for Cart
let cartdefault = {
  cart: [],
  status: 'FAIL',
};
const cartReducer = (state = cartdefault, action) => {
  const cartstate = state.cart;
  let newstate;
  switch (action.type) {
    case 'CART_IMPORT_STORAGE_SUCCEED':
      newstate = {...state, cart: action.payload, status: 'SUCCEEDED'};
      break;
    case 'CART_IMPORT_STORAGE_FAIL':
      newstate = {...state, status: action.error};
      break;
    case 'ADD_CART':
      const newproduct = {pro: action.pro, total: 1};
      newstate = {...state, cart: [...cartstate, newproduct]};
      saveCart(newstate.cart);
      break;
    case 'REMOVE_CART':
      const cartupdate = cartstate.filter(item => item.pro.id != action.idpro);
      newstate = {...state, cart: cartupdate};
      saveCart(newstate.cart);
      break;
    case 'INC_PRO':
      const cart_inc = cartstate.map(item => {
        if (item.pro.id == action.idpro) {
          item.total += 1;
        }
        return item;
      });
      newstate = {...state, cart: cart_inc};
      saveCart(newstate.cart);
      break;
    case 'DEC_PRO':
      let index = cartstate.findIndex(item => item.pro.id == action.idpro);
      if (index == -1) {
        newstate = state;
        break;
      }
      const cart_dec =
        cartstate[index].total == 1
          ? cartstate.filter(item => item.pro.id != action.idpro)
          : cartstate.map(item => {
              if (item.pro.id == action.idpro) {
                item.total -= 1;
              }
              return item;
            });
      newstate = {...state, cart: cart_dec};
      saveCart(newstate.cart);
      break;
    case 'SENDORDER':
      newstate = cartdefault;
      saveCart(newstate.cart);
      break;
    default:
      newstate = state;
      break;
  }
  return newstate;
};

//for Data init
let initDatadefault = {
  data: {
    type: [
      {
        id: '4',
        name: 'Maxi Dress',
        image: 'maxi.jpg',
      },
      {
        id: '5',
        name: 'Party Dress',
        image: 'party.jpg',
      },
    ],
    product: [
      {
        id: '30',
        name: 'contrast embro',
        idType: '4',
        nameType: 'Maxi Dress',
        price: '121',
        color: 'Fuchsia',
        material: 'leather',
        description:
          'Take your vacay-ready style to the next level with the bold personality of this embroidered maxi dress. With casually elegant details like a tassel-tie plunging neckline and hi-lo hem, it promises to be a total head-turner with heels.',
        images: ['56.jpg', '57.jpg'],
      },
      {
        id: '31',
        name: 'floral print t',
        idType: '4',
        nameType: 'Maxi Dress',
        price: '133',
        color: 'LimeGreen',
        material: 'cotton',
        description:
          "Looking for that next great dress to take on summer getaways or just out to weekend brunch? We've got you covered with this breezy, floral print maxi. Flirty ruffles dance along the skirt, while soft tassel-kissed straps tie the look together.",
        images: ['58.jpg', '59.jpg'],
      },
    ],
  },
  status: 'LOCAL',
};
const initDataReducer = (state = initDatadefault, action) => {
  switch (action.type) {
    case 'FETCH_DATAINIT_SUCCEEDED':
      saveData(action.payload);
      return {...state, data: action.payload, status: 'SUCCEEDED'};
    case 'FETCH_DATAINIT_FAILED':
      return {...state, status: action.error};
    case 'DATA_IMPORT_STORAGE_SUCCEED':
      return {...state, data: action.payload, status: 'SUCCEEDED'};
    case 'DATA_IMPORT_STORAGE_FAIL':
      return {...state, status: action.error};
    default:
      return state;
  }
};

//for user
const userdefault = {
  isLogin: false,
  user: {},
  token: '',
};
const userReducer = (state = userdefault, action) => {
  switch (action.type) {
    case 'LOGIN_SECCEEDED':
      saveUser(action.payload);
      return {
        ...state,
        isLogin: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT_USER':
      saveUser({});
      return {
        ...state,
        isLogin: false,
        user: {},
        token: '',
      };
    case 'CHANCE_INFO':
      saveUser(action.user);
      return {
        ...state,
        isLogin: false,
        user: {},
        token: '',
      };
    case 'LOGIN_FAIL':
      return userdefault;
    case 'USER_IMPORT_STORAGE_SUCCEED':
      return {
        isLogin: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'USER_IMPORT_STORAGE_FAIL':
      return userdefault;
    default:
      return state;
  }
};

//app state
const appstatusdefault = {
  init: false,
  internet: false,
  err: '',
};
const appStatusReducer = (state = appstatusdefault, action) => {
  switch (action.type) {
    case 'INTERNET_CONNECTED':
      return {...state, internet: true};
    case 'INTERNET_NOT_CONNECT':
      return {...state, internet: false};
    case 'IN_IT_SECCEEDED':
      return {...state, internet: action.payload, init: true};
    case 'IN_IT_FAIL':
      return {...state, init: false, internet: false, err: action.err};
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    appstate: appStatusReducer,
    data: initDataReducer,
    user: userReducer,
    cart: cartReducer,
  }),
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
