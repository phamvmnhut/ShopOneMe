import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';

import {FlatList} from 'react-navigation';

const {height, width} = Dimensions.get('window');
import {host} from '../../../Api/hostname';

class ItemList extends Component {
  gotoProduct(pro) {
    this.props.navigation.navigate('Product', {pro: pro});
  }
  render() {
    const {sp, pro} = style;
    const {item} = this.props;
    return (
      <TouchableOpacity style={sp} onPress={() => this.gotoProduct(item)}>
        <Image
          source={{uri: `${host}images/product/${item.images[0]}`}}
          style={pro}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>{item.name.toUpperCase()}</Text>
          <Text>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class TopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {wrapper, titile, body} = style;
    const {product} = this.props;
    return (
      <View style={wrapper}>
        <View style={titile}>
          <Text style={{fontSize: 20}}> Top Product </Text>
        </View>
        <FlatList
          horizontal={true}
          data={product}
          renderItem={({item}) => <ItemList item={item} {...this.props} />}
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
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
    shadowColor: '#c1cfc0',
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.2,
  },
  titile: {
    margin: 5,
  },
  body: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  sp: {
    width: width / 2,
    shadowColor: '#beedc9',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
  },
  pro: {
    height: width * (2 / 3) - 40,
    width: width / 2,
    marginRight: 10,
  },
});
