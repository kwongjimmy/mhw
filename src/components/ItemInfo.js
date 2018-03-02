import React, { PureComponent } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Content, Text, Left, Body, Right, List, ListItem, Tab, Tabs } from 'native-base';
import ItemInfoEquip from './ItemInfoEquip';
import ItemInfoQuest from './ItemInfoQuest';
import ItemInfoLoot from './ItemInfoLoot';

export default class ItemInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      itemArmor: [],
      itemWeapons: [],
      itemMapLoot: [],
      itemMonsterLoot: [],
      itemQuest: [],
      loading: true,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let item = {};
      const itemEquips = [];
      const itemArmor = [];
      const itemWeapons = [];
      const itemMapLoot = [];
      const itemMonsterLoot = [];
      const itemQuest = [];

      tx.executeSql('SELECT * FROM items WHERE item_id=?', [this.props.item_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        item = results.rows.item(0);
      });
      tx.executeSql(
        `SELECT A.name as name, B.* from items as A
          JOIN (SELECT B.item_id, quantity from items AS A JOIN crafting as B ON A.item_id = B.item_material_id WHERE A.item_id = ?) as B
          ON A.item_id = B.item_id
          WHERE A.category = 'armor'
        `
        , [this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemArmor.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT A.name as name, B.* from items as A
          JOIN (SELECT B.item_id, quantity from items AS A JOIN crafting as B ON A.item_id = B.item_material_id WHERE A.item_id = ?) as B
          ON A.item_id = B.item_id
          WHERE A.category = 'weapon'
        `
        , [this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemWeapons.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT B.map_id, B.item_id, B.area, B.rank, C.name FROM items as A
          JOIN map_items AS B ON A.item_id = B.item_id
          JOIN maps as C ON B.map_id = C.map_id WHERE A.item_id = ? ORDER BY B.map_id, B.rank DESC`
        , [this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemMapLoot.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT A.monster_id as monster_id, A.monster_name as monster_name, B.name as name, B.quantity as quantity, B.item_id as item_id, B.rank as rank from monster as A
          JOIN (SELECT * from monster_loot as A JOIN monster_loot_categories as B ON A.category_id = B.category_id WHERE A.item_id = ?) as B
          ON A.monster_id = B.monster_id`
        , [this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemMonsterLoot.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT * FROM
        (SELECT A.*, B.item_id FROM quests as A JOIN quest_items AS B ON A.quest_id = B.quest_id WHERE B.item_id = 4) as B
        WHERE B.item_id = ?
        UNION
        SELECT *
        FROM (SELECT D.*, A.item_id FROM monster_loot as A
        JOIN monster as B ON A.monster_id = B.monster_id
        JOIN quest_monsters as C ON A.monster_id = C.monster_id
        JOIN quests as D ON C.quest_id = D.quest_id) AS B
        WHERE B.item_id = ?`
        , [this.props.item_id, this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemQuest.push(row);
          }
          this.setState({
            item, itemArmor, itemWeapons, itemMapLoot, itemMonsterLoot, itemQuest, loading: false,
          });
          console.log(this.state);
        },
      );
    });
  }

  renderInfo() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0, borderColor: 'red' }} itemDivider>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>Buy</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>Sell</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>Carry</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>Rarity</Text>
              </View>
            </ListItem>
            <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.buy_price}z`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${this.state.item.sell_price}z`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.carry}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{this.state.item.rarity}</Text>
              </View>
            </ListItem>
          </List>
        </Content>
      </Container>
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
      return this.renderInfo();
    } else if (screen === 'tab2') {
      return (
        <ItemInfoLoot
          navigator={this.props.navigator}
          mapLoot={this.state.itemMapLoot}
          monsterLoot={this.state.itemMonsterLoot}
        />
      );
    } else if (screen === 'tab3') {
      return (
        <ItemInfoEquip navigator={this.props.navigator} armor={this.state.itemArmor} weapons={this.state.itemWeapons}/>
      );
    }
    return (
      <ItemInfoQuest navigator={this.props.navigator} items={this.state.itemQuest}/>
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
             heading="Info"
             >
             {this.renderContent('tab1')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Loot"
             >
             {this.renderContent('tab2')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Equip"
             >
             {this.renderContent('tab3')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Quest"
             >
             {this.renderContent('tab4')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
