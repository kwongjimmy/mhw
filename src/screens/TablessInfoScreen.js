import React, { PureComponent } from 'react';
import CharmInfo from '../components/CharmInfo';
import EquipArmorInfo from '../components/EquipArmorInfo';
import MapInfo from '../components/MapInfo';
import WeaponInfo from '../components/WeaponInfo';

export default class TablessInfoScreen extends PureComponent {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  render() {
    if (this.props.type === 'charms') {
      return (
        <CharmInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'maps') {
      return (
        <MapInfo navigator={this.props.navigator} map_id={this.props.item_id}/>
      );
    } else if (this.props.type === 'weapons') {
      return (
        <WeaponInfo
          navigator={this.props.navigator}
          item_id={this.props.item_id}
          table={this.props.table}
          tableType={this.props.type}
          item={this.props.item}
        />
      );
    }
    return (
      <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}
