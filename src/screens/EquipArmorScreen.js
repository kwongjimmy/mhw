import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import EquipArmorList from '../components/EquipArmorList'
import { MonsterImages } from '../assets'

// Styles
import styles from './Styles/EquipScreenStyles'

// let SQLite = require('react-native-sqlite-storage')
// let db = SQLite.openDatabase({name: 'petDB', createFromLocation : "~pet.db"}, this.openCB, this.errorCB);
// let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'}, this.openCB, this.errorCB);
// var db = SQLite.openDatabase({name: 'test.db', createFromLocation : '~pet.db'});

export default class EquipArmorScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      highRank: [],
      lowRank: [],
      loading: true,
    };

    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : '~mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback)
    db.transaction((tx) => {
      var lowRank = [];
      var highRank = [];
      var all = [];
      tx.executeSql(`SELECT
      X.*,
      I1.name as head_name,
      I2.name as armor_name,
      I3.name as gloves_name,
      I4.name as belt_name,
      I5.name as pants_name
      FROM
      ( SELECT
        A.name, A.armor_set_id, B.rank,
        B.item_id as head_item_id, b.slot1 as head_slot1, b.slot2 as head_slot2, b.slot3 as head_slot3, b.skill1 as head_skill1, b.skill2 as head_skill2,
        C.item_id as armor_item_id, C.slot1 as armor_slot1, C.slot2 as armor_slot2, C.slot3 as armor_slot3, C.skill1 as armor_skill1, C.skill2 as armor_skill2,
        D.item_id as gloves_item_id, D.slot1 as gloves_slot1, D.slot2 as gloves_slot2, D.slot3 as gloves_slot3, D.skill1 as gloves_skill1, D.skill2 as gloves_skill2,
        E.item_id as belt_item_id, E.slot1 as belt_slot1, E.slot2 as belt_slot2, E.slot3 as belt_slot3, E.skill1 as belt_skill1, E.skill2 as belt_skill2,
        F.item_id as pants_item_id, F.slot1 as pants_slot1, F.slot2 as pants_slot2, F.slot3 as pants_slot3, F.skill1 as pants_skill1, F.skill2 as pants_skill2
          FROM armor_sets as A
          LEFT JOIN armor as B on A.item_1 = B.item_id
          LEFT JOIN armor as C on A.item_2 = C.item_id
          LEFT JOIN armor as D on A.item_3 = D.item_id
          LEFT JOIN armor as E on A.item_4 = E.item_id
          LEFT JOIN armor as F on A.item_5 = F.item_id
      ) as X
      LEFT JOIN items as I1 on X.head_item_id = I1.item_id
      LEFT JOIN items as I2 on X.armor_item_id = I2.item_id
      LEFT JOIN items as I3 on X.gloves_item_id = I3.item_id
      LEFT JOIN items as I4 on X.belt_item_id = I4.item_id
      LEFT JOIN items as I5 on X.pants_item_id = I5.item_id
      WHERE X.rank=?`, ['High'], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          highRank.push(row);
        }
      });
      tx.executeSql(`SELECT
      X.*,
      I1.name as head_name,
      I2.name as armor_name,
      I3.name as gloves_name,
      I4.name as belt_name,
      I5.name as pants_name
      FROM
      ( SELECT
      	A.name, A.armor_set_id, B.rank,
      	B.item_id as head_item_id, b.slot1 as head_slot1, b.slot2 as head_slot2, b.slot3 as head_slot3, b.skill1 as head_skill1, b.skill2 as head_skill2,
      	C.item_id as armor_item_id, C.slot1 as armor_slot1, C.slot2 as armor_slot2, C.slot3 as armor_slot3, C.skill1 as armor_skill1, C.skill2 as armor_skill2,
      	D.item_id as gloves_item_id, D.slot1 as gloves_slot1, D.slot2 as gloves_slot2, D.slot3 as gloves_slot3, D.skill1 as gloves_skill1, D.skill2 as gloves_skill2,
      	E.item_id as belt_item_id, E.slot1 as belt_slot1, E.slot2 as belt_slot2, E.slot3 as belt_slot3, E.skill1 as belt_skill1, E.skill2 as belt_skill2,
      	F.item_id as pants_item_id, F.slot1 as pants_slot1, F.slot2 as pants_slot2, F.slot3 as pants_slot3, F.skill1 as pants_skill1, F.skill2 as pants_skill2
      		FROM armor_sets as A
      		LEFT JOIN armor as B on A.item_1 = B.item_id
      		LEFT JOIN armor as C on A.item_2 = C.item_id
      		LEFT JOIN armor as D on A.item_3 = D.item_id
      		LEFT JOIN armor as E on A.item_4 = E.item_id
      		LEFT JOIN armor as F on A.item_5 = F.item_id
      ) as X
      LEFT JOIN items as I1 on X.head_item_id = I1.item_id
      LEFT JOIN items as I2 on X.armor_item_id = I2.item_id
      LEFT JOIN items as I3 on X.gloves_item_id = I3.item_id
      LEFT JOIN items as I4 on X.belt_item_id = I4.item_id
      LEFT JOIN items as I5 on X.pants_item_id = I5.item_id
      WHERE X.rank=?`, ['Low'], (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i);
          lowRank.push(row);
        }
        this.setState({ highRank, lowRank, loading: false });
      });
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
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
      if(screen === 'low') {
        return (
          <EquipArmorList navigator={this.props.navigator} armor={this.state.lowRank}/>
        );
      }
      return (
        <EquipArmorList navigator={this.props.navigator} armor={this.state.highRank}/>
      );
    }
  }

  render () {
    return (
      <Container style={{ backgroundColor: 'white' }}>
         <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Low Rank">
             {this.renderContent('low')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="High Rank">
             {this.renderContent('high')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
