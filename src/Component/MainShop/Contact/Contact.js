import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
//import MapView from 'react-native-maps';

import {COLOR} from '../../../Constants/color';

import Icon from 'react-native-vector-icons/Ionicons';

class Contact extends Component {
  render() {
    const {
      mapContainer,
      wrapper,
      infoContainer,
      rowInfoContainer,
      infoText,
    } = styles;
    return (
      <View style={wrapper}>
        <View style={mapContainer}>
          <Text>Map ne</Text>
        </View>
        <View style={infoContainer}>
          <View style={rowInfoContainer}>
            <Icon name="ios-disc" size={35} />
            <Text style={infoText}>Hung Nhuong, Giong Trom, Ben Tre</Text>
          </View>
          <View style={rowInfoContainer}>
            <Icon name="md-call" size={35} />
            <Text style={infoText}>(+84) 3 3847 3427</Text>
          </View>
          <View style={rowInfoContainer}>
            <Icon name="md-mail" size={35} />
            <Text style={infoText}>phamvmnhut@gmail.com</Text>
          </View>
          <View style={[rowInfoContainer, {borderBottomWidth: 0}]}>
            <Icon name="ios-send" size={35} />
            <Text style={infoText}>phamvmnhut@gmail.com</Text>
          </View>
        </View>
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
  mapStyle: {
    width: width - 40,
    height: 230,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    marginTop: 0,
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D6D6D6',
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#AE005E',
    fontWeight: '500',
  },
});

export default Contact;
