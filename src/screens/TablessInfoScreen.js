import React, { PureComponent } from 'react';
import CharmInfo from '../components/CharmInfo';
import EquipArmorInfo from '../components/EquipArmorInfo';
import MapInfo from '../components/MapInfo';
import WeaponInfo from '../components/WeaponInfo';
import QuestInfo from '../components/QuestInfo';
import DecorationInfo from '../components/DecorationInfo';

export default class TablessInfoScreen extends PureComponent {
  static navigatorStyle = {
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      // console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

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
          item={this.props.item}
        />
      );
    } else if (this.props.type === 'quests') {
      return (
        <QuestInfo navigator={this.props.navigator} quest_id={this.props.quest_id}/>
      );
    } else if (this.props.type === 'decorations') {
      return (
        <DecorationInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    }

    return (
      <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
    );
  }
}
