import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { Text, ListItem, Right, Left, Body } from 'native-base';
import WeaponListItem from './WeaponListItem'

export default class MonsterEquip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      armor: true,
      data: this.props.data,
    };
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

  renderWeaponListItems = ({ item }) => {
    return (
      <WeaponListItem navigator={this.props.navigator} item={item} />
    );
  }

  renderSlots(item) {
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
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'armor',
        },
        animationType: 'slide-horizontal',
        title: item.name,
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
          initialNumToRender={10}
          data={this.state.data}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems.bind(this)}
        />
      );
    }
    return (
      <FlatList
        initialNumToRender={7}
        data={this.state.data}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={this.renderWeaponListItems.bind(this)}
      />
    );
  }
}
