import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Body, Right, Left, Text, Icon } from 'native-base';
import AdBanner from './AdBanner';
import DropDown from './DropDown';

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
        style={{ height: 65, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          type: 'quests',
          quest_id: item.quest_id,
        },
        animationType: 'slide-horizontal',
        title: item.name,
        })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{item.type.replace('Assignment', '')}</Text>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderListHeader() {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>Quests</Text>
        </Left>
        <Right />
      </ListItem>
    );
  }
  render() {
    if (this.props.items.length === 0) {
      return (
        null
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <DropDown
          headerName={'Quest Rewards'}
          hide={false}
          content={
            <FlatList
              // ListHeaderComponent={this.renderListHeader()}
              initialNumToRender={8}
              contextContainerStyle={{ paddingTop: 20 }}
              data={this.props.items}
              keyExtractor={(item) => item.quest_id.toString()}
              renderItem={this.renderListItems}
              getItemLayout={(data, index) => (
                { length: 65, offset: 65 * index, index }
              )}
            />}
          />
      </View>
    );
  }
}
