import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
//import MapView from 'react-native-maps';

import phoneIcon from '../../../media/phone.png';
import mailIcon from '../../../media/mail.png';
import messageIcon from '../../../media/message.png';
import locationIcon from '../../../media/location.png';

class Contact extends Component {
  render() {
    const {
      mapContainer,
      wrapper,
      infoContainer,
      rowInfoContainer,
      imageStyle,
      infoText,
    } = styles;
    return (
      <View style={wrapper}>
        <View style={mapContainer}>
          <View style={{width: width - 20, height: 250}}>
            <Text>Map ne</Text>
          </View>
        </View>
        <View style={infoContainer}>
          <View style={rowInfoContainer}>
            <Image source={locationIcon} style={imageStyle} />
            <Text style={infoText}>Hung Nhuong, Giong Trom, Ben Tre</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={phoneIcon} style={imageStyle} />
            <Text style={infoText}>(+84) 03 3847 3427</Text>
          </View>
          <View style={rowInfoContainer}>
            <Image source={mailIcon} style={imageStyle} />
            <Text style={infoText}>phamvmnhut@gmail.com</Text>
          </View>
          <View style={[rowInfoContainer, {borderBottomWidth: 0}]}>
            <Image source={messageIcon} style={imageStyle} />
            <Text style={infoText}>phamvmnhut@gmail.com</Text>
          </View>
        </View>
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#F6F6F6'},
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
  imageStyle: {
    width: 30,
    height: 30,
  },
  infoText: {
    fontFamily: 'Avenir',
    color: '#AE005E',
    fontWeight: '500',
  },
});

export default Contact;
