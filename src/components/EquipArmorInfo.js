import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../assets'
// import { renderTab1 } from './MonsterInfo'
import MonsterInfo from './MonsterInfo'
import MonsterLoot from './MonsterLoot'
import MonsterEquip from './MonsterEquip'
import MonsterQuest from './MonsterQuest'

// Styles
import styles from './Styles/MonsterInfoScreenStyles'

export default class EquipArmorInfo extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: false,
    navBarBackgroundColor: 'white',
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      info: {},
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', location: 'Default'}, this.okCallback, this.errorCallback)
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM armor as A JOIN items As B ON A.item_id = B.item_id WHERE A.item_id = ?', [this.props.item_id], (tx, results) => {
        let info = results.rows.item(0);
        this.setState({ info, loading: false });
      });
    });
  }

  renderContent() {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View>
        <Text>{this.state.info.name}</Text>
        <Text>Hi</Text>
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
