import React, {Component} from 'react';

import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

import {host} from '../../../Api/hostname';

export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoListPro(typeID) {
    this.props.navigation.push('ListProduct', {colecID: typeID});
  }
  render() {
    const {type} = this.props;
    const ranType = Math.floor(Math.random() * type.length);
    const {wrapper, title, textstyle, imagestyle} = styles;
    return (
      <View style={wrapper}>
        <View style={title}>
          <Text style={textstyle}>COLLECTION </Text>
        </View>
        <TouchableOpacity onPress={() => this.gotoListPro(type[ranType].id)}>
          <Image
            source={{uri: `${host}images/type/${type[ranType].image}`}}
            style={imagestyle}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 4 + 5,
    backgroundColor: '#d9e8d8',
    margin: 10,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    shadowColor: '#c1cfc0',
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.2,
  },
  title: {
    margin: 5,
  },
  textstyle: {
    fontSize: 20,
  },
  imagestyle: {
    height: (height / 4) * (3 / 4),
    width: '100%',
  },
});
