import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import EquipArmorContainer from './EquipArmorContainer';

export default class EquipArmorList extends PureComponent {
  renderArmorSet = ({ item }) => {
    return (
      <EquipArmorContainer navigator={this.props.navigator} armor={item}/>
    );
  }

  render() {
    return (
      <FlatList
        initialNumToRender={0}
        data={this.props.armor}
        keyExtractor={(item) => item.armor_set_id.toString()}
        renderItem={this.renderArmorSet}
      />
    );
  }
}
