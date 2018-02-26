import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text2 } from 'native-base';

// import MonsterInfo from './MonsterInfo'
import { Images, ElementStatusImages } from '../assets'

// Styles
import styles from './Styles/ItemInfoScreenStyles'

export default class ItemInfoScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      itemMapLoot: {},
      itemMonsterLoot: {},
      loading: true,
    };
    let db = SQLite.openDatabase({name: 'mhworld.db', createFromLocation : "~mhworld.db", location: 'Default'});
    db.transaction((tx) => {
      var item = [];
      tx.executeSql('SELECT * FROM items WHERE item_id=?', [this.props.item_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          this.setState({ item: row, loading: false });
        }
      });
    });
  }

  renderContent(screen) {
    if(this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    else {
      if(screen === 'tab1') {
        return (
          <ScrollView>
            <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Buy</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Sell</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Carry</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Rarity</Text>
              </View>
            </View>
            <View style={{ paddingTop: 7., flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.buy_price}z`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.sell_price}z`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.carry}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.rarity}</Text>
              </View>
            </View>
          </ScrollView>
        );
      } else if(screen === 'tab2') {
        return (
          <View>
            <Text>
              2
            </Text>
          </View>
        );
      } else if(screen === 'tab3') {
        return (
          <View>
            <Text>
              3
            </Text>
          </View>
        );
      }
      return (
        <View>
          <Text>
            4
          </Text>
        </View>
      );
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
         <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Info">
             {this.renderContent('tab1')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Loot">
             {this.renderContent('tab2')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Equip">
             {this.renderContent('tab3')}
           </Tab>
           <Tab activeTabStyle={{ backgroundColor: 'white' }} tabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#191919', fontWeight: '100', }} textStyle={{ color: '#5e5e5e' }} heading="Quest">
             {this.renderContent('tab4')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
