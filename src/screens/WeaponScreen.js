import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import { WeaponImages } from '../assets'

// Styles
import styles from '../screens/Styles/MonsterScreenStyles'

let top = true;
export default class WeaponScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 15,
  };

  constructor(props) {
    super(props)
    this.state = {
      weapons:
      [
      'Great Sword','Long Sword','Sword and Shield','Dual Blades',
      'Hammer','Hunting Horn', 'Lance', 'Gunlance', 'Switch Axe',
      'Charge Blade', 'Insect Glaive', 'Bow', 'Light Bowgun', 'Heavy Bowgun'
      ]
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      console.log(this.refs);
      if(top === false) {
        this.refs._Flatlist.scrollToIndex({
          animated: true,
          index: 0
        })
      } else {
      }
    }
  }

  handleScroll(event) {
    console.log(event.nativeEvent.contentOffset.y);
    if(event.nativeEvent.contentOffset.y !== 0) {
      top = false;
    } else {
      top = true;
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  renderListItems = ({ item }) => {
    let src = WeaponImages[item]
    return (
      <TouchableHighlight activeOpacity={0.5} underlayColor={'white'}
        >
        <View style={[styles.monsterContainer, { borderWidth: 0, justifyContent: 'center' }]}>
          <View style={styles.monsterImageContainer}>
            <Image
              resizeMode="contain"
              style={styles.monsterImage2}
              source={src}
            />
          </View>
          <View style={[styles.monsterTextContainer, { borderWidth: 0, marginTop: 15, marginBottom: 15 }]}>
            <Text style={[styles.monsterText ]}>{item}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderSelectList() {
    return (
      <FlatList
        data={this.state.weapons}
        keyExtractor={(item) => item}
        renderItem={this.renderListItems}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    )
  }

  render () {
    return (
      <View>
        <Text>
          {this.props.type}
        </Text>
      </View>
    )
  }
}
