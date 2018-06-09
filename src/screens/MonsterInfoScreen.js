import React, { PureComponent } from 'react';
import { Text, ActivityIndicator, InteractionManager, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ScrollableTab, ListItem, Left, Body, Right, Icon, View } from 'native-base';
import _ from 'lodash';
import Item from '../components/Item';
import MonsterInfo from '../components/MonsterInfo';
import MonsterWeakness from '../components/MonsterWeakness';
import MonsterLootList from '../components/MonsterLootList';
import MonsterEquip from '../components/MonsterEquip';
import MonsterQuest from '../components/MonsterQuest';
import AdBanner from '../components/AdBanner';
import Accordion from 'react-native-collapsible/Accordion';


// Styles
import colors from '../styles/colors';

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
      monster_inflicts: {},
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
              loading: false,
            });
            // let end = new Date().getTime();
            // console.log(end - start);
          },
        );
      });
    });
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderSectionTitle(items) {
    return (
      <View>
        <Text>{items[0].lootName}</Text>
      </View>
    );
  }

  _renderHeader(items, index, isActive) {
    return (
      <View style={{ flexDirection: 'row', padding: 18, borderBottomWidth: 0.33, borderColor: colors.border, backgroundColor: colors.divider }}>
          <Text style={{ flex: 3, fontSize: 15.5, color: colors.main }}>{items[0].name}</Text>
          <Icon style={{ flex: 1 }} ios='ios-arrow-down' android="ios-arrow-down" style={{ fontSize: 20, color: colors.accent }}/>
      </View>
    );
  }

  _renderContent(items) {
    return items.map((item, key) => {
      return (
        // <ListItem
        //   key={key}
        //   style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        //   onPress={() => this.props.navigator.push({
        //     screen: 'TablessInfoScreen',
        //     passProps: {
        //       item_id: item.item_id,
        //       type: 'item',
        //     },
        //     animationType: 'slide-horizontal',
        //     title: item.name,
        //   })}>
        //   <Left>
        //     <Text style={{ fontSize: 15.5, color: colors.main }}>{item.loot_name}</Text>
        //   </Left>
        //   <Right>
        //     <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item.quantity}`}</Text>
        //   </Right>
        //   <Right>
        //     <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item.chance}%`}</Text>
        //   </Right>
        // </ListItem>
        <Item key={key} item={item} navigator={this.props.navigator}>
          <Left>
            <Text style={{ fontSize: 15.5, color: colors.main }}>{item.loot_name}</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item.quantity}`}</Text>
          </Right>
          <Right>
            <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item.chance}%`}</Text>
          </Right>
        </Item>
      );
    });
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background,
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (screen === 'tab1') {
      return <MonsterWeakness navigator={this.props.navigator} monster_size={this.props.monster_info.size} monster_hit={this.state.monster_hit}/>;
    } else if (screen === 'tab2') {
      return (
        <ScrollView>
          <Accordion
            underlayColor={colors.border}
            sections={this.state.monster_loot}
            // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            duration={400}
          />
        </ScrollView>
      );
      // return <MonsterLootList navigator={this.props.navigator} lowRank={true} monster_id={this.props.monster_id} monster_loot={this.state.monster_loot}/>;
    } else if (screen === 'tab3') {
      return (
        <ScrollView>
          <Accordion
            underlayColor={colors.border}
            sections={this.state.monster_loot_high}
            // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            duration={400}
          />
        </ScrollView>
      );
      // return <MonsterLootList navigator={this.props.navigator} lowRank={false} monster_id={this.props.monster_id} monster_loot={this.state.monster_loot_high}/>;
    } else if (screen === 'tab4') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_armor} type={'armor'}/>;
    } else if (screen === 'tab5') {
      return <MonsterEquip navigator={this.props.navigator} data={this.state.monster_weapons} type={'weapon'}/>;
    } else if (screen === 'tab6') {
      return <MonsterInfo navigator={this.props.navigator} info={this.props.monster_info} tool={this.state.monster_tool} ailment={this.state.monster_ailment} inflicts={this.state.monster_inflicts}/>;
    }
    return (
      <MonsterQuest navigator={this.props.navigator} monster_quest={this.state.monster_quest}/>
    );
  }

  renderLrLoot() {
    if (this.state.monster_loot.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
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
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
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
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
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
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
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
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
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
          tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
          initialPage={0}
          renderTabBar={() => <ScrollableTab style={{ backgroundColor: colors.background, elevation: 2 }}/>}
          >
          <Tab
            activeTabStyle={{ backgroundColor: colors.background }}
            tabStyle={{ backgroundColor: colors.background }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Info"
            >
            {this.renderContent('tab6')}
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: colors.background }}
            tabStyle={{ backgroundColor: colors.background }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
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
