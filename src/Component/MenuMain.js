import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';

import {IMAGE} from '../Constants/icon';
import {COLOR} from '../Constants/color';

class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goMain() {
    this.props.navigation.closeDrawer();
  }
  goOrder() {
    this.props.navigation.navigate('OrderHistory');
  }
  goAuth() {
    this.props.navigation.navigate('Authentication');
  }
  goChance() {
    this.props.navigation.navigate('ChanceInfo');
  }
  LogoutClick() {
    this.props.onLogout();
  }
  render() {
    const {container, header, TextGo, button} = style;
    const {isLogin} = this.props.user;
    const Logout = (
      <View>
        <View style={header}>
          <Image
            source={IMAGE.ICON_PROFILE}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
        </View>
        <Text>{this.props.user.user.name}</Text>
        <ScrollView>
          <TouchableOpacity onPress={this.goMain.bind(this)} style={button}>
            <Text style={TextGo}>Go Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goOrder.bind(this)} style={button}>
            <Text style={TextGo}>Go to Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goChance.bind(this)} style={button}>
            <Text style={TextGo}>Go to Chance Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.LogoutClick.bind(this)}
            style={button}>
            <Text style={TextGo}>LOGOUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
    const Login = (
      <View>
        <View style={header}>
          <Image
            source={IMAGE.ICON_PROFILE}
            style={{height: 120, width: 120, borderRadius: 60}}
          />
        </View>
        <ScrollView>
          <TouchableOpacity onPress={this.goMain.bind(this)} style={button}>
            <Text style={TextGo}>Go Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goAuth.bind(this)} style={button}>
            <Text style={TextGo}>LOGIN NOW</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
    const LoginOrLogout = isLogin ? Logout : Login;
    return <SafeAreaView style={container}>{LoginOrLogout}</SafeAreaView>;
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.SIDER,
  },
  header: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextGo: {
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 5,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
  },
});

export default connect(
  state => {
    return {
      user: state.user,
    };
  },
  dispatch => {
    return {
      onLogout: () => {
        dispatch({
          type: 'LOGOUT_USER',
        });
      },
    };
  },
)(MenuMain);
