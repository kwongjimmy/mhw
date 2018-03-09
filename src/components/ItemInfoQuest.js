import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Body, Right, Text, Icon } from 'native-base';

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
        style={{ height: 65, marginLeft: 0 }}
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
    if (this.props.items.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: '#8e8e8e' }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: '#8e8e8e' }}>No Data</Text>
        </View>
      );
    }
    return (
      <FlatList
        initialNumToRender={8}
        contextContainerStyle={{ paddingTop: 20 }}
        data={this.props.items}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
        getItemLayout={(data, index) => (
          { length: 65, offset: 65 * index, index }
        )}
      />
    );
  }
}
