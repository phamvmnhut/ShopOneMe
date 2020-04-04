import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

class StartComp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.initapp();
  }
  componentDidUpdate() {
    const {appstate} = this.props;
    console.log('START APP: ', appstate);
    if (appstate.init) {
      this.props.navigation.navigate('main');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start Green </Text>
        <View style={styles.devide} />
        <Text style={styles.text}> Shop One Me </Text>
        <Text>Loading ...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
    return {
      appstate: state.appstate,
    };
  },
  dispatch => {
    return {
      initapp: () =>
        dispatch({
          type: 'INIT_APP',
        }),
    };
  },
)(StartComp);
