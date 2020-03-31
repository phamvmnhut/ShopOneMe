import React, {Component} from 'react';
import {View} from 'react-native';

import {connect} from 'react-redux';

import Collection from './Collection';
import TopProduct from './TopProduct';
//import Category from './Collection';
import Search from './Search';

import Header from '../Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.isSearching = false;
    this.state = {
      search: '',
    };
  }
  onSearch(search) {
    this.isSearching = true;
    this.setState({
      search: search,
    });
  }
  offSearch() {
    this.isSearching = false;
    this.setState({search: ''});
  }
  render() {
    const {data} = this.props.data;
    console.log('render in home');
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          onSearch={this.onSearch.bind(this)}
          offSearch={this.offSearch.bind(this)}
        />
        {!this.isSearching ? (
          <View style={{flex: 1}}>
            <Collection type={data.type} navigation={this.props.navigation} />
            <TopProduct
              product={data.product}
              navigation={this.props.navigation}
            />
          </View>
        ) : (
          <Search
            keysearch={this.state.search}
            navigation={this.props.navigation}
          />
        )}
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
      userInit: data =>
        dispatch({
          type: 'INIT_USER',
        }),
    };
  },
)(Home);
