import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {Avatar, Button, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';

import {COLOR} from '../Constants/color';

class MenuMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goMain() {
    this.props.navigation.navigate('Main');
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
    const {container, header, footer} = style;
    const {isLogin} = this.props.user;
    const info = this.props.user.user;
    const Login = (
      <View>
        <View style={header}>
          <Avatar
            rounded
            title="G"
            showEditButton
            size="large"
            onEditPress={() => Alert.alert('Please, Login User')}
          />
          <Text>Gest</Text>
        </View>
        <ScrollView>
          <Button
            type="clear"
            buttonStyle={{height: 50}}
            icon={<Icon name="md-log-in" size={25} />}
            title=" LOGIN NOW"
            onPress={this.goAuth.bind(this)}
          />
        </ScrollView>
      </View>
    );
    const LoginOrLogout = isLogin ? (
      <View>
        <View style={header}>
          <Avatar
            rounded
            title={info.name.charAt(0)}
            showEditButton
            size="large"
            onEditPress={() => Alert.alert('This future is developing')}
          />
          <Text>{this.props.user.user.name}</Text>
        </View>
        <ScrollView>
          <Button
            type="clear"
            buttonStyle={{height: 50}}
            icon={<Icon name="ios-albums" size={25} />}
            title=" Order History"
            onPress={this.goOrder.bind(this)}
          />
          <Button
            type="clear"
            buttonStyle={{height: 50}}
            icon={<Icon name="ios-swap" size={25} />}
            title=" Chance Info"
            onPress={this.goChance.bind(this)}
          />
          <Button
            type="clear"
            buttonStyle={{height: 50}}
            icon={<Icon name="md-log-out" size={25} />}
            title=" LOGOUT"
            onPress={this.LogoutClick.bind(this)}
          />
        </ScrollView>
      </View>
    ) : (
      Login
    );
    return (
      <SafeAreaView style={container}>
        {LoginOrLogout}
        <View style={footer}>
          <SocialIcon
            type="github"
            title="Code on Github"
            onPress={() => {
              Linking.openURL('https://github.com/phamvmnhut/ShopOneMe');
            }}
          />
          <SocialIcon
            type="facebook"
            title="FaceBook phamvmnhut"
            onPress={() => {
              Linking.openURL('https://www.facebook.com/phamvmnhut');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    justifyContent: 'space-between',
    padding: 5,
  },
  header: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginBottom: 20,
    flexDirection: 'row',
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
