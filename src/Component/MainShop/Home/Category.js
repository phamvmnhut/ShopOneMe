import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Swipper from 'react-native-swiper';

const {height} = Dimensions.get('window');

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {wrapper, textstyle, imagestyle} = styles;
    return (
      <View style={wrapper}>
        <View>
          <Text style={textstyle}> CATEGORY </Text>
        </View>
        <View>
          <Swipper showsButtons={true}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swipper>
        </View>
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
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});
