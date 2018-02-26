import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

import { MonsterImages } from '../assets'

// Styles
import styles from './Styles/ItemScreenStyles'

export default class ItemScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 15,
  };

  constructor(props) {
    super(props)
    this.state = {
      items: [],
    };
    // console.log(this.props)
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    db.transaction((tx) => {
      let items = [];
      tx.executeSql('SELECT item_id, name, category FROM items ORDER BY item_id', [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          items.push(row);
        }
        this.setState({ items });
        db.close();
      });
    });
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({
            screen: 'ItemInfoScreen',
            passProps: {
              item_id: item.item_id,
              category: item.category
            },
            animationType: 'fade',
            title: item.name
          })}>
            <Text style={{ fontSize: 15.5, flex: 1, color: '#191919' }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderContent() {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.state.items}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
        />
      )
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderContent()}
         {/* <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Items">
             {this.renderContent()}
           </Tab>
         </Tabs> */}
      </Container>
    );
  }
}
