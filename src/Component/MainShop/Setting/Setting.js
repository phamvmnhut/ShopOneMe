import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: 30, color: '#63ed07'}}> Setting Component</Text>
        <Text>Cảm ơn bạn đã chuyển qua đến tận tab này :))</Text>
      </View>
    );
  }
}
