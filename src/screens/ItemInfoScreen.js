import React, { Component } from 'react';
import { Text } from 'react-native';
import ItemInfo from '../components/ItemInfo';
import EquipArmorInfo from '../components/EquipArmorInfo';

export default class ItemInfoScreen extends Component {
  renderScreen() {
    if (this.props.category === 'item') {
      return (
        <ItemInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if (this.props.category === 'armor') {
      return (
        <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    }
    return (
      <Text>Hi3</Text>
    );
  }

  render() {
    return this.renderScreen();
  }
}
