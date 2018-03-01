import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Tabs, Tab, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class EquipArmorInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      materials: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let materials = [];
      let info = {};
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
          this.setState({ info, materials, loading: false });
          console.log(this.state);
        }
      );
    });
  }

  renderInfo() {
    const {
      buy_price, min_def, rarity, slot1, slot2, slot3,
    } = this.state.info;
    let slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    let slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    let slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;
    return (
      <View>
        <ListItem style={{ marginLeft: 0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Defense</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Price</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{min_def}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${buy_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
      </View>
    );
  }

  renderSkills() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Skill</Text>
        </ListItem>
      </View>
    );
  }

  renderCrafting() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Material</Text>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
          </Right>
        </ListItem>
        {this.state.materials.map((item, key) => {
          return (
            <View key={key}>
              <ListItem style={{ marginLeft: 0, backgroundColor: 'white', paddingLeft: 18 }}
                onPress={() => this.props.navigator.push({
                  screen: 'ItemInfoScreen',
                  passProps: {
                    item_id: item.item_id,
                    category: 'item',
                  },
                  animationType: 'fade',
                  title: item.name,
                })}
                >
                <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
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
      {this.renderInfo()}
      {this.renderCrafting()}
      {this.renderSkills()}
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
