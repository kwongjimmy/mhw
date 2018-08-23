import React, { PureComponent } from 'react';
import { Text, ActivityIndicator, InteractionManager, ScrollView, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ScrollableTab, ListItem, Left, Body, Right, Icon, View } from 'native-base';
import _ from 'lodash';
import { connect } from 'react-redux';
import Item from '../components/Item';
import MonsterInfo from '../components/MonsterInfo';
import MonsterLocations from '../components/MonsterLocations';
import MonsterWeakness from '../components/MonsterWeakness';
import MonsterLootList from '../components/MonsterLootList';
import MonsterEquip from '../components/MonsterEquip';
import MonsterQuest from '../components/MonsterQuest';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

class MonsterInfoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      monster_hit: [],
      monster_loot: [],
      monster_loot_high: [],
      monster_armor: [],
      monster_weapons: [],
      monster_quest: [],
      monster_inflicts: {},
      monster_locations: [],
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
        let monster_inflicts = [];
        const monster_locations = [];
        tx.executeSql('SELECT * FROM monster_inflicts WHERE monster_id = ?', [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_inflicts.push(row);
          }
        });
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
        tx.executeSql('SELECT A.spawn, A.areas, A.rest, B.* FROM map_monsters AS A JOIN maps AS B ON A.map_id = B.map_id WHERE A.monster_id = ?', [this.props.monster_id], (tx, results) => {
          for (let i = 0; i < results.rows.length; i += 1) {
            const row = results.rows.item(i);
            monster_locations.push(row);
          }
        });
        tx.executeSql(
          `SELECT A.item_id, A.quantity, A.chance, B.name, C.name as loot_name, C.rank as rank
            FROM monster_loot AS A
            JOIN items AS B ON A.item_id = B.item_id
            JOIN monster_loot_categories as C ON A.category_id = C.category_id
            WHERE A.monster_id = ? AND B.type = 'item' AND C.rank = 0`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_loot.push(row);
            }
            monster_loot = _.groupBy(monster_loot, loot => loot.item_id);
            monster_loot = _.values(monster_loot);
          },
        );
        tx.executeSql(
          `SELECT A.item_id, A.quantity, A.chance, B.name, C.name as loot_name, C.rank as rank
            FROM monster_loot AS A
            JOIN items AS B ON A.item_id = B.item_id
            JOIN monster_loot_categories as C ON A.category_id = C.category_id
            WHERE A.monster_id = ? AND B.type = 'item' AND C.rank = 1`,
          [this.props.monster_id], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              monster_loot_high.push(row);
            }
            monster_loot_high = _.groupBy(monster_loot_high, loot => loot.item_id);
            monster_loot_high = _.values(monster_loot_high);
          },
        );
        tx.executeSql(
          `SELECT
            C.name, C.item_id, C.rarity,
            D.slot1, D.slot2, D.slot3, D.type as type, D.fire, D.water, D.thunder, D.ice, D.dragon, D.min_def,
            E1.level as skill1_level, E1S.name as skill1,
            E2.level as skill2_level, E2S.name as skill2
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
              monster_inflicts,
              monster_locations,
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
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background,
        }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return <MonsterWeakness theme={this.props.theme} navigator={this.props.navigator} monster_size={this.props.monster_info.size} monster_hit={this.state.monster_hit}/>;
    } else if (screen === 'tab2') {
      return <MonsterLootList navigator={this.props.navigator} lowRank={true} monster_id={this.props.monster_id} monster_loot={this.state.monster_loot}/>;
    } else if (screen === 'tab3') {
      return <MonsterLootList theme={this.props.theme} navigator={this.props.navigator} lowRank={false} monster_id={this.props.monster_id} monster_loot={this.state.monster_loot_high}/>;
    } else if (screen === 'tab4') {
      return <MonsterEquip theme={this.props.theme} navigator={this.props.navigator} data={this.state.monster_armor} type={'armor'}/>;
    } else if (screen === 'tab5') {
      return <MonsterEquip theme={this.props.theme} navigator={this.props.navigator} data={this.state.monster_weapons} type={'weapon'}/>;
    } else if (screen === 'tab6') {
      return <MonsterInfo theme={this.props.theme} navigator={this.props.navigator} info={this.props.monster_info} tool={this.state.monster_tool} ailment={this.state.monster_ailment} inflicts={this.state.monster_inflicts}/>;
    } else if (screen === 'tab8') {
      return <MonsterLocations theme={this.props.theme} navigator={this.props.navigator} locations={this.state.monster_locations}/>;
    }
    return (
      <MonsterQuest theme={this.props.theme} navigator={this.props.navigator} monster_quest={this.state.monster_quest}/>
    );
  }

  renderLrLoot() {
    if (this.state.monster_loot.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
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
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
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
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
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
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
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
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
          heading="Quest"
          >
          {this.renderContent('tab7')}
        </Tab>
      );
    }
    return null;
  }

  renderLocations() {
    if (this.state.monster_locations.length > 0 && this.props.monster_info.size === 'Large') {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: this.props.theme.background }}
          tabStyle={{ backgroundColor: this.props.theme.background }}
          activeTextStyle={{ color: this.props.theme.main }}
          textStyle={{ color: this.props.theme.secondary }}
          heading="Areas"
          >
          {this.renderContent('tab8')}
        </Tab>
      );
    }
    return null;
  }

  setNavSettings() {
    this.props.navigator.setStyle({
      navBarButtonColor: this.props.theme.main,
      navBarTextColor: this.props.theme.main,
      navBarBackgroundColor: this.props.theme.background,
      statusBarTextColorScheme: this.props.theme.statusbar,
      statusBarColor: this.props.theme.background,
      tabBarBackgroundColor: this.props.theme.background,
    });
  }

  render() {
    this.setNavSettings();
    if (this.state.loading) {
      return this.renderContent();
    }
    return (
      <Container>
        <Tabs
          prerenderingSiblingsNumber={3}
          scrollWithoutAnimation={false}
          tabBarUnderlineStyle={{ backgroundColor: this.props.theme.accent, height: 3 }}
          initialPage={0}
          renderTabBar={() =>
            <ScrollableTab
              style={{ borderWidth: 0, backgroundColor: this.props.theme.background, elevation: 2 }}
            />
          }>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Info"
            >
            {this.renderContent('tab6')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: this.props.theme.background }}
            tabStyle={{ backgroundColor: this.props.theme.background }}
            activeTextStyle={{ color: this.props.theme.main }}
            textStyle={{ color: this.props.theme.secondary }}
            heading="Weakness"
            >
            {this.renderContent('tab1')}
          </Tab>
          {this.renderLocations()}
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

const mapStateToProps = (state) => {
  return state.settings
};

export default connect(mapStateToProps, {})(MonsterInfoScreen);
