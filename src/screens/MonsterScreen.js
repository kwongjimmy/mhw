import React, { PureComponent } from 'react';
import { FlatList, View, ActivityIndicator, Platform, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';
import MonsterList from '../components/MonsterList';
// import SplashScreen from 'react-native-splash-screen';
export default class MonsterScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      allMonsters: [],
      smallMonsters: [],
      largeMonsters: [],
      loading: true,
      data: [],
    };
  }

  okCallback(msg) {
    console.log(`okCallback: ${msg}`);
    setTimeout(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
      });
      db.transaction((tx) => {
        const allMonsters = [];
        const smallMonsters = [];
        const largeMonsters = [];
        tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
            // this.setState({record: row});
          }
          // this.setState({ allMonsters });
          // db.close();
        });
        tx.executeSql('SELECT * FROM monster WHERE size=?', ['Small'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            smallMonsters.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster WHERE size=?', ['Large'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            largeMonsters.push(row);
          }
          this.setState({
            data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false,
          });
        });
      });
    }, 100);
  }

  errorCallback(msg) {
    console.log(`okCallback: ${msg}`);
    setTimeout(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
      });
      db.transaction((tx) => {
        const allMonsters = [];
        const smallMonsters = [];
        const largeMonsters = [];
        tx.executeSql('SELECT * FROM monster', [], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
            // this.setState({record: row});
          }
          // this.setState({ allMonsters });
          // db.close();
        });
        tx.executeSql('SELECT * FROM monster WHERE size=?', ['Small'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            smallMonsters.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster WHERE size=?', ['Large'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            largeMonsters.push(row);
          }
          this.setState({
            data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false,
          });
        });
      });
    }, 150);
  }

  componentDidMount() {
    // SplashScreen.hide();
  }

  componentWillUnmount() {
    // db.close();
  }

  okCallback2(msg) {
    console.log(msg);
  }
  errorCallback2(msg) {
    console.log(msg);
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      // DELETE FROM IOS
      SQLite.deleteDatabase(
        { name: 'mhworld.db', location: 'Default' },
        this.okCallback.bind(this), this.errorCallback.bind(this),
      );
    } else {
      // DELETE FROM ANDROID
      SQLite.deleteDatabase(
        { name: 'mhworld.db', location: '~mhworld.db' },
        this.okCallback.bind(this), this.errorCallback.bind(this),
      );
    }
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'all') {
      return (
        <MonsterList navigator={this.props.navigator} monsters={this.state.allMonsters} type={'all'}/>
      );
    } else if (screen === 'large') {
      return (
        <MonsterList navigator={this.props.navigator} monsters={this.state.largeMonsters} type={'large'}/>
      );
    }
    return (
      <MonsterList navigator={this.props.navigator} monsters={this.state.smallMonsters} type={'small'}/>
    );
  }

  render() {
    return (
      <Tabs
        prerenderingSiblingsNumber={0}
        scrollWithoutAnimation={false}
        tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }}
        initialPage={0}>
       <Tab
         activeTabStyle={{ backgroundColor: 'white' }}
         tabStyle={{ backgroundColor: 'white' }}
         activeTextStyle={{ color: '#191919', fontWeight: '100' }}
         textStyle={{ color: '#5e5e5e' }}
         heading="All"
         >
         {this.renderContent('all')}
       </Tab>
       <Tab
         activeTabStyle={{ backgroundColor: 'white' }}
         tabStyle={{ backgroundColor: 'white' }}
         activeTextStyle={{ color: '#191919', fontWeight: '100' }}
         textStyle={{ color: '#5e5e5e' }}
         heading="Large"
         >
         {this.renderContent('large')}
       </Tab>
       <Tab
         activeTabStyle={{ backgroundColor: 'white' }}
         tabStyle={{ backgroundColor: 'white' }}
         activeTextStyle={{ color: '#191919', fontWeight: '100' }}
         textStyle={{ color: '#5e5e5e' }}
         heading="Small"
         >
         {this.renderContent('small')}
       </Tab>
     </Tabs>
    );
  }
}
