import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

import {connect} from 'react-redux';

import HeaderDrawer from '../HeaderDrawer';

import {COLOR} from '../../Constants/color';
import {changeinfo} from '../../Api/User';

class ChangeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: 'name',
      txtAddress: 'address',
      txtPhone: 'phone',
    };
  }
  onClickChancefo() {
    const {txtName, txtAddress, txtPhone} = this.state;
    const token = this.props.user.token;
    const data = {
      token: token,
      name: txtName,
      address: txtAddress,
      phone: txtPhone,
    };
    changeinfo(data)
      .then(res => res.json())
      .then(user => {
        Alert.alert('ChangeInfo Succeeded');
        this.props.navigation.goBack();
        this.props.onChangeInfor(user);
      })
      .catch(err => {
        console.log('Err in ChangeInfo: ', err);
        Alert.alert('Err in ChangeInfo');
      });
  }
  componentDidMount() {
    const {name, address, phone} = this.props.user.user;
    this.setState({
      txtName: name,
      txtAddress: address,
      txtPhone: phone,
    });
  }
  render() {
    const {wrapper, body, signInContainer, signInTextStyle, textInput} = styles;
    const {txtName, txtAddress, txtPhone} = this.state;
    return (
      <View style={wrapper}>
        <HeaderDrawer {...this.props} title="Change Info" />
        <View style={body}>
          <TextInput
            style={textInput}
            placeholder="Enter your name"
            autoCapitalize="none"
            value={txtName}
            onChangeText={text => this.setState({txtName: text})}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your address"
            autoCapitalize="none"
            value={txtAddress}
            onChangeText={text => this.setState({txtAddress: text})}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your phone number"
            autoCapitalize="none"
            keyboardType="numeric"
            value={txtPhone}
            onChangeText={text => this.setState({txtPhone: text})}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={signInContainer}
            onPress={this.onClickChancefo.bind(this)}>
            <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
          </TouchableOpacity>
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
  body: {flex: 12, backgroundColor: '#F6F6F6', justifyContent: 'center'},
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1,
  },
  signInTextStyle: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  signInStyle: {
    flex: 3,
    marginTop: 50,
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
      onChangeInfor: data => {
        dispatch({
          type: 'CHANCE_INFO',
          payload: data,
        });
      },
    };
  },
)(ChangeInfo);
