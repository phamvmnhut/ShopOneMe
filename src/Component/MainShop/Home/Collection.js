import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
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
    //console.log('Random Type in Colection component: ', ranType);
    const {wrapper, textstyle, imagestyle} = styles;
    return (
      <View style={wrapper}>
        <View>
          <Text style={textstyle}> COLLECTION </Text>
        </View>
        <TouchableOpacity onPress={() => this.gotoListPro(type[ranType].id)}>
          <Image
            source={{uri: `${host}images/type/${type[ranType].image}`}}
            style={imagestyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 4,
    backgroundColor: '#d9e8d8',
    margin: 10,
    padding: 10,
    paddingTop: 0,
    shadowColor: '#c1cfc0',
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.2,
  },
  textstyle: {
    fontSize: 20,
  },
  imagestyle: {
    height: (height / 4) * (3 / 4),
    width: 300,
  },
});
