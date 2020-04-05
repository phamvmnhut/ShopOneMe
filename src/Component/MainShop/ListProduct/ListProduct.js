import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ListItem} from 'react-native-elements';

import {host} from '../../../Api/hostname';
import {COLOR} from '../../../Constants/color';

import Icon from 'react-native-vector-icons/Ionicons';

class Item extends Component {
  gotoProduct(pro) {
    this.props.navigation.push('Product', {pro: pro});
  }
  render() {
    const {item} = this.props;
    const {subtitleView} = styles;
    return (
      <ListItem
        title={item.name.toUpperCase()}
        titleStyle={{fontSize: 22}}
        leftAvatar={{
          size: 'xlarge',
          rounded: false,
          source: {
            uri: `${host}images/product/${item.images[0]}`,
          },
          title: item.name,
          renderPlaceholderContent: <ActivityIndicator />,
        }}
        subtitle={
          <View style={subtitleView}>
            <Text style={styles.ratingText}>PRICE: {item.price}</Text>
            <Text style={styles.ratingText}>Meterial: {item.material}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>Color: </Text>
              <View
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: `${item.color.toLowerCase()}`,
                  borderRadius: 15,
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
        }
        bottomDivider
        chevron
        onPress={() => this.gotoProduct(item)}
      />
    );
  }
}

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [],
    };
  }

  handleLoadMore() {
    const typeID = this.props.navigation.state.params.colecID;
    if (this.page === 0) {
      return;
    }
    this.page = this.page + 1;
    fetch(`${host}product_by_type.php?id_type=${typeID}&page=${this.page}`)
      .then(res => res.json())
      .then(res => {
        if (!res[0]) {
          throw 'fetch none data';
        }
        const data = this.state.data;
        const newdata = data.concat(res);
        this.setState({data: newdata});
      })
      .catch(err => {
        if (err == 'fetch none data') {
          this.page = 0;
        }
      });
  }

  goBack() {
    this.props.navigation.pop();
  }
  componentDidMount() {
    const typeID = this.props.navigation.state.params.colecID;
    fetch(`${host}product_by_type.php?id_type=${typeID}&page=${this.page}`)
      .then(res => res.json())
      .then(res => {
        this.setState({data: res});
      });
  }
  render() {
    const {container, wrapper, header} = styles;
    return (
      <View style={container}>
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <Icon name="md-arrow-round-back" size={25} />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>List Product</Text>
            <Text />
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <Item item={item} {...this.props} />}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 3,
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  subtitleView: {
    marginTop: 10,
  },
});
