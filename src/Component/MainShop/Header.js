import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const {height} = Dimensions.get('window');
import {COLOR} from '../../Constants/color';
import {IMAGE} from '../../Constants/icon';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  onSearch() {
    const {search} = this.state;
    this.props.onSearch(search);
  }
  offSearch() {
    this.setState({search: ''});
    this.props.offSearch();
  }
  render() {
    const {wrapper, row1, row2, tittle, iconstyle, textinputstyle} = styles;
    const {openDrawer} = this.props.navigation;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="md-menu" size={35} />
          </TouchableOpacity>
          <Text style={tittle}>Shop One Me</Text>
          <Image style={iconstyle} source={IMAGE.ICON_LOGO} />
        </View>
        <View style={row2}>
          <TextInput
            style={textinputstyle}
            placeholder="Nhap thu can tim"
            returnKeyType="search"
            onChangeText={text => this.setState({search: text})}
            value={this.state.search}
            onSubmitEditing={this.onSearch.bind(this)}
          />
          <TouchableOpacity onPress={this.offSearch.bind(this)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: height / 8,
    backgroundColor: COLOR.HEADER,
    padding: 10,
    justifyContent: 'space-around',
  },
  tittle: {
    fontSize: 20,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconstyle: {
    width: 30,
    height: 30,
  },
  textinputstyle: {
    height: height / 23,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingVertical: 0,
    flex: 1,
    marginRight: 5,
  },
});
