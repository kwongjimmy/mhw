import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Left, Right, Body } from 'native-base';

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
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
				passProps: {
          type: 'quests',
					quest_id: item.quest_id,
				},
        animationType: 'fade',
        title: item.name,
      })}
      >
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
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
