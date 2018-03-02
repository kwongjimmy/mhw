import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import ItemInfo from '../components/ItemInfo';
import SkillInfo from '../components/SkillInfo';


export default class TabInfoScreen extends PureComponent {
  render() {
    console.log(this.props.type);
    if (this.props.type === 'item') {
      return (
        <ItemInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    }
    return (
      <SkillInfo navigator={this.props.navigator} armor_skill_id={this.props.armor_skill_id}/>
    );
  }
}
