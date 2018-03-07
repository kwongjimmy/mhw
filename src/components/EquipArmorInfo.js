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
      skills: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let materials = [];
      let info = {};
      let skills = [];
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
      tx.executeSql(
        `SELECT
          B.armor_skill_id as skill1_id, B.level as skill1_level, B1.name as skill1_name,
          C.armor_skill_id as skill2_id, C.level as skill2_level, C1.name as skill2_name
          FROM armor as A
          LEFT JOIN armor_skills_levels AS B ON A.skill1 = B.armor_skill_level_id
          LEFT JOIN armor_skills_levels AS C ON A.skill2 = C.armor_skill_level_id
          LEFT JOIN armor_skills AS B1 ON B.armor_skill_id = B1.armor_skill_id
          LEFT JOIN armor_skills AS C1 ON C.armor_skill_id = C1.armor_skill_id
          WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            skills.push(results.rows.item(i));
          }
          this.setState({
            info, materials, skills, loading: false
          });
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
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0, borderColor: 'red' }} itemDivider>
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

  renderSkill2() {
    if (this.state.skills[0].skill2_name !== null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              armor_skill_id: this.state.skills[0].skill2_id,
              type: 'skill',
            },
            animationType: 'fade',
            title: this.state.skills[0].skill2_name,
          })}
          >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{this.state.skills[0].skill2_name}</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`+${this.state.skills[0].skill2_level}`}</Text>
          </Right>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderSkill1() {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.state.skills[0].skill1_id,
            type: 'skill',
          },
          animationType: 'fade',
          title: this.state.skills[0].skill1_name,
        })}
        >
        <Left>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{this.state.skills[0].skill1_name}</Text>
        </Left>
        <Right>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`+${this.state.skills[0].skill1_level}`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderSkills() {
    if (this.state.skills[0].skill1_name !== null) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Skill</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}></Text>
            </Right>
          </ListItem>
          {this.renderSkill1()}
          {this.renderSkill2()}
        </View>
      );
    }
    return (
      null
    );
  }

  renderCrafting() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Material</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
          </Right>
        </ListItem>
        {this.state.materials.map((item, key) => {
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
      {this.renderSkills()}
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
