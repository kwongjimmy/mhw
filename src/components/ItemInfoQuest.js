import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { ListItem, Body, Right, Text } from 'native-base';

export default class ItemInfoQuest extends PureComponent {
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
      <ListItem
        style={{ marginLeft: 0 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          type: 'quests',
          quest_id: item.quest_id,
        },
        animationType: 'slide-horizontal',
        title: item.name,
        })}>
        <Body>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Body>
        <Right>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{item.type}</Text>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <FlatList
        initialNumToRender={8}
        contextContainerStyle={{ paddingTop: 20 }}
        data={this.props.items}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
