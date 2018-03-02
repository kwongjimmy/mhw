import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';

// import { Images, ElementStatusImages } from '../assets'

import MonsterInfo from '../components/MonsterInfo';
import MonsterLoot from '../components/MonsterLoot';
import MonsterEquip from '../components/MonsterEquip';
import MonsterQuest from '../components/MonsterQuest';

export default class MonsterInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monster_hit: [],
      monster_loot: [],
      monster_loot_high: [],
      monster_armor: [],
      monster_weapons: [],
      monster_quest: [],
      loading: true,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      const monster_hit = [];
      const monster_loot = [];
      const monster_loot_high = [];
      const monster_armor = [];
      const monster_weapons = [];
      const monster_quest = [];
      tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.monster_id], (tx, results) => {
        for (let i = 0; i < results.rows.length; i += 1) {
          const row = results.rows.item(i);
          monster_hit.push(row);
        }
        // this.setState({ monster_hit });
      });
      tx.executeSql(
        `SELECT
        loot.loot_id,
        loot.item_id,
        loot.category_id,
        cat.rank,
        cat.name,
        items.name as item_name,
        items.rarity,
        loot.quantity
        FROM monster_loot as loot
        INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
        INNER JOIN items as items ON loot.item_id = items.item_id
        WHERE loot.monster_id = ? AND cat.rank = 0`,
        [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_loot.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT
        loot.loot_id,
        loot.item_id,
        loot.category_id,
        cat.rank,
        cat.name,
        items.name as item_name,
        items.rarity,
        loot.quantity
        FROM monster_loot as loot
        INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
        INNER JOIN items as items ON loot.item_id = items.item_id
        WHERE loot.monster_id = ? AND cat.rank = 1`,
        [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_loot_high.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT
          C.name, C.item_id,
          D.slot1, D.slot2, D.slot3,
          E1.level as skill1_level, E1S.name as skill1_name,
          E2.level as skill2_level, E2S.name as skill2_name
          FROM monster_loot as A
          JOIN monster_loot_categories as B on A.category_id = B.category_id
          JOIN items as C ON A.item_id = C.item_id
      	  JOIN armor as D ON A.item_id = D.item_id
      	  LEFT JOIN armor_skills_levels as E1 ON D.skill1 = E1.armor_skill_level_id
      		LEFT JOIN armor_skills_levels as E2 ON D.skill2 = E2.armor_skill_level_id
      		LEFT JOIN armor_skills as E1S ON E1S.armor_skill_id = E1.armor_skill_id
      		LEFT JOIN armor_skills as E2S ON E2S.armor_skill_id = E2.armor_skill_id
      		WHERE A.monster_id = ? AND B.category_id = 56`,
        [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_armor.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT C.name, C.item_id FROM monster_loot as A
        JOIN monster_loot_categories as B on A.category_id = B.category_id
        JOIN items as C ON A.item_id = C.item_id
        WHERE A.monster_id = ? AND B.category_id = 55`,
        [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_weapons.push(row);
          }
        // this.setState({ monster_weapons });
        },
      );
      tx.executeSql(
        `SELECT A.quest_id, B.name as quest_name, B.required_rank, B.type
        FROM quest_monsters as A
        JOIN quests as B ON A.quest_id = B.quest_id
        where A.monster_id = ?`,
        [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_quest.push(row);
          }
          this.setState({
            monster_hit,
            monster_loot,
            monster_loot_high,
            monster_armor,
            monster_weapons,
            monster_quest,
            loading: false,
          });
          console.log(this.state);
          db.close();
        },
      );
    });
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return <MonsterInfo navigator={this.props.navigator} monster_hit={this.state.monster_hit}/>;
    } else if (screen === 'tab2') {
      return <MonsterLoot navigator={this.props.navigator} monster_loot={this.state.monster_loot}/>;
    } else if (screen === 'tab3') {
      return <MonsterLoot navigator={this.props.navigator} monster_loot={this.state.monster_loot_high}/>;
    } else if (screen === 'tab4') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_armor} type={'armor'}/>;
    } else if (screen === 'tab5') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_weapons} type={'weapon'}/>;
    }
    return (
      <MonsterQuest navigator={this.props.navigator} monster_quest={this.state.monster_quest}/>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
         <Tabs
           tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }}
           initialPage={0}
           renderTabBar={() => <ScrollableTab style={{ elevation: 2 }}/>}
           >
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
             heading="LR Loot"
             >
             {this.renderContent('tab2')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="HR Loot"
             >
             {this.renderContent('tab3')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Armor"
             >
             {this.renderContent('tab4')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Weapon"
             >
             {this.renderContent('tab5')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: 'white' }}
             tabStyle={{ backgroundColor: 'white' }}
             activeTextStyle={{ color: '#191919', fontWeight: '100' }}
             textStyle={{ color: '#5e5e5e' }}
             heading="Quest"
             >
             {this.renderContent('tab6')}
           </Tab>
         </Tabs>
      </Container>
    );
  }
}
