import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, ListItem, Text, Left, Body, Right } from 'native-base';

export default class SkillEquip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      armor: [],
      charms: [],
      decorations: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let armor = [];
      let charms = [];
      let decorations = [];
      tx.executeSql(
        `SELECT
          A.item_id as item_id, A.rank as rank,
          A.slot1, A.slot2, A.slot3,
          C.name,
          B1.level as level
          FROM armor AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.skill1 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?
          UNION
          SELECT
          A.item_id as item_id, A.rank as rank,
          A.slot1, A.slot2, A.slot3,
          C.name,
          B1.level as level
          FROM armor as A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.skill2 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?`
        , [this.props.armor_skill_id, this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            armor.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT
          A.item_id as item_id,
          C.name,
          B1.level as level
          FROM charms AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.armor_skill_1 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?
          UNION
          SELECT
          A.item_id as item_id,
          C.name,
          B1.level as level
          FROM charms AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.armor_skill_2 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?`
        , [this.props.armor_skill_id, this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            charms.push(row);
          }
          this.setState({
            armor,
            charms,
            loading: false,
          });
          console.log(this.state);
        },
      );
    });
  }

  renderArmor() {
    if (this.state.armor.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Armor</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          {this.state.armor.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={{ marginLeft: 0, paddingLeft: 8 }}
                onPress={() => this.props.navigator.push({
                screen: 'TablessInfoScreen',
                passProps: {
                  item_id: item.item_id,
                  type: 'armor',
                },
                animationType: 'fade',
                title: item.name
                })}>
                <Left>
                  <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                </Left>
                <Right>
                  <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`+${item.level}`}</Text>
                </Right>
              </ListItem>
            );
          })}
        </View>
      );
    }
    return (
      null
    );
  }

  renderCharms() {
    if (this.state.charms.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Charms</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          {this.state.charms.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={{ marginLeft: 0, paddingLeft: 8 }}
                onPress={() => this.props.navigator.push({
                screen: 'TablessInfoScreen',
                passProps: {
                  item_id: item.item_id,
                  type: 'charms',
                },
                animationType: 'fade',
                title: item.name
                })}
                >
                <Left>
                  <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                </Left>
                <Right>
                  <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`+${item.level}`}</Text>
                </Right>
              </ListItem>
            );
          })}
        </View>
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderArmor()}
        {this.renderCharms()}
        {/* {this.renderDecorations()} */}
      </ScrollView>
    );
  }
}
