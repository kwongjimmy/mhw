import React, { PureComponent } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Text, Left, Body, Right, ListItem, Tab, Tabs } from 'native-base';
import ItemInfoEquip from './ItemInfoEquip';
import ItemInfoQuest from './ItemInfoQuest';
import ItemInfoLoot from './ItemInfoLoot';
import ItemInfoCrafting from './ItemInfoCrafting';
import AdBanner from './AdBanner';
import DropDown from './DropDown';

// Styles
import colors from '../styles/colors';

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
      itemCrafting: [],
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
      let itemCrafting = [];

      tx.executeSql('SELECT * FROM items WHERE item_id=?', [this.props.item_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
        item = results.rows.item(0);
      });
      tx.executeSql(
        `SELECT A.name as name, A.rarity as rarity, B.*, C.*,
          D.level as skill1_level,
          E.level as skill2_level,
          G.name as skill1,
          F.name as skill2
          FROM items as A
          JOIN (SELECT B.item_id, quantity from items AS A JOIN crafting as B ON A.item_id = B.item_material_id WHERE A.item_id = ?) as B ON A.item_id = B.item_id
          JOIN armor as C ON B.item_id = C.item_id
          LEFT JOIN armor_skills_levels as D ON C.skill1 = D.armor_skill_level_id
          LEFT JOIN armor_skills_levels as E ON C.skill2 = E.armor_skill_level_id
          LEFT JOIN armor_skills as F ON D.armor_skill_id = F.armor_skill_id
          LEFT JOIN armor_skills as G ON E.armor_skill_id = G.armor_skill_id
          WHERE A.type = 'armor'`
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
        `SELECT A.*, B.name as name, C.name as material_name
          FROM crafting as A
          JOIN items as B ON A.item_id = B.item_id
          JOIN items as C on A.item_material_id = C.item_id
          WHERE craft_id NOT NULL AND A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemCrafting.push(row);
          }
          itemCrafting = _.groupBy(itemCrafting, craftItem => craftItem.craft_id);
          itemCrafting = _.values(itemCrafting);
        },
      );
      tx.executeSql(
        `SELECT
          A.name as name, A.rarity as rarity, B.*,
		      weapon_sharpness.*,
          weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
          weapons.*
          FROM items as A
          JOIN (SELECT B.item_id, quantity from items AS A JOIN crafting as B ON A.item_id = B.item_material_id WHERE A.item_id = ?) as B
          ON A.item_id = B.item_id
		      JOIN weapons ON A.item_id = weapons.item_id
		      LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
          LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
          LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
          LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
          LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
          LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
          LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
          WHERE A.type = 'weapon'
        UNION
        SELECT
          A.name as name, A.rarity as rarity, B.*,
		      weapon_sharpness.*,
          weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
          weapons.*
          FROM items as A
          JOIN (SELECT B.item_id, quantity from items AS A JOIN weapon_upgrade_items as B ON A.item_id = B.material_item_id WHERE A.item_id = ?) as B
          ON A.item_id = B.item_id
		      JOIN weapons ON A.item_id = weapons.item_id
		      LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
          LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
          LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
          LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
          LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
          LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
          LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
          WHERE A.type = 'weapon'`
        , [this.props.item_id, this.props.item_id], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            itemWeapons.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT DISTINCT B.map_id, B.item_id, B.area, B.rank, C.name FROM items as A
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
        `SELECT A.*, B.name as name, B.quantity as quantity, B.chance as chance, B.item_id as item_id, B.rank as rank from monster as A
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
            item, itemArmor, itemWeapons, itemMapLoot, itemMonsterLoot, itemQuest, itemCrafting, loading: false,
          });
        },
      );
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderInfo() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>Buy</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>Sell</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>Carry</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>{`${this.state.item.buy_price}z`}</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>{`${this.state.item.sell_price}z`}</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>{this.state.item.carry}</Text>
            <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: colors.main }}>{this.state.item.rarity}</Text>
        </ListItem>
      </View>
    );
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {this.renderInfo()}
          <ItemInfoLoot
            navigator={this.props.navigator}
            mapLoot={this.state.itemMapLoot}
            monsterLoot={this.state.itemMonsterLoot} />
          <ItemInfoCrafting navigator={this.props.navigator} crafting={this.state.itemCrafting} />
          <ItemInfoEquip navigator={this.props.navigator} armor={this.state.itemArmor} weapons={this.state.itemWeapons}/>
          <ItemInfoQuest navigator={this.props.navigator} items={this.state.itemQuest}/>
        </ScrollView>
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
