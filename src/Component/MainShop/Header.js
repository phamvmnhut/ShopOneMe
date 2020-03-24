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

const {height} = Dimensions.get('window');
import {COLOR} from '../../Constants/color';

import icon_menu from '../../media/ic_menu.png';
import icon_logo from '../../media/ic_logo.png';

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
    const {wrapper, row1, tittle, iconstyle, textinputstyle} = styles;
    const {openDrawer} = this.props.navigation;
    return (
      <View style={wrapper}>
        <View style={row1}>
          <TouchableOpacity onPress={openDrawer}>
            <Image style={iconstyle} source={icon_menu} />
          </TouchableOpacity>
          <Text style={tittle}> Shop do cua tui </Text>
          <Image style={iconstyle} source={icon_logo} />
        </View>
        <View style={row1}>
          <TextInput
            style={textinputstyle}
            placeholder="Nhap thu can tim"
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
  },
  iconstyle: {
    width: 25,
    height: 25,
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
