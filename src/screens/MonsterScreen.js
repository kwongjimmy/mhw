import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Platform, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';
import MonsterList from '../components/MonsterList';

export default class MonsterScreen extends Component {
  constructor(props) {
    super(props)
    const skeletonData = [];
    for (let i = 0; i < 10; i += 1) {
      skeletonData.push({
        type: 'AAAAAAAA AAAAA',
        size: 'AAAAAA',
        monster_name: 'AAAAAAAAAAAA',
        monster_id: i,
      })
    }
    this.state = {
      allMonsters: [],
      smallMonsters: [],
      largeMonsters: [],
      loading: true,
      data: [],
      skeletonData,
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
          console.log(this.state);
        });
      });
    }, 500);
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
          console.log(this.state);
        });
      });
    }, 250);
  }

  componentDidMount() {

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
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
        // <FlatList
        //   data={this.state.skeletonData}
        //   keyExtractor={(item) => item.monster_id.toString()}
        //   renderItem={({ item }) => {
        //     return (
        //       <ListItem style={{ marginLeft: 0, paddingLeft: 18 }}>
        //       <Left>
        //         {/* <Image
        //           resizeMode="contain"
        //           style={styles.monsterImage2}
        //           source={src}
        //         /> */}
        //         <View style={{ height: 60, width: 60, backgroundColor: '#f0f0f0' }}/>
        //       </Left>
        //       <Body style={{ flex: 4 }}>
        //         <View style= {{ height: 12, width: 180, backgroundColor: '#e6e6e6', marginBottom: 6, marginLeft: 12 }}/>
        //         <View style= {{ height: 11, width: 90, backgroundColor: '#f0f0f0', marginTop: 6, marginLeft: 12 }}/>
        //       </Body>
        //       </ListItem>
        //     );
        //   }}
        // />
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
      <Container style={{ backgroundColor: 'white' }}>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
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
      </Container>
    );
  }
}
