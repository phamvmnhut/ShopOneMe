import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COLOR} from '../../../Constants/color';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {container} = styles;
    return (
      <View style={container}>
        <Text>FAQs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
