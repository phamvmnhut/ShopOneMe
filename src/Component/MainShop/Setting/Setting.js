import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: 30, color: '#63ed07'}}> Setting Component</Text>
        <Text>Cảm ơn bạn đã chuyển qua đến tận tab này :))</Text>
        <Button title="Solid Button" />
        <Button title="Outline button" type="outline" />
        <Button title="Clear button" type="clear" />
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Button with icon component"
        />
        <Button
          icon={{
            name: 'arrow-right',
            size: 15,
            color: 'white',
          }}
          title="Button with icon object"
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          iconRight
          title="Button with right icon"
        />
        <Button title="Loading button" loading />
      </View>
    );
  }
}
