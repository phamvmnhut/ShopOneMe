import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';

import {COLOR} from '../../Constants/color';

import {connect} from 'react-redux';

import {orderhistory} from '../../Api/Cart';

import HeaderDrawer from '../HeaderDrawer';

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {arrOrder: []};
  }
  async onGetOrder() {
    const token = this.props.user.token;
    return orderhistory(token)
      .then(res => res.json())
      .catch(err => console.log('ERR in send order: ', err));
  }
  componentDidMount() {
    this.onGetOrder()
      .then(arrOrder => arrOrder.reverse())
      .then(newArr => this.setState({arrOrder: newArr}))
      .catch(err => console.log(err));
  }
  render() {
    const {wrapper, body, orderRow} = styles;
    return (
      <View style={wrapper}>
        <HeaderDrawer {...this.props} title="Order History" />
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
  wrapper: {flex: 1, backgroundColor: COLOR.BACKGROUND},
  body: {flex: 12, backgroundColor: '#F6F6F6'},
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

export default connect(
  state => {
    return {
      user: state.user,
    };
  },
  {},
)(OrderHistory);
