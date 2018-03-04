import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class WeaponInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: this.props.item,
      craftMaterials: [],
      upgradeMaterials: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let craftMaterials = [];
      let upgradeMaterials = [];
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM ${this.props.table} as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN crafting AS C ON A.item_id = C.item_id
        JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            craftMaterials.push(results.rows.item(i));
          }
        },
      );
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM ${this.props.table} as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN weapon_upgrade_items AS C ON A.item_id = C.item_id
        JOIN items as D ON C.material_item_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            upgradeMaterials.push(results.rows.item(i));
          }
          this.setState({
            craftMaterials, upgradeMaterials, loading: false,
          });
          console.log(this.props);
          console.log(this.state);
        },
      );
    });
  }

  renderInfo(info) {
    const {
      damage, true_damage, req_armor_skill, element_amount, element_type, defense, affinity, rarity, slot1, slot2, slot3, red, orange, yellow, green, blue, white, black
    } = info;
    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Attack</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Sharpness</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${damage}`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: red, height: 10, backgroundColor: 'red' }}/>
            <View style={{ flex: orange, height: 10, backgroundColor: 'orange' }}/>
            <View style={{ flex: yellow, height: 10, backgroundColor: 'yellow' }}/>
            <View style={{ flex: green, height: 10, backgroundColor: 'green' }}/>
            <View style={{ flex: blue, height: 10, backgroundColor: 'blue' }}/>
            <View style={{ flex: white, height: 10, backgroundColor: 'white' }}/>
            <View style={{ flex: black, height: 10, backgroundColor: 'black' }}/>
          </View>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
      </View>
    );
  }

  renderCrafting() {
    if (this.state.craftMaterials.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Craft Material</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
            </Right>
          </ListItem>
          {this.state.craftMaterials.map((item, key) => {
            return (
              <View key={key}>
                <ListItem style={{ marginLeft: 0, backgroundColor: 'white', paddingLeft: 8 }}
                  onPress={() => this.props.navigator.push({
                    screen: 'TabInfoScreen',
                    passProps: {
                      item_id: item.item_id,
                      type: 'item',
                    },
                    animationType: 'fade',
                    title: item.name,
                  })}
                  >
                  <Left>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
                  </Right>
                </ListItem>
              </View>
            );
          })
          }
        </View>
      );
    }
    return (
      null
    );
  }

  renderUpgrading() {
    if (this.state.upgradeMaterials.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Upgrade Material</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
            </Right>
          </ListItem>
          {this.state.upgradeMaterials.map((item, key) => {
            return (
              <View key={key}>
                <ListItem style={{ marginLeft: 0, backgroundColor: 'white', paddingLeft: 8 }}
                  onPress={() => this.props.navigator.push({
                    screen: 'TabInfoScreen',
                    passProps: {
                      item_id: item.item_id,
                      type: 'item',
                    },
                    animationType: 'fade',
                    title: item.name,
                  })}
                  >
                  <Left>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
                  </Right>
                </ListItem>
              </View>
            );
          })
          }
        </View>
      );
    }
    return (
      null
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
    <View>
      {this.renderInfo(this.state.info)}
      {this.renderUpgrading()}
      {this.renderCrafting()}
    </View>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderContent()}
      </Container>
    );
  }
}
