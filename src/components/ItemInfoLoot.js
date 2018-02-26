import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import { Images, ElementStatusImages } from '../assets'

let top = true;
export default class ItemInfoLoot extends Component {

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      if(top === false) {
        this.refs._Flatlist.scrollToOffset({
          animated: true,
          offSet: { y: 0, x: 0 }
        })
      } else {
        this.props.navigator.popToRoot({
          animated: true,
          animationType: 'fade',
        })
      }
    }
  }

  handleScroll(event) {
    if(event.nativeEvent.contentOffset.y !== 0) {
      top = false;
    } else {
      top = true;
    }
  }

  renderListItems = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderMapLoot() {
    if(this.props.mapLoot.length > 0) {
      return (
        <FlatList
          data={this.props.mapLoot}
          keyExtractor={(item) => `${item.map_id.toString()} ${item.area}`}
          renderItem={this.renderListItems}
          ref={ref='_Flatlist'}
          onScroll={this.handleScroll.bind(this)}
        />
      )
    }
    return (
      null
    );
  }

  renderMonsterLoot() {
    if(this.props.monsterLoot.length > 0) {
      return (
        <FlatList
          data={this.props.monsterLoot}
          keyExtractor={(item) => item.name.toString()}
          renderItem={this.renderListItems}
          ref={ref='_Flatlist'}
          onScroll={this.handleScroll.bind(this)}
        />
      )
    }
    return (
      null
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderMapLoot()}
        {this.renderMonsterLoot()}
      </Container>
    );
  }
}
