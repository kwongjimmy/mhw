import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem } from 'native-base';

export default class MonsterEquip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      armor: true,
      data: this.props.data,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    console.log(this.state.data);
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 15 }}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
