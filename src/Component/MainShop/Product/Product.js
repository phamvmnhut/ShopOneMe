import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {Image} from 'react-native-elements';

import {host} from '../../../Api/hostname';

class ProductDetail extends Component {
  goBack() {
    this.props.navigation.pop();
  }
  render() {
    const {
      wrapper,
      cardStyle,
      header,
      footer,
      imageContainer,
      cartStyle,
      textBlack,
      textSmoke,
      textHighlight,
      textMain,
      titleContainer,
      descContainer,
      productImageStyle,
      descStyle,
      txtMaterial,
      txtColor,
    } = styles;
    const {
      name,
      price,
      color,
      material,
      description,
      images,
    } = this.props.navigation.state.params.pro;
    const {pro} = this.props.navigation.state.params;
    const {addPro, inc_pro} = this.props;
    const cartArray = this.props.cart.cart;
    let checkCart = cartArray.findIndex(item => item.pro.id == pro.id);
    const addCart =
      checkCart == -1 ? (
        <TouchableOpacity onPress={() => addPro(pro)}>
          <Icon name="add-shopping-cart" size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => inc_pro(pro.id)}>
          <Text style={cartStyle}>{cartArray[checkCart].total}+</Text>
        </TouchableOpacity>
      );
    return (
      <ScrollView style={wrapper}>
        <View style={cardStyle}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <IonIcon name="md-arrow-round-back" size={25} />
            </TouchableOpacity>
            {addCart}
          </View>
          <View style={imageContainer}>
            <ScrollView
              style={{flexDirection: 'row', padding: 10, height: swiperHeight}}
              horizontal>
              <Image
                source={{uri: `${host}images/product/${images[0]}`}}
                style={productImageStyle}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Image
                source={{uri: `${host}images/product/${images[1]}`}}
                style={productImageStyle}
                PlaceholderContent={<ActivityIndicator />}
              />
            </ScrollView>
          </View>
          <View style={footer}>
            <View style={titleContainer}>
              <Text style={textMain}>
                <Text style={textBlack}>{name.toUpperCase()}</Text>
                <Text style={textHighlight}> / </Text>
                <Text style={textSmoke}>{price}</Text>
              </Text>
            </View>
            <View style={descContainer}>
              <Text style={descStyle}>{description}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 15,
                }}>
                <Text style={txtMaterial}>Material {material}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={txtColor}>Color {color}</Text>
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: `${color.toLowerCase()}`,
                      borderRadius: 15,
                      marginLeft: 10,
                      borderWidth: 1,
                      borderColor: '#C21C70',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const {width} = Dimensions.get('window');
const swiperWidth = width / 1.8 - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    alignItems: 'center',
  },
  cartStyle: {
    fontSize: 19,
  },
  productStyle: {
    width: width / 2,
    height: width / 2,
  },
  footer: {
    flex: 6,
  },
  imageContainer: {
    flex: 6,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textMain: {
    paddingLeft: 20,
    marginVertical: 10,
  },
  textBlack: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F46',
  },
  textSmoke: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#9A9A9A',
  },
  textHighlight: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#7D59C8',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  descContainer: {
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descStyle: {
    color: '#AFAFAF',
  },
  linkStyle: {
    color: '#7D59C8',
  },
  productImageStyle: {
    width: swiperWidth,
    height: swiperHeight,
    marginHorizontal: 5,
  },
  mainRight: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  txtColor: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtMaterial: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
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
      addPro: product =>
        dispatch({
          type: 'ADD_CART',
          pro: product,
        }),
      inc_pro: id_pro =>
        dispatch({
          type: 'INC_PRO',
          idpro: id_pro,
        }),
    };
  },
)(ProductDetail);
