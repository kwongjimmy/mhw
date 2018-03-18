import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';

export default class DecorationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      feystones: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);

    db.transaction((tx) => {
      let info = {};
      let feystones = [];

      tx.executeSql(
        `SELECT	*
          FROM items
          WHERE name LIKE '%Feystone'`
        , [], (tx, results) => {
          const len =results.rows.length;
          for (let i = 0; i < len; i += 1) {
            feystones.push(results.rows.item(i));
          }
        }
      );

      tx.executeSql(
        `SELECT A.*, B.armor_skill_id as armor_skill_id, B.name as name, C.level as level
          FROM decorations AS A
          JOIN armor_skills_levels AS C ON A.skill = C.armor_skill_level_id
          LEFT JOIN armor_skills AS B ON C.armor_skill_id = B.armor_skill_id
          WHERE A.item_id=?`
        , [this.props.item_id], (tx, results) => {
          info = results.rows.item(0);
          this.setState({
            info, feystones, loading: false
          });
        }
      );


    });

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
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
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              armor_skill_id: this.state.info.armor_skill_id,
              type: 'skill',
            },
            animationType: 'slide-horizontal',
            title: this.state.info.name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{this.state.info.name}</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>+{this.state.info.level}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  renderFeystones() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Feystone</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Drop%</Text>
          </Right>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: this.state.feystones[1].item_id,
              type: 'item',
            },
            animationType: 'slide-horizontal',
            title: this.state.feystones[1].name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Mysterious Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.mysterious}%</Text>
          </Right>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: this.state.feystones[0].item_id,
              type: 'item',
            },
            animationType: 'slide-horizontal',
            title: this.state.feystones[0].name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Glowing Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.glowing}%</Text>
          </Right>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: this.state.feystones[3].item_id,
              type: 'item',
            },
            animationType: 'slide-horizontal',
            title: this.state.feystones[3].name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Worn Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.worn}%</Text>
          </Right>
        </ListItem>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: this.state.feystones[2].item_id,
              type: 'item',
            },
            animationType: 'slide-horizontal',
            title: this.state.feystones[2].name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Warped Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.warped}%</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {this.renderSkills()}
          {this.renderFeystones()}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
