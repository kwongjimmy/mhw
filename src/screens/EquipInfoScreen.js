import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import EquipArmorInfo from '../components/EquipArmorInfo';

// Styles
import colors from '../styles/colors';

export default class EquipInfoScreen extends PureComponent {
  static navigatorStyle = {
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  render() {
    return (
      <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}
