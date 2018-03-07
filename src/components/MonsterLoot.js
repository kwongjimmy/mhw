import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Left, Right } from 'native-base';

export default class MonsterLoot extends PureComponent {
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
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderListHeader(item) {
    if (this.currentCondition !== item.name) {
      this.currentCondition = item.name;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5, fontWeight: '300', color: '#191919' }}>{item.name}</Text>
          </Left>
          <Right />
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
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'item',
            },
            animationType: 'slide-horizontal',
            title: item.item_name,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.item_name}</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.chance}%`}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        initialNumToRender={0}
        data={this.state.data}
        keyExtractor={(item) => item.loot_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }
}
