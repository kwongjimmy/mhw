import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';
import SkillEquip from './SkillEquip';

export default class SkillInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      levels: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let info = {};
      let levels = [];

      tx.executeSql(
        'SELECT * FROM armor_skills WHERE armor_skill_id=?'
        , [this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          info = results.rows.item(0);
        });

      tx.executeSql(
        `SELECT B.level as level, B.armor_skill_level_id as level_id, B.description as description
          from armor_skills as A
          join armor_skills_levels as B on A.armor_skill_id = B.armor_skill_id
          WHERE A.armor_skill_id = ?`
        , [this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            levels.push(row);
          }
          this.setState({
            info,
            levels,
            loading: false,
          });
          console.log(this.state);
        },
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

  renderLevels() {
    return this.state.levels.map((item, key) => {
      return (
        <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 8 }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`Lv ${item.level}`}</Text>
          </Left>
          <Body>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.description}</Text>
          </Body>
        </ListItem>
      );
    });
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'Info') {
      return (
        <ScrollView>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>Description</Text>
            </Left>
          </ListItem>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{this.state.info.description}</Text>
            </Left>
          </ListItem>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>Level</Text>
            </Left>
            <Body>
            <Text></Text>
            </Body>
          </ListItem>
          {this.renderLevels()}
        </ScrollView>
      );
    }
    return (
      <SkillEquip navigator={this.props.navigator} armor_skill_id={this.props.armor_skill_id}/>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Info"
           >
           {this.renderContent('Info')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Equip"
           >
           {this.renderContent('Equip')}
         </Tab>
       </Tabs>
      </Container>
    );
  }
}
