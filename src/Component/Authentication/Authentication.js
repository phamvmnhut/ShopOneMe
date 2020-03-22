import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

import {host} from '../../Api/hostname';

import {connect} from 'react-redux';

const {height} = Dimensions.get('window');

import icon_logo from '../../media/ic_logo.png';
import icon_back from '../../media/back_white.png';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginScreen: true,
      name: '',
      email: '',
      password: '',
    };
  }
  GotoBackMain() {
    const {navigation} = this.props;
    navigation.goBack();
  }
  LoginClick() {
    const {email, password} = this.state;
    const data = {
      email,
      password,
    };
    fetch(`${host}login.php`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        if (res != 'SAI_THONG_TIN_DANG_NHAP') {
          Alert.alert('Login secceed');
          this.GotoBackMain();
          this.props.onLogin(res);
        } else {
          //change if res err sent
          Alert.alert('Err in Login');
          this.setState({password: ''});
        }
      })
      .catch(err => Alert.alert('Err in Login'));
  }
  RegisterClick() {
    const {name, email, password} = this.state;
    const data = {
      name,
      email,
      password,
    };
    fetch(`${host}register.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
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
  componentDidUpdate() {
    if (this.props.login.isLogin == true) {
      this.props.navigation.goBack();
    }
  }
  render() {
    const {
      wrapper,
      row1,
      info,
      txtinput,
      row2,
      iconstyle,
      tittle,
      btnS,
      buttonClick,
    } = styles;
    const SignInJSX = (
      <View style={info}>
        <TextInput
          style={txtinput}
          placeholder="Nhập EMAIL"
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={txtinput}
          placeholder="Nhập MẬT KHẨU"
          onChangeText={password => this.setState({password})}
        />
        <TouchableOpacity
          onPress={this.LoginClick.bind(this)}
          style={buttonClick}>
          <Text>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
    const SignUpJSX = (
      <View style={info}>
        <TextInput
          style={txtinput}
          placeholder="Nhập tên TÀI KHOẢN"
          onChangeText={name => this.setState({name})}
        />
        <TextInput
          style={txtinput}
          placeholder="Nhập email"
          onChangeText={email => this.setState({email})}
        />
        <TextInput
          style={txtinput}
          placeholder="Nhập mật khẩu"
          onChangeText={password => this.setState({password})}
        />
        <TextInput
          style={txtinput}
          placeholder="Nhập lại mật khẩu"
          onChangeText={password => this.setState({password})}
        />
        <TouchableOpacity
          onPress={this.RegisterClick.bind(this)}
          style={buttonClick}>
          <Text>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    );
    const Info = this.state.isLoginScreen ? SignInJSX : SignUpJSX;

    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={this.GotoBackMain.bind(this)}>
            <Image style={iconstyle} source={icon_back} />
          </TouchableOpacity>
          <Text style={tittle}> Trang đăng nhập và đăng kí </Text>
          <Image style={iconstyle} source={icon_logo} />
        </View>
        {Info}
        <View style={row2}>
          <Button
            title="Sign In"
            style={btnS}
            onPress={() => this.setState({isLoginScreen: true})}
          />
          <Button
            title="Sign Up"
            style={btnS}
            onPress={() => this.setState({isLoginScreen: false})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#26e03f',
    padding: 10,
    justifyContent: 'space-around',
  },
  tittle: {
    fontSize: 20,
  },
  row1: {
    flexDirection: 'row',
    height: height / 10,
    justifyContent: 'space-between',
    borderBottomColor: '#f5ad64',
    borderBottomWidth: 2,
  },
  info: {
    height: 200,
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
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#f5ad64',
    borderTopWidth: 2,
    padding: 3,
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
          type: 'LOGIN',
          resLogin: data,
        });
      },
    };
  },
)(Authentication);
