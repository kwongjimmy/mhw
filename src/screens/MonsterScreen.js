import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator, StatusBar } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import MonsterList from '../components/MonsterList'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2, Title, Button, Left, Right, Body } from 'native-base';

import { MonsterImages } from '../assets'

// Styles
import styles from './Styles/MonsterScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class MonsterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allMonsters: [],
      smallMonsters: [],
      largeMonsters: [],
      loading: true,
      data: [],
    };
    // SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    // let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
  }

  okCallback(test) {
    console.log(test);
  }

  errorCallback(test) {
    console.log(test);
  }

  componentWillMount() {
    // // DELETE FROM IOS
    // SQLite.deleteDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
    // //DELETE FROM ANDROID
    // SQLite.deleteDatabase({name: 'mhworld.db', location: '~mhworld.db'}, this.okCallback, this.errorCallback);
  }

  componentDidMount() {
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      var allMonsters = [];
      var smallMonsters = [];
      var largeMonsters = [];
      tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          allMonsters.push(row);
          // this.setState({record: row});
        }
        // this.setState({ allMonsters });
        // db.close();
      });
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['Small'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          smallMonsters.push(row);
        }
      });
      tx.executeSql('SELECT * FROM monster WHERE size=?', ['Large'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          largeMonsters.push(row);
        }
        this.setState({ data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false });
        db.close();
      });
    });
  }

  componentWillUnmount() {
    // db.close();
  }

  renderContent(screen) {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    } else {
      if(screen === 'all') {
        return (
          <MonsterList navigator={this.props.navigator} monsters={this.state.allMonsters} />
        );
      } else if(screen === 'large') {
        return (
          <MonsterList navigator={this.props.navigator} monsters={this.state.largeMonsters} />
        );
      }
      return (
        <MonsterList navigator={this.props.navigator} monsters={this.state.smallMonsters} />
      );
    }
  }

  render () {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
         <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="All">
           {this.renderContent('all')}
         </Tab>
         <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Large">
           {this.renderContent('large')}
         </Tab>
         <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Small">
           {this.renderContent('small')}
         </Tab>
       </Tabs>
      </Container>
    );
  }
}
