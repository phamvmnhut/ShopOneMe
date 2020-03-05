import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
class CartWithBadge extends Component {
  render() {
    const {color, size, cart} = this.props;
    const badgeCount = cart.cart
      ? cart.cart.reduce((sum, cur) => sum + cur.total, 0)
      : 0;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name="md-cart" size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
export default connect(
  state => {
    return {
      cart: state.cart,
    };
  },
  dispatch => {
    return {};
  },
)(CartWithBadge);
