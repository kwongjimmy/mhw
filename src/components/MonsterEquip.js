import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Right } from 'native-base';

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

  renderSlots(item) {
    // \u24ea
    let slot1 = (item.slot1 === 0) ? `-` : (item.slot1 === 1) ? `\u2460` : (item.slot1 === 2) ? `\u2461` : `\u2462`;
    let slot2 = (item.slot2 === 0) ? `-` : (item.slot2 === 1) ? `\u2460` : (item.slot2 === 2) ? `\u2461` : `\u2462`;
    let slot3 = (item.slot3 === 0) ? `-` : (item.slot3 === 1) ? `\u2460` : (item.slot3 === 2) ? `\u2461` : `\u2462`;
    return (
      <Text style={{ flex: 1, fontSize: 15.5, fontWeight: '500', color: '#8e8e8e', textAlign: 'center' }}>{`${slot1} ${slot2} ${slot3}`}</Text>
    );
  }

  renderListItems = ({ item }) => {
    return (
      // <View>
      //   <ListItem style={{ marginLeft: 0, paddingLeft: 18 }}>
      //     <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      //   </ListItem>
      // </View>
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'EquipInfoScreen',
        passProps: {
          item_id: item.item_id,
        },
        animationType: 'fade',
        title: item.name
      })}
      >
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        <Right>
          {this.renderSlots(item)}
        </Right>
      </ListItem>
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
