import React, { PureComponent } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

export default class ToolInfo extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loading: true,
      info: {},
      materials: [],
      quest: null,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let quest = null;
      tx.executeSql(
        `SELECT * from quests WHERE quest_id = ?`
        , [this.props.item.quest_id], (tx, results) => {
          quest = results.rows.item(0);
          this.setState({
            loading: false, quest,
          });
        },
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

  renderQuest() {
    if (this.props.item.quest_id !== null) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>Quest</Text>
            </Left>
          </ListItem>
          <ListItem
            style={{ height: 65, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              type: 'quests',
              quest_id: this.state.quest.quest_id,
            },
            animationType: 'slide-horizontal',
            title: this.state.quest.name,
          })}>
            <Left>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{this.state.quest.name}</Text>
            </Left>
            <Right style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 14.5, color: colors.secondary, textAlign: 'right' }}>{this.state.quest.type.replace('Assignment', '')}</Text>
              <Text style={{ fontSize: 14.5, color: colors.secondary, textAlign: 'right' }}>{`${this.state.quest.required_rank} \u2605`}</Text>
            </Right>
          </ListItem>
        </View>
      );
    }
    return null;
  }

  renderInfo() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>Duration</Text>
          </Body>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>Cooldown</Text>
          </Body>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.props.item.duration}</Text>
          </Body>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.props.item.recharge}</Text>
          </Body>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>Effect</Text>
          </Left>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>{this.props.item.effects}</Text>
          </Left>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>How to Obtain</Text>
          </Left>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>{this.props.item.description}</Text>
          </Left>
        </ListItem>
      </View>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {this.renderInfo()}
          {this.renderQuest()}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
