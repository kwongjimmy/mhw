import React, { Component } from 'react';
import { ScrollView, Image, FlatList, Platform } from 'react-native';
import { Text, ListItem, Body, Left, Right } from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class WeaponSelectedScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      loading: true,
    };
    const query = `SELECT A.*, B.name as name, B.rarity
    FROM ${this.props.table} as A
    JOIN items AS B ON A.item_id = B.item_id
    WHERE A.type = ?`;
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const weapons = [];
      tx.executeSql(query, [this.props.type], (tx, results) => {
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          weapons.push(results.rows.item(i));
        }
        console.log(weapons);
        this.setState({
          loading: false,
          weapons,
        });
        console.log(this.props);
        console.log(this.state);
      });
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id: item.item_id,
            type: 'weapons',
            table: this.props.table,
            tableType: this.props.type,
            item,
          },
          animationType: 'fade',
          title: item.name,
        })}
        >
      <Left>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      <Right>
      </Right>
      </ListItem>
    );
  }

  renderSelectList() {
    return (
      <FlatList
        data={this.state.weapons}
        keyExtractor={item => item.item_id.toString()}
        renderItem={this.renderListItems}
      />
    );
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {this.renderSelectList()}
      </ScrollView>
    );
  }
}
