import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

class StartComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.dataInit();
    this.props.cartInit();
    this.props.userInit();
  }
  componentDidMount() {
    this.props.navigation.navigate('main');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start Green </Text>
        <View style={styles.devide} />
        <Text style={styles.text}> Shop One Me </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  devide: {
    borderBottomWidth: 2,
    borderColor: 'black',
    width: 100,
  },
  text: {
    fontSize: 25,
  },
});

export default connect(
  state => {
    return {};
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
)(StartComp);
