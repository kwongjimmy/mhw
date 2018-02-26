import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base'
import ItemInfo from '../components/ItemInfo'
import EquipArmorInfo from '../components/EquipArmorInfo'
import { Images, ElementStatusImages } from '../assets'

// Styles
import styles from './Styles/ItemInfoScreenStyles'

export default class ItemInfoScreen extends Component {
  constructor(props) {
    super(props)
  }

  renderScreen() {
    if(this.props.category === 'item') {
      return (
        <ItemInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      );
    } else if(this.props.category === 'armor') {
      return (
        <EquipArmorInfo navigator={this.props.navigator} item_id={this.props.item_id}/>
      )
    }
    return (
      <Text>Hi3</Text>
    )
  }

  render() {
    return this.renderScreen();
  }
}
