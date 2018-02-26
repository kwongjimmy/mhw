import React, { Component, PureComponent } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'

import { MonsterImages } from '../assets'

// Styles
import styles from '../screens/Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

let top = true;
export default class MonsterList extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
    if(event.nativeEvent.contentOffset.y !== 0) {
      top = false;
    } else {
      top = true;
    }
  }

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.monster_name;
    if(name !== 'Gajalaka' && name !== 'Grimalkyne') {
      name = name.replace(/["'-]/g, "");
      name = name.replace(' ', '');
      src = MonsterImages[name];
    }
    return (
      // <TouchableHighlight style={styles.monsterTouchContainer2} activeOpacity={0.5} underlayColor={'white'} onPress={() => this.props.navigation.navigate('MonsterInfo', { monster_id: item.monster_id, monster_name: item.monster_name })}>
      <TouchableHighlight style={styles.monsterTouchContainer} activeOpacity={0.5} underlayColor={'white'}
        onPress={() => this.props.navigator.push({
        screen: 'MonsterInfoScreen',
        passProps: {
          monster_id: item.monster_id,
        },
        animationType: 'fade',
        title: item.monster_name
      })}>
        <View style={styles.monsterContainer}>
          <View style={styles.monsterImageContainer}>
            <Image
              resizeMode="contain"
              style={styles.monsterImage2}
              source={src}
            />
          </View>
          <View style={styles.monsterTextContainer}>
            <Text style={styles.monsterText}>{item.monster_name}</Text>
            <Text style={styles.monsterTypeText}>{item.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    return (
      <FlatList
        contentContainerStyle={styles.monsterFlatListContext}
        style={styles.monsterFlatList}
        data={this.props.monsters}
        keyExtractor={(item) => item.monster_id.toString()}
        renderItem={this.renderMonster}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}
