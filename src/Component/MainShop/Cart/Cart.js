import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';

import {host} from '../../../Api/hostname';

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

class Cart extends Component {
  gotoDetail(pro) {
    this.props.navigation.push('Product', {pro: pro});
  }
  render() {
    const {
      main,
      checkoutButton,
      checkoutTitle,
      wrapper,
      product,
      mainRight,
      productController,
      txtName,
      txtPrice,
      productImage,
      numberOfProduct,
      txtShowDetail,
      showDetailContainer,
      Total,
    } = styles;

    const {inc_pro, dec_pro, remove_pro} = this.props;
    const {cart} = this.props.cart;
    const total = cart
      ? cart.reduce((sum, cur) => sum + cur.pro.price * cur.total, 0)
      : 0;
    return (
      <View style={wrapper}>
        <View style={main}>
          <FlatList
            data={cart}
            renderItem={({item}) => {
              const pro = item.pro;
              return (
                <View style={product}>
                  <Image
                    source={{uri: `${host}images/product/${pro.images[0]}`}}
                    style={productImage}
                  />
                  <View style={[mainRight]}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={txtName}>{toTitleCase(pro.name)}</Text>
                      <TouchableOpacity onPress={() => remove_pro(pro.id)}>
                        <Text style={{fontFamily: 'Avenir', color: '#969696'}}>
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={txtPrice}>{pro.price}$</Text>
                    </View>
                    <View style={productController}>
                      <View style={numberOfProduct}>
                        <TouchableOpacity onPress={() => inc_pro(pro.id)}>
                          <Text>+</Text>
                        </TouchableOpacity>
                        <Text>{item.total}</Text>
                        <TouchableOpacity onPress={() => dec_pro(pro.id)}>
                          <Text>-</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={showDetailContainer}
                        onPress={() => this.gotoDetail(pro)}>
                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.pro.id.toString()}
          />
        </View>
        <View style={Total}>
          <TouchableOpacity style={checkoutButton}>
            <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width,
    backgroundColor: '#DFDFDF',
    flex: 9,
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  product: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center',
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between',
  },
  productController: {
    flexDirection: 'row',
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Total: {
    flex: 1,
  },
});

export default connect(
  state => {
    return {
      cart: state.cart,
    };
  },
  dispatch => {
    return {
      inc_pro: id_pro =>
        dispatch({
          type: 'INC_PRO',
          idpro: id_pro,
        }),
      dec_pro: id_pro =>
        dispatch({
          type: 'DEC_PRO',
          idpro: id_pro,
        }),
      remove_pro: id_pro =>
        dispatch({
          type: 'REMOVE_CART',
          idpro: id_pro,
        }),
    };
  },
)(Cart);
