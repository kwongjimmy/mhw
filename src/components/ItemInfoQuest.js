import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import { Images, ElementStatusImages } from '../assets'

let top = true;
export default class ItemInfoQuest extends Component {

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

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <FlatList
          data={this.props.items}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
          ref={ref='_Flatlist'}
          onScroll={this.handleScroll.bind(this)}
        />
      </Container>
    );
  }
}
