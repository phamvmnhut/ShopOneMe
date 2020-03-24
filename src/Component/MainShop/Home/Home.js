import React, {Component} from 'react';
import {View, Alert, Text} from 'react-native';

import {connect} from 'react-redux';

import Collection from './Collection';
import TopProduct from './TopProduct';
//import Category from './Collection';
import Search from './Search';

import Header from '../Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      search: '',
    };
  }
  componentDidMount() {
    this.props.dataInit();
    this.props.cartInit();
    this.props.userInit();
  }
  onSearch(search) {
    this.setState({
      search: search,
      isSearching: true,
    });
  }
  offSearch() {
    this.setState({isSearching: false});
    this.setState({search: ''});
  }
  render() {
    const {data} = this.props.data;
    console.log('render');
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          onSearch={this.onSearch.bind(this)}
          offSearch={this.offSearch.bind(this)}
        />
        {!this.state.isSearching ? (
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

/*
 if (!this.state.isSearching) {
      this.setState({isSearching: true});
    }
    this.setState({search});
*/
