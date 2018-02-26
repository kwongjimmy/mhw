import React, { Component } from 'react';
import { FlatList } from 'react-native';
import EquipArmorContainer from './EquipArmorContainer';

export default class EquipArmorList extends Component {
  renderArmorSet = ({ item }) => {
    return (
      <EquipArmorContainer navigator={this.props.navigator} armor={item}/>
    );
  }

  render() {
    return (
      <FlatList
        // contentContainerStyle={styles.monsterFlatListContext}
        // style={styles.monsterFlatList}
        style={{ flex: 1 }}
        data={this.props.armor}
        keyExtractor={(item) => item.armor_set_id.toString()}
        renderItem={this.renderArmorSet}
      />
    );
  }
}
