//check INternet Connection
import NetInfo from '@react-native-community/netinfo';
NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  this.setState({isConnected: state.isConnected});
});
