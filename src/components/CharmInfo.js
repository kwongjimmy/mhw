import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Tabs, Tab, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class CharmInfo extends Component {

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
      tx.executeSql(
        `SELECT
          A.*, B.*,
          CL1.name as skill1_name, C1.level as skill1_level, CL1.armor_skill_id as skill1_id,
          CL2.name as skill2_name, C2.level as skill2_level, CL2.armor_skill_id as skill2_id
          FROM charms AS A
          JOIN items AS B ON A.item_id = B.item_id
          LEFT JOIN armor_skills_levels AS C1 ON A.armor_skill_1 = C1.armor_skill_level_id
          LEFT JOIN armor_skills_levels AS C2 ON A.armor_skill_2 = C2.armor_skill_level_id
          LEFT JOIN armor_skills AS CL1 ON C1.armor_skill_id = CL1.armor_skill_id
          LEFT JOIN armor_skills AS CL2 ON C2.armor_skill_id = CL2.armor_skill_id
          WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          info = results.rows.item(0);
        }
      );
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM charms as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN crafting AS C ON A.item_id = C.item_id
        JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            materials.push(results.rows.item(i));
          }
          this.setState({ info, materials, loading: false });
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
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  renderInfo() {
    const {
      buy_price, sell_price, rarity,
    } = this.state.info;
    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0, borderColor: 'red' }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Buy</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Sell</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${buy_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${sell_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
      </View>
    );
  }

  renderSkillBody() {
    if (this.state.info.skill1_name !== null && this.state.info.skill2_name !== null) {
      return (
        <View>
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 8 }}
            onPress={() => this.props.navigator.push({
              screen: 'TabInfoScreen',
              passProps: {
                armor_skill_id: this.state.info.skill1_id,
                type: 'skill',
              },
              animationType: 'fade',
              title: this.state.info.skill1_name,
            })}
            >
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`${this.state.info.skill1_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`${this.state.info.skill1_level}`}</Text>
            </Right>
          </ListItem>
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 8 }}
            onPress={() => this.props.navigator.push({
              screen: 'TabInfoScreen',
              passProps: {
                armor_skill_id: this.state.info.skill2_id,
                type: 'skill',
              },
              animationType: 'fade',
              title: this.state.info.skill2_name,
            })}
            >
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`${this.state.info.skill2_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`${this.state.info.skill2_level}`}</Text>
            </Right>
          </ListItem>
      </View>
      );
    } else if (this.state.info.skill1_name !== null && this.state.info.skill2_name === null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              armor_skill_id: this.state.info.skill1_id,
              type: 'skill',
            },
            animationType: 'fade',
            title: this.state.info.skill1_name,
          })}
          >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`${this.state.info.skill1_name}`}</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{`+${this.state.info.skill1_level}`}</Text>
          </Right>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderSkills() {
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
        {this.renderSkillBody()}
      </View>
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
