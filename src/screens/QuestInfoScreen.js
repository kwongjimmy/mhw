import React, { PureComponent } from 'react';
import QuestInfo from '../components/QuestInfo';

export default class QuestInfoScreen extends PureComponent {
  render() {
    console.log(this.props.type);
    return (
      <QuestInfo navigator={this.props.navigator} quest_id={this.props.quest_id}/>
    );
  }
}
  