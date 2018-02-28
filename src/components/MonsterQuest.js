import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Left, Right, Body } from 'native-base';

export default class MonsterQuest extends Component {
  constructor(props) {
    super(props);
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

  renderListItems = ({ item }) => {
    return (
      <View>
        <ListItem style={{ marginLeft: 0 }}>
          <Body>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.quest_name}</Text>
          </Body>
          <Right>
            <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{item.type}</Text>
            <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{`${item.required_rank} \u2605`}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        contextContainerStyle={{ paddingTop: 20 }}
        data={this.props.monster_quest}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
