import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Right, Left, Body } from 'native-base';

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


  renderWeaponListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
      >
        <Left>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Left>
        <Body>
        </Body>
        <Right>
        </Right>
      </ListItem>
    );
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


  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <View>
          <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
      );
    }
    return (
      null
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
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'armor'
        },
        animationType: 'fade',
        title: item.name
      })}
      >
        <Left>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Left>
        <Body>
          {this.renderSkills(item)}
        </Body>
        <Right>
          {this.renderSlots(item)}
        </Right>
      </ListItem>
    );
  }

  render() {
    if (this.props.type === 'armor') {
      return (
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
        />
      );
    }
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={this.renderWeaponListItems}
      />
    );
  }
}
