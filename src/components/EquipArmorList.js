import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import EquipArmorContainer from './EquipArmorContainer'
import { MonsterImages } from '../assets'

// Styles
import styles from './Styles/EquipScreenStyles'

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
