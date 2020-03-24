import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {FlatList} from 'react-navigation';

const {height, width} = Dimensions.get('window');

import {host} from '../../../Api/hostname';

export default class TopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoProduct(pro) {
    this.props.navigation.navigate('Product', {pro: pro});
  }
  render() {
    const {wrapper, titile, body, sp, pro} = style;
    const {product} = this.props;
    return (
      <View style={wrapper}>
        <View style={titile}>
          <Text style={{fontSize: 20}}> TopProduct </Text>
        </View>
        <View style={body} />
        <FlatList
          data={product}
          renderItem={({item}) => (
            <TouchableOpacity style={sp} onPress={() => this.gotoProduct(item)}>
              <Image
                source={{uri: `${host}images/product/${item.images[0]}`}}
                style={pro}
              />
              <Text>{item.name.toUpperCase()}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          )}
          numColumns="2"
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#d9e8d8',
    margin: 10,
    padding: 10,
    paddingTop: 0,
    shadowColor: '#c1cfc0',
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.2,
  },
  titile: {
    margin: 2,
  },
  body: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  sp: {
    width: (width - 50) / 2,
    shadowColor: '#beedc9',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    borderWidth: 2,
    borderColor: '#beedc9',
  },
  pro: {
    height: height / 5,
    width: (width - 50) / 2 - 10,
  },
});
