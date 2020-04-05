import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, ButtonGroup} from 'react-native-elements';

import {login, register} from '../../Api/User';
import {COLOR} from '../../Constants/color';

import {connect} from 'react-redux';

import HeaderDrawer from '../HeaderDrawer';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      name: '',
      email: '',
      password: '',
      repass: '',
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  LoginClick() {
    const {email, password} = this.state;
    const data = {
      email,
      password,
    };
    login(data)
      .then(res => res.json())
      .then(res => {
        if (res != 'SAI_THONG_TIN_DANG_NHAP') {
          Alert.alert('Login secceed');
          this.props.navigation.goBack();
          this.props.onLogin(res);
        } else {
          //change if res err sent
          Alert.alert('Err in Login');
          this.setState({password: ''});
        }
      })
      .catch(err => {
        console.log('Err in Login: ', err);
        Alert.alert('Err in Login');
      });
  }
  RegisterClick() {
    const {name, email, password, repass} = this.state;
    if (password !== repass) {
      Alert.alert('Re pass is not same Pass');
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    register(data)
      .then(res => res.text())
      .then(res => {
        if (res == 'THANH_CONG') {
          Alert.alert('Register secceed');
          this.setState({isLoginScreen: true});
        } else {
          Alert.alert('Err in register');
        }
      })
      .catch(err => Alert.alert('Err in register'));
  }
  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }
  render() {
    const {wrapper, info, row2} = styles;
    const SignInJSX = (
      <View style={info}>
        <Input
          label="Your Email Address"
          placeholder="example@address.com"
          leftIcon={<Icon name="envelope-o" size={25} color="black" />}
          onChangeText={email => this.setState({email})}
        />
        <Input
          secureTextEntry={true}
          label="Your Password"
          placeholder="Password"
          leftIcon={<Icon name="asterisk" size={25} color="black" />}
          onChangeText={password => this.setState({password})}
        />
        <Button
          type="outline"
          title="LOGIN NOW"
          buttonStyle={{marginTop: 10}}
          onPress={this.LoginClick.bind(this)}
        />
      </View>
    );
    const SignUpJSX = (
      <View style={info}>
        <Input
          label="Your Email Address"
          placeholder="example@address.com"
          leftIcon={<Icon name="envelope-o" size={25} color="black" />}
          onChangeText={email => this.setState({email})}
        />
        <Input
          label="Your Account's name"
          placeholder="My Name"
          leftIcon={<Icon name="user" size={25} color="black" />}
          onChangeText={name => this.setState({name})}
        />
        <Input
          secureTextEntry={true}
          label="Your Password"
          placeholder="Password"
          leftIcon={<Icon name="asterisk" size={25} color="black" />}
          onChangeText={password => this.setState({password})}
        />
        <Input
          secureTextEntry={true}
          label="Re Your Password"
          placeholder="Password"
          leftIcon={<Icon name="asterisk" size={25} color="black" />}
          onChangeText={repass => this.setState({repass})}
        />
        <Button
          type="outline"
          title="REGISTER"
          buttonStyle={{marginTop: 10}}
          onPress={this.RegisterClick.bind(this)}
        />
      </View>
    );
    const Info = this.state.selectedIndex == 0 ? SignInJSX : SignUpJSX;

    const buttons = ['Login', 'Register'];
    const {selectedIndex} = this.state;
    return (
      <View style={wrapper}>
        <HeaderDrawer {...this.props} title="Login / Resgister" />
        {Info}
        <View style={row2}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
  info: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtinput: {
    backgroundColor: '#b2e69c',
    margin: 3,
    borderRadius: 20,
    paddingLeft: 20,
    alignContent: 'center',
  },
  buttonClick: {
    backgroundColor: '#fcca5d',
    borderRadius: 20,
    marginLeft: 100,
    marginRight: 100,
    alignItems: 'center',
  },
  row2: {
    flex: 1,
  },
  iconstyle: {
    width: 25,
    height: 25,
  },
  btnS: {
    margin: 2,
  },
});

export default connect(
  state => {
    return {
      login: state.user,
    };
  },
  dispatch => {
    return {
      onLogin: data => {
        dispatch({
          type: 'LOGIN_SECCEEDED',
          payload: data,
        });
      },
    };
  },
)(Authentication);
