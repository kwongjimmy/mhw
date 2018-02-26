import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import { WeaponImages } from '../assets'

// Styles
import styles from '../screens/Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

let top = true;
export default class WeaponSelectScreen extends Component {
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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.refs._Flatlist.scrollToIndex({
        animated: true,
        index: 0
      })
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
        onPress={() => this.props.navigator.push({
        screen: 'WeaponScreen',
        passProps: {
          type: item,
        },
        animationType: 'fade',
        title: item
      })}>
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
      />
    )
  }

  render () {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderSelectList()}
      </Container>
    );
  }
}
