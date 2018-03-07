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
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <View>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            type: 'quests',
            quest_id: item.quest_id,
          },
          animationType: 'slide-horizontal',
          title: item.quest_name,
        })}>
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
        initialNumToRender={0}
        data={this.props.monster_quest}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
