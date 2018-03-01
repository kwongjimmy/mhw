import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import ItemInfo from '../components/ItemInfo';

export default class ItemInfoScreen extends PureComponent {
  render() {
    return (
      <ItemInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}
