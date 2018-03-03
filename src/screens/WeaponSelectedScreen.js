import React, { Component } from 'react';
import { Text, Image, FlatList, Platform } from 'react-native';
import { Container, ListItem, Body, Left } from 'native-base';

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
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    if (this.props.type === 'Great Sword' || this.props.type === 'Great Sword' || this.props.type === 'Great Sword') {

    }
    db.transaction((tx) => {
      let weapons = [];
      tx.executeSql('SELECT * FROM armor as A JOIN items AS B ON A.item_id = B.item_id WHERE A.item_id = ?', [this.props.item_id], (tx, results) => {
        info = results.rows.item(0);
      });
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM armor as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN crafting AS C ON A.item_id = C.item_id
        JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            materials.push(results.rows.item(i));
          }
        }
      );
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
