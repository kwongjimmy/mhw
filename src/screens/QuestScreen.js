import React, { PureComponent } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ScrollableTab, Container, Tab, Tabs, ListItem, Left, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

class QuestScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: false,
    navBarbackgroundColor: colors.background,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assigned: [],
      optional: [],
      arena: [],
      special: [],
      event: [],
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
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
      const event = [];
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
      tx.executeSql('SELECT * FROM quests WHERE type=? ORDER BY required_rank ASC', ['Event'], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        const len = results.rows.length;
        for (let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          event.push(row);
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
          assigned, optional, arena, special, event, loading: false,
        });
        // db.close();
      });
    });
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItemHeader }]}
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
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: this.props.theme.secondary }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ backgroundColor: this.props.theme.background }}
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
        <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
          <FlatList
            style={{ backgroundColor: this.props.theme.background }}
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
        <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
          <FlatList
            style={{ backgroundColor: this.props.theme.background }}
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
    } else if (screen === 'tab4') {
      return (
        <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
          <FlatList
            style={{ backgroundColor: this.props.theme.background }}
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
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <FlatList
          style={{ backgroundColor: this.props.theme.background }}
          initialNumToRender={11}
          data={this.state.event}
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
          tabBarUnderlineStyle={{ backgroundColor: this.props.theme.accent, height: 3 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTab style={{ borderWidth: 0, backgroundColor: colors.background, elevation: 2 }}/>}
          >
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Assigned"
            >
            {this.renderContent('tab1')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Optional"
            >
            {this.renderContent('tab2')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Arena"
            >
            {this.renderContent('tab3')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Special Assignment"
            >
            {this.renderContent('tab4')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Event"
            >
            {this.renderContent('tab5')}
          </Tab>
        </Tabs>
        <AdBanner />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 55,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    height: 50,
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

export default connect(mapStateToProps, {})(QuestScreen);
