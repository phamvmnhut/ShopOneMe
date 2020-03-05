import React, {Component} from 'react';
import {View} from 'react-native';

import {connect} from 'react-redux';

import Collection from './Collection';
import TopProduct from './TopProduct';
//import Category from './Collection';

import Header from '../Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dataInit();
    this.props.cartInit();
  }
  render() {
    const {data} = this.props.data;
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <Collection type={data.type} navigation={this.props.navigation} />
        <TopProduct product={data.product} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      data: state.data,
    };
  },
  dispatch => {
    return {
      dataInit: data =>
        dispatch({
          type: 'INIT_DATA',
        }),
      cartInit: data =>
        dispatch({
          type: 'CART_STORAGE_GET',
        }),
    };
  },
)(Home);
