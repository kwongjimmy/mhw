import React, { PureComponent } from 'react';
import SkillInfo from '../components/SkillInfo';
import MapInfo from '../components/MapInfo';
import WeaponInfo from '../components/WeaponInfo';

// Styles
import colors from '../styles/colors';

export default class TabInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  render() {
    if (this.props.type === 'maps') {
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
    }
    return (
      <SkillInfo navigator={this.props.navigator} armor_skill_id={this.props.armor_skill_id}/>
    );
  }
}
