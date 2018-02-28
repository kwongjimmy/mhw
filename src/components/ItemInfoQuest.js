import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Container, ListItem, Body, Left, Right, Text } from 'native-base';

export default class ItemInfoQuest extends Component {
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
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
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
        data={this.props.items}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
