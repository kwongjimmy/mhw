import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';

export default class QuestScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: false,
    navBarBackgroundColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      loading: true,
      assigned: [],
      optional: [],
      arena: [],
    };
  }

  componentWillMount() {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const assigned = [];
      const optional = [];
      const arena = [];
      tx.executeSql('SELECT * FROM quests WHERE type=?', ['Assigned'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          assigned.push(row);
        }
      });
      tx.executeSql('SELECT * FROM quests WHERE type=?', ['Optional'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          optional.push(row);
        }
      });
      tx.executeSql('SELECT * FROM quests WHERE type=?', ['Arena'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          arena.push(row);
        }
        this.setState({
          assigned, optional, arena, loading: false,
        });
        console.log(this.state);
        db.close();
      });
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return (
        <FlatList
          data={this.state.assigned}
          keyExtractor={(item) => item.quest_id.toString()}
          renderItem={this.renderListItems}
        />
      );
    } else if (screen === 'tab2') {
      return (
        <FlatList
          data={this.state.optional}
          keyExtractor={(item) => item.quest_id.toString()}
          renderItem={this.renderListItems}
        />
      );
    }
    return (
      <FlatList
        data={this.state.arena}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
      />
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
             heading="Assigned"
             >
             {this.renderContent('tab1')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Optional"
             >
             {this.renderContent('tab2')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Arena"
             >
             {this.renderContent('tab3')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
