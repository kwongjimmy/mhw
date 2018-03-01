import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import EquipArmorInfo from '../components/EquipArmorInfo';

export default class ItemInfoScreen extends PureComponent {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 20,
  };

  render() {
    return (
      <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}
