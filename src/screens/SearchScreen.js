import React, { Component } from 'react';
<<<<<<< HEAD
import { FlatList, View, ActivityIndicator, Platform, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab,Header,Button, Icon, Tabs, Title,Right,Item,Input, ListItem, Text, Left, Body } from 'native-base';
import SearchList from '../components/SearchList';

export default class SearchScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
};
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
  searchMatchingWords(keyWord) {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
    });
    if(keyWord.length > 0) {
      db.transaction((tx) => {
        const allMonsters = [];
        const smallMonsters = [];
        const largeMonsters = [];
      db.executeSql("SELECT * FROM `monster`  WHERE `monster_name` LIKE '"+keyWord+"%' ORDER BY  `monster_name` ASC LIMIT 0, 30", [], (tx, results) => {
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              allMonsters.push(results.rows.item(i));
            }
            this.setState({
              data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false,
            });
          });
      });
    }
  }

  

  componentDidMount() {

=======
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';

export default class SearchScreen extends Component {
  static navigatorStyle = {
    topBarBorderColor: 'red',
    topBarBorderWidth: 20,
  };

  componentWillMount() {
  }

  componentDidMount() {
>>>>>>> 7b6fcaf551db8de5075a13cdf55ec60257d842bd
  }

  componentWillUnmount() {
    // db.close();
  }

<<<<<<< HEAD
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
        // <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
        //   <ActivityIndicator size="large" color="#5e5e5e"/>
        // </View>
        <FlatList
          data={this.state.skeletonData}
          keyExtractor={(item) => item.monster_id.toString()}
          renderItem={({ item }) => {
            return (
              <ListItem style={{ marginLeft: 0, paddingLeft: 18 }}>
              <Left>
                {/* <Image
                  resizeMode="contain"
                  style={styles.monsterImage2}
                  source={src}
                /> */}
                <View style={{ height: 60, width: 60, backgroundColor: '#f0f0f0' }}/>
              </Left>
              <Body style={{ flex: 4 }}>
                <View style= {{ height: 12, width: 180, backgroundColor: '#e6e6e6', marginBottom: 6, marginLeft: 12 }}/>
                <View style= {{ height: 11, width: 90, backgroundColor: '#f0f0f0', marginTop: 6, marginLeft: 12 }}/>
              </Body>
              </ListItem>
            );
          }}
        />
      );
    }
    if (screen === 'all') {
      return (
        <SearchList navigator={this.props.navigator} monsters={this.state.allMonsters} type={'all'}/>
      );
    } else if (screen === 'large') {
      return (
        <SearchList navigator={this.props.navigator} monsters={this.state.largeMonsters} type={'large'}/>
      );
    }
    return (
      <SearchList navigator={this.props.navigator} monsters={this.state.smallMonsters} type={'small'}/>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Header
          style={{ backgroundColor: 'white' }}

          searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" onChangeText={(text) => this.searchMatchingWords(text)}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Monster"
           >
           {this.renderContent('all')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Armor"
           >
           {this.renderContent('large')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Weapon"
           >
           {this.renderContent('small')}
         </Tab>
       </Tabs>
      </Container>
=======
  render() {
    return (
      <Text>Hey</Text>
>>>>>>> 7b6fcaf551db8de5075a13cdf55ec60257d842bd
    );
  }
}
