import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from './Component/MainShop/Home/Home';
import Cart from './Component/MainShop/Cart/Cart';
import Contact from './Component/MainShop/Contact/Contact';
import Setting from './Component/MainShop/Setting/Setting';

import Product from './Component/MainShop/Product/Product';
import ListProduct from './Component/MainShop/ListProduct/ListProduct';

import Authentication from './Component/Authentication/Authentication';
import ChanceInfo from './Component/ChanceInfo/ChanceInfo';
import OrderHistory from './Component/OrderHistory/OrderHistory';

import MenuMain from './Component/MenuMain';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CartWithBadge from './Component/MainShop/Cart/CartWithBadge';

import StartComp from './Component/StartComp';

const CartStack = createStackNavigator(
  {
    Cart: Cart,
    Product: Product,
  },
  {
    initialRouteName: 'Cart',
    /* Defaul for title | The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: Home,
    Product: Product,
    ListProduct: ListProduct,
  },
  {
    initialRouteName: 'Home',
    /* Defaul for title | The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

let routeTabConfigs = {
  Home: {
    screen: HomeStack,
  },
  Cart: {
    screen: CartStack,
  },
  Contact: {
    screen: Contact,
  },
  Setting: {
    screen: Setting,
  },
};
let tabNavigatorConfig = {
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: 'blue',
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: 'lightgray',
      padding: -10,
    },
  },
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      let iconName = 'ios-home';
      switch (routeName) {
        case 'Home':
          iconName = 'ios-home';
          break;
        case 'Cart':
          iconName = 'md-cart';
          return <CartWithBadge size={25} color={tintColor} />;
        case 'Contact':
          iconName = 'md-contact';
          break;
        case 'Setting':
          iconName = 'md-settings';
          break;
        default:
          iconName = 'ios-alert';
          break;
      }
      if (routeName === 'Home') {
        iconName = 'ios-home';
      } else if (routeName === 'List') {
        iconName = 'ios-analytics';
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  order: ['Home', 'Cart', 'Contact', 'Setting'],
};
const TabShop = createBottomTabNavigator(routeTabConfigs, tabNavigatorConfig);

const MainStack = createStackNavigator(
  {
    Main: TabShop,
    Authentication: Authentication,
    ChanceInfo: ChanceInfo,
    OrderHistory: OrderHistory,
  },
  {
    initialRouteName: 'Main',
    /* Defaul for title | The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppDrawer = createDrawerNavigator(
  {
    drawer: {screen: MainStack, navigationOptions: {header: null}},
  },
  {
    initialRouteName: 'drawer',
    contentComponent: MenuMain,
  },
);
const AppFlow = createSwitchNavigator(
  {
    start: StartComp,
    main: AppDrawer,
  },
  {
    initialRouteName: 'start',
  },
);
export default createAppContainer(AppFlow);
