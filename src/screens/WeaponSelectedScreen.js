import React, { Component } from 'react';
import { Text, Image, FlatList, Platform } from 'react-native';
import { Container, ListItem, Body, Left } from 'native-base';
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
      weaponTypes: [{
        'Great Sword': 'great_sword',
        'Long Sword': 'long_sword',
        'Sword and Shield': 'sword_and_shield',
        'Hammer': 'hammer',
        'Lance': 'lance',
        'Gunlance:': 'gunlance',
        'Charge Blade': 'charge_blade',
        'Dual Blades': 'dual_blade',
        'Hunting Horn': 'hunting_horn',
        'Insect Glaive': 'insect_glaive',
        'Switch Axe': 'switch_axe',
        'Bow': 'bow',
        'Light Bowgun': 'light_bowgun',
        'Heavy Bowgun': 'heavy_bowgun',
        //CREATE OBJECTS WITH query name
      }],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      const weapons = [];
      if (this.props.type === 'Dual Blades') {
        tx.executeSql(
          `SELECT D.item_id, D.name, C.quantity
          FROM armor as A
          JOIN items AS B ON A.item_id = B.item_id
          JOIN crafting AS C ON A.item_id = C.item_id
          JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
          , [this.props.item_id], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              weapons.push(results.rows.item(i));
            }
          },
        );
      } else if (this.props.type === 'Charge Blade') {

      }
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.weaponSelectList.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18 }}>
      <Left>
      </Left>
      <Body style={{ flex: 5 }}>
        <Text style={{ fontSize: 20, color: '#191919'}}>{item.name}</Text>
      </Body>
      </ListItem>
    );
  }

  renderSelectList() {
    return (
      <FlatList
        data={this.state.weapons}
        keyExtractor={(item) => item}
        renderItem={this.renderListItems}
        ref={(ref) => { this.weaponSelectList = ref; }}
      />
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderSelectList()}
      </Container>
    );
  }
}
