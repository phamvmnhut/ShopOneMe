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
const saveToken = async token => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (e) {
    console.log('Error in SaveToken: ', e);
  }
};

// default data or store in local
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
};
const initDataReducer = (state = initDatadefault, action) => {
  switch (action.type) {
    case 'FETCH_SUCCEEDED':
      return {...state, data: action.receivedData};
    case 'FETCH_FAILED':
      return {...state, data: initDatadefault};
    default:
      return state;
  }
};

const userdefault = {
  isLogin: false,
  user: {},
  token: '',
};
const userReducer = (state = userdefault, action) => {
  switch (action.type) {
    case 'LOGIN':
      saveToken(action.resLogin.token);
      return {
        ...state,
        isLogin: true,
        user: action.resLogin.user,
        token: action.resLogin.token,
      };
    case 'LOGOUT_USER':
      saveToken('');
      return {
        ...state,
        isLogin: false,
        user: {},
        token: '',
      };
    case 'CHANCE_INFO':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

let cartdefault = {
  cart: [],
};

const cartReducer = (state = cartdefault, action) => {
  const cartstate = state.cart;
  let newstate;
  switch (action.type) {
    case 'CART_IMPORT_STORAGE_SUCCEED':
      newstate = {...state, cart: action.receivedData};
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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
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
