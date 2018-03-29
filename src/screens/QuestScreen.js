import React, { PureComponent } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ScrollableTab, Container, Tab, Tabs, ListItem, Left, Right, Body } from 'native-base';
import AdBanner from '../components/AdBanner';

export default class QuestScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: false,
    navBarBackgroundColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assigned: [],
      optional: [],
      arena: [],
      special: [],
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      // console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
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
      const special = [];
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
      tx.executeSql('SELECT * FROM quests WHERE type=?', ['Special Assignment'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          special.push(row);
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
          assigned, optional, arena, special, loading: false,
        });
        // db.close();
      });
    });
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, height: 60 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
				passProps: {
          type: 'quests',
					quest_id: item.quest_id,
				},
        animationType: 'slide-horizontal',
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
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return (
        <View style={{ flex: 1}}>
          <FlatList
            style={{ backgroundColor: 'white' }}
            initialNumToRender={11}
            data={this.state.assigned}
            keyExtractor={(item) => item.quest_id.toString()}
            renderItem={this.renderListItems}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      );
    } else if (screen === 'tab2') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            style={{ backgroundColor: 'white' }}
            initialNumToRender={11}
            data={this.state.optional}
            keyExtractor={(item) => item.quest_id.toString()}
            renderItem={this.renderListItems}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      );
    } else if (screen === 'tab3') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            style={{ backgroundColor: 'white' }}
            initialNumToRender={11}
            data={this.state.arena}
            keyExtractor={(item) => item.quest_id.toString()}
            renderItem={this.renderListItems}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          initialNumToRender={11}
          data={this.state.special}
          keyExtractor={(item) => item.quest_id.toString()}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 60, offset: 60 * index, index }
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Tabs
          prerenderingSiblingsNumber={3}
          tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: 'white', elevation: 2 }}/>}
          >
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919',  }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Assigned"
            >
            {this.renderContent('tab1')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919',  }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Optional"
            >
            {this.renderContent('tab2')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919',  }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Arena"
            >
            {this.renderContent('tab3')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919',  }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Special Assignment"
            >
            {this.renderContent('tab4')}
          </Tab>
        </Tabs>
        <AdBanner />
      </Container>
    );
  }
}
