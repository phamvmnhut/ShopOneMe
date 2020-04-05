import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLOR} from '../Constants/color';
import {IMAGE} from '../Constants/icon';

export default class HeaderDrawer extends Component {
  goBackToMain() {
    const {navigation} = this.props;
    navigation.goBack();
  }
  render() {
    const {header, headerTitle, iconstyle} = styles;
    const {title} = this.props;
    return (
      <View style={header}>
        <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
          <Icon name="ios-backspace" size={35} color="white" />
        </TouchableOpacity>
        <Text style={headerTitle}>{title}</Text>
        <Image style={iconstyle} source={IMAGE.ICON_LOGO} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: COLOR.HEADER,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerTitle: {fontFamily: 'Avenir', color: '#fff', fontSize: 20},
  iconstyle: {
    width: 30,
    height: 30,
  },
});
