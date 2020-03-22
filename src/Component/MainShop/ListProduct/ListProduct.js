import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

import {host} from '../../../Api/hostname';

const {height} = Dimensions.get('screen');

import back from '../../../media/backList.png';

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  goBack() {
    this.props.navigation.pop();
  }
  gotoProduct(pro) {
    this.props.navigation.push('Product', {pro: pro});
  }
  componentDidMount() {
    const typeID = this.props.navigation.state.params.colecID;
    fetch(`${host}product_by_type.php?id_type=${typeID}&page=${1}`)
      .then(res => res.json())
      .then(res => {
        this.setState({data: res});
      });
  }
  render() {
    const {
      container,
      header,
      txtHeader,
      picBack,
      wapper,
      pic,
      txtwapper,
    } = styles;
    return (
      <View style={container}>
        <View style={header}>
          <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Image source={back} style={picBack} />
          </TouchableOpacity>
          <Text style={txtHeader}>List Product</Text>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <View style={wapper}>
              <Image
                source={{uri: `${host}images/product/${item.images[0]}`}}
                style={pic}
              />
              <View style={txtwapper}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
                <Text>Kieu dang: {item.material}</Text>
                <Text>Mau sac {item.color}</Text>
                <TouchableOpacity onPress={() => this.gotoProduct(item)}>
                  <Text>Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
  },
  header: {
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontSize: 20,
  },
  picBack: {
    height: 30,
    width: 30,
  },
  wapper: {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#55ed6f',
    borderWidth: 3,
    marginBottom: 5,
  },
  pic: {
    height: height / 6,
    width: height / 6,
  },
  txtwapper: {
    borderLeftColor: '#7ae6a5',
    borderLeftWidth: 2,
    paddingLeft: 5,
    margin: 3,
  },
});
