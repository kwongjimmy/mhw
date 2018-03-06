import React, { PureComponent } from 'react';
import ItemInfo from '../components/ItemInfo';
import SkillInfo from '../components/SkillInfo';


export default class TabInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  render() {
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
