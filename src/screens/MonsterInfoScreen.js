import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, InteractionManager } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import _ from 'lodash';
import MonsterInfo from '../components/MonsterInfo';
import MonsterWeakness from '../components/MonsterWeakness';
import MonsterLoot from '../components/MonsterLoot';
import MonsterEquip from '../components/MonsterEquip';
import MonsterQuest from '../components/MonsterQuest';
import AdBanner from '../components/AdBanner';

export default class MonsterInfoScreen extends PureComponent {
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
    InteractionManager.runAfterInteractions(() => {
      // let start = new Date().getTime();
      const db = SQLite.openDatabase({
        name: 'mhworld.db', location: 'Default',
      }, this.okCallback, this.errorCallback);
      db.transaction((tx) => {
        const monster_tool = [];
        const monster_ailment = [];
        const monster_hit = [];
        let monster_loot = [];
        let monster_loot_high = [];
        const monster_armor = [];
        const monster_weapons = [];
        const monster_quest = [];
        tx.executeSql('SELECT * FROM monster_hit WHERE monster_id = ?', [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_hit.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster_ailments where monster_id = ? ORDER BY element', [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_ailment.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster_tool_effectiveness where monster_id = ? ORDER BY tool', [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_tool.push(row);
          }
        });
        tx.executeSql(
          `SELECT
          loot.loot_id,
          loot.item_id,
          loot.category_id,
          loot.chance,
          cat.rank,
          cat.name,
          items.name as item_name,
          items.rarity,
          loot.quantity
          FROM monster_loot as loot
          INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
          INNER JOIN items as items ON loot.item_id = items.item_id
          WHERE loot.monster_id = ? AND cat.rank = 0
          ORDER BY cat.name`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_loot.push(row);
            }
            monster_loot = _.groupBy(monster_loot, loot => loot.name);
            monster_loot = _.values(monster_loot);
          },
        );
        tx.executeSql(
          `SELECT
          loot.loot_id,
          loot.item_id,
          loot.category_id,
          loot.chance,
          cat.rank,
          cat.name,
          items.name as item_name,
          items.rarity,
          loot.quantity
          FROM monster_loot as loot
          INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
          INNER JOIN items as items ON loot.item_id = items.item_id
          WHERE loot.monster_id = ? AND cat.rank = 1
          ORDER BY cat.name`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_loot_high.push(row);
            }
            monster_loot_high = _.groupBy(monster_loot_high, loot => loot.name);
            monster_loot_high = _.values(monster_loot_high);
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
        		WHERE A.monster_id = ? AND B.name = 'Armor'`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_armor.push(row);
            }
          },
        );
        tx.executeSql(
          `SELECT
          weapon_sharpness.*,
          weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
          D.*, C.name as name, C.rarity as rarity
          FROM monster_loot as A
          JOIN monster_loot_categories as B on A.category_id = B.category_id
          JOIN items as C ON A.item_id = C.item_id
          JOIN weapons as D ON C.item_id = D.item_id
          LEFT JOIN weapon_bowgun_chars ON D.item_id = weapon_bowgun_chars.item_id
          LEFT JOIN weapon_coatings ON D.item_id = weapon_coatings.item_id
          LEFT JOIN weapon_kinsects ON D.item_id = weapon_kinsects.item_id
          LEFT JOIN weapon_notes ON D.item_id = weapon_notes.item_id
          LEFT JOIN weapon_phials ON D.item_id = weapon_phials.item_id
          LEFT JOIN weapon_sharpness ON D.item_id = weapon_sharpness.item_id
          LEFT JOIN weapon_shellings ON D.item_id = weapon_shellings.item_id
          WHERE A.monster_id = ? AND B.name = 'Weapon'`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_weapons.push(row);
            }
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
              monster_tool,
              monster_ailment,
              monster_hit,
              monster_loot,
              monster_loot_high,
              monster_armor,
              monster_weapons,
              monster_quest,
              loading: false,
            });
            // let end = new Date().getTime();
            // console.log(end - start);
          },
        );
      });
    });
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return <MonsterWeakness navigator={this.props.navigator} monster_size={this.props.monster_info.size} monster_hit={this.state.monster_hit}/>;
    } else if (screen === 'tab2') {
      return <MonsterLoot navigator={this.props.navigator} monster_loot={this.state.monster_loot}/>;
    } else if (screen === 'tab3') {
      return <MonsterLoot navigator={this.props.navigator} monster_loot={this.state.monster_loot_high}/>;
    } else if (screen === 'tab4') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_armor} type={'armor'}/>;
    } else if (screen === 'tab5') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_weapons} type={'weapon'}/>;
    } else if (screen === 'tab6') {
      return <MonsterInfo navigator={this.props.navigator} info={this.props.monster_info} tool={this.state.monster_tool} ailment={this.state.monster_ailment}/>;
    }
    return (
      <MonsterQuest navigator={this.props.navigator} monster_quest={this.state.monster_quest}/>
    );
  }

  renderLrLoot() {
    if (this.state.monster_loot.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#191919', fontWeight: '100' }}
          textStyle={{ color: '#5e5e5e' }}
          heading="LR Loot"
          >
          {this.renderContent('tab2')}
        </Tab>
      );
    }
    return null;
  }

  renderHrLoot() {
    if (this.state.monster_loot_high.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#191919', fontWeight: '100' }}
          textStyle={{ color: '#5e5e5e' }}
          heading="HR Loot"
          >
          {this.renderContent('tab3')}
        </Tab>
      );
    }
    return null;
  }

  renderWeapon() {
    if (this.state.monster_weapons.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#191919', fontWeight: '100' }}
          textStyle={{ color: '#5e5e5e' }}
          heading="Weapon"
          >
          {this.renderContent('tab5')}
        </Tab>
      );
    }
    return null;
  }

  renderArmor() {
    if (this.state.monster_armor.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#191919', fontWeight: '100' }}
          textStyle={{ color: '#5e5e5e' }}
          heading="Armor"
          >
          {this.renderContent('tab4')}
        </Tab>
      );
    }
    return null;
  }

  renderQuest() {
    if (this.state.monster_quest.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: 'white' }}
          tabStyle={{ backgroundColor: 'white' }}
          activeTextStyle={{ color: '#191919', fontWeight: '100' }}
          textStyle={{ color: '#5e5e5e' }}
          heading="Quest"
          >
          {this.renderContent('tab7')}
        </Tab>
      );
    }
    return null;
  }

  render() {
    if (this.state.loading) {
      return this.renderContent();
    }
    return (
      <Container>
        <Tabs
          prerenderingSiblingsNumber={3}
          scrollWithoutAnimation={false}
          tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: 'white', elevation: 2 }}/>}
          >
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919', fontWeight: '100' }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Info"
            >
            {this.renderContent('tab6')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: '#191919', fontWeight: '100' }}
            textStyle={{ color: '#5e5e5e' }}
            heading="Weakness"
            >
            {this.renderContent('tab1')}
          </Tab>
          {this.renderLrLoot()}
          {this.renderHrLoot()}
          {this.renderWeapon()}
          {this.renderArmor()}
          {this.renderQuest()}
        </Tabs>
        <AdBanner />
      </Container>

    );
  }
}
