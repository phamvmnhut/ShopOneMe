import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import backSpecial from '../../media/back_white.png';

import AsyncStorage from '@react-native-community/async-storage';

import {host} from '../../Api/hostname';

async function getTokenStorage() {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    // Error retrieving data
    console.log('Err in getToken: ', error);
    return '';
  }
}

export default class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {arrOrder: []};
  }
  async onGetOrder() {
    const token = await getTokenStorage();
    return fetch(`${host}order_history.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({token}),
    })
      .then(res => res.json())
      .catch(err => console.log('ERR in send order: ', err));
  }
  componentDidMount() {
    this.onGetOrder()
      .then(arrOrder => arrOrder.reverse())
      .then(newArr => this.setState({arrOrder: newArr}))
      .catch(err => console.log(err));
  }
  goBackToMain() {
    const {navigation} = this.props;
    navigation.goBack();
  }
  render() {
    const {
      wrapper,
      header,
      headerTitle,
      backIconStyle,
      body,
      orderRow,
    } = styles;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View />
          <Text style={headerTitle}>Order History</Text>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={body}>
          <FlatList
            data={this.state.arrOrder}
            renderItem={({item}) => (
              <View style={orderRow} key={item.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Order id:
                  </Text>
                  <Text style={{color: '#2ABB9C'}}>ORD{item.id}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    OrderTime:
                  </Text>
                  <Text style={{color: '#C21C70'}}>{item.date_order}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Status:
                  </Text>
                  <Text style={{color: '#2ABB9C'}}>
                    {item.status ? 'Completed' : 'Pending'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#9A9A9A', fontWeight: 'bold'}}>
                    Total:
                  </Text>
                  <Text style={{color: '#C21C70', fontWeight: 'bold'}}>
                    {item.total}$
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#fff'},
  header: {
    flex: 1,
    backgroundColor: '#2ABB9C',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerTitle: {fontFamily: 'Avenir', color: '#fff', fontSize: 20},
  backIconStyle: {width: 30, height: 30},
  body: {flex: 10, backgroundColor: '#F6F6F6'},
  orderRow: {
    height: width / 3,
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around',
  },
});
