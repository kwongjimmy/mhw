import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem } from 'native-base';

export default class MonsterLoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowrank: true,
      data: this.props.monster_loot,
    };
    this.currentCondition = '';
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  renderListHeader(item) {
    if (this.currentCondition !== item.name) {
      this.currentCondition = item.name;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 18 }} itemDivider>
          <Text style={{ fontSize: 15.5, fontWeight: '300', color: '#191919' }}>{item.name}</Text>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderListItems = ({ item }) => {
    return (
      <View>
        {this.renderListHeader(item)}
        <ListItem style={{ marginLeft: 0, paddingLeft: 18 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'item',
            },
            animationType: 'fade',
            title: item.item_name,
          })}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.item_name}</Text>
        </ListItem>
      </View>

    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.loot_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
