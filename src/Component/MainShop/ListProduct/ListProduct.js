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

function fetchUser(typeID, page) {
  this.setState({loading: false});
  fetch(`${host}product_by_type.php?id_type=${typeID}&page=${page}`)
    .then(res => res.json())
    .then(res => {
      let listData = this.state.data;
      let data = listData
        .concat(res.data.items) //concate list with response
        .this.setState({loading: false, data: data});
    })
    .catch(error => {
      this.setState({loading: false, error: 'Something just went wrong'});
    });
}

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [],
    };
  }

  handleLoadMore() {
    const typeID = this.props.navigation.state.params.colecID;
    if (this.page === 0) {
      return;
    }
    this.page = this.page + 1;
    fetch(`${host}product_by_type.php?id_type=${typeID}&page=${this.page}`)
      .then(res => res.json())
      .then(res => {
        if (!res[0]) {
          throw 'fetch none data';
        }
        const data = this.state.data;
        const newdata = data.concat(res);
        this.setState({data: newdata});
      })
      .catch(err => {
        if (err == 'fetch none data') {
          this.page = 0;
        }
      });
  }

  goBack() {
    this.props.navigation.pop();
  }
  gotoProduct(pro) {
    this.props.navigation.push('Product', {pro: pro});
  }
  componentDidMount() {
    const typeID = this.props.navigation.state.params.colecID;
    fetch(`${host}product_by_type.php?id_type=${typeID}&page=${this.page}`)
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
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
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
