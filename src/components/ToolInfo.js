import React, { PureComponent } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

class ToolInfo extends PureComponent {
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
          <ListItem
            style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
          >
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Quest</Text>
            </Left>
          </ListItem>
          <ListItem
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{this.state.quest.name}</Text>
            </Left>
            <Right style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 14.5, color: this.props.theme.secondary, textAlign: 'right' }}>{this.state.quest.type.replace('Assignment', '')}</Text>
              <Text style={{ fontSize: 14.5, color: this.props.theme.secondary, textAlign: 'right' }}>{`${this.state.quest.required_rank} \u2605`}</Text>
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
        <ListItem
          style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
        >
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Duration</Text>
          </Body>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Cooldown</Text>
          </Body>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
        >
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{this.props.item.duration}</Text>
          </Body>
          <Body style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{this.props.item.recharge}</Text>
          </Body>
        </ListItem>
        <ListItem
          style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
        >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Effect</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
        >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{this.props.item.effects}</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
        >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>How to Obtain</Text>
          </Left>
        </ListItem>
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
        >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{this.props.item.description}</Text>
          </Left>
        </ListItem>
      </View>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
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

const styles = StyleSheet.create({
  listHeader: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(ToolInfo);
