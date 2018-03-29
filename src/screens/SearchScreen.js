import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Platform, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab,Header,Button, Icon, Tabs, Title,Right,Item,Input, ListItem, Text, Left, Body, ScrollableTab} from 'native-base';
import MonsterList from '../components/MonsterList';
import SearchList from '../components/SearchList';
import WeaponListItem from '../components/WeaponListItem';
import EquipArmorList from '../components/EquipArmorList';
import AdBanner from '../components/AdBanner';

currentScreen = "monster";
currentWord = "";

export default class SearchScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
};
  constructor(props) {
    super(props)
    const skeletonData = [];
    this.state = {
      allMonsters: [],
      lowRank: [],
      items: [],
      skills: [],
      maps: [],
      quests: [],
      decorations: [],
      charms: [],
      weapons: [],
      loading: true,
      data: [],
      skeletonData,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear' && this.state.loading) {
      this.setState({
        loading: false,
      });
    }
  }

  searchMatchingWords(keyWord) {
    currentWord = keyWord;
    var keyW = keyWord.toLowerCase();
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
    });
    if(keyWord == "")
    {
      db.transaction((tx) => {
        const allMonsters = [];
        const lowRank = [];
        const items = [];
        const skills = [];
        const maps = [];
        const quests = [];
        const decorations = [];
        const charms = [];
        const weapons = [];
        this.setState({
          data: allMonsters, lowRank, items,skills,maps,quests,decorations,charms, weapons, loading: false,
        });
        this.renderContent('monster');
        this.renderContent('armor');
        this.renderContent('weapon');
        this.renderContent('item');
        this.renderContent('quest');
        this.renderContent('charm');
        this.renderContent('decoration');
        this.renderContent('skill');
        this.renderContent('map');
        db.close();
        });
    }
    else if(keyWord.length <3){
      db.transaction((tx) => {
        const allMonsters = [];
        const lowRank = [];
        const items = [];
        const skills = [];
        const maps = [];
        const quests = [];
        const decorations = [];
        const charms = [];
        const weapons = [];

        tx.executeSql("SELECT * FROM monster WHERE LOWER(monster_name) LIKE ? ORDER BY monster_name LIMIT 20" , [keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
          }
          this.renderContent('monster');
        });
        tx.executeSql(`
          SELECT
          X.*,
          I1.name AS head_name, I1.rarity as head_rarity,
          I2.name AS armor_name, I2.rarity as armor_rarity,
          I3.name AS gloves_name, I3.rarity as gloves_rarity,
          I4.name AS belt_name, I4.rarity as belt_rarity,
          I5.name AS pants_name, I5.rarity as pants_rarity,
  		    SB.name AS set_bonus,
  		    SB.pieces AS pieces,
  		    SB.pieces_2 AS pieces2,
          SS1.armor_skill_id AS skill1_id,
          SS2.armor_skill_id AS skill2_id,
  	      SS1.name AS skill1_name,
  		    SS2.name AS skill2_name
          FROM
          ( SELECT
            A.name, A.armor_set_id, ifnull(B.rank, 'High') as rank,
            B.item_id AS head_item_id, b.slot1 AS head_slot1, b.slot2 AS head_slot2, b.slot3 AS head_slot3, BS1.name AS head_skill1, BS2.name AS head_skill2, BSL1.level as head_skill1_level, BSL2.level as head_skill2_level,
            C.item_id AS armor_item_id, C.slot1 AS armor_slot1, C.slot2 AS armor_slot2, C.slot3 AS armor_slot3, CS1.name AS armor_skill1, CS2.name AS armor_skill2, CSL1.level as armor_skill1_level, CSL2.level as armor_skill2_level,
            D.item_id AS gloves_item_id, D.slot1 AS gloves_slot1, D.slot2 AS gloves_slot2, D.slot3 AS gloves_slot3, DS1.name AS gloves_skill1, DS2.name AS gloves_skill2, DSL1.level as gloves_skill1_level, DSL2.level as gloves_skill2_level,
            E.item_id AS belt_item_id, E.slot1 AS belt_slot1, E.slot2 AS belt_slot2, E.slot3 AS belt_slot3, ES1.name AS belt_skill1, ES2.name AS belt_skill2, ESL1.level as belt_skill1_level, ESL2.level as belt_skill2_level,
            F.item_id AS pants_item_id, F.slot1 AS pants_slot1, F.slot2 AS pants_slot2, F.slot3 AS pants_slot3, FS1.name AS pants_skill1, FS2.name AS pants_skill2, FSL1.level as pants_skill1_level, FSL2.level as pants_skill2_level
              FROM armor_sets AS A
              LEFT JOIN armor AS B ON A.item_1 = B.item_id
              LEFT JOIN armor AS C ON A.item_2 = C.item_id
              LEFT JOIN armor AS D ON A.item_3 = D.item_id
              LEFT JOIN armor AS E ON A.item_4 = E.item_id
              LEFT JOIN armor AS F ON A.item_5 = F.item_id
              LEFT JOIN armor_skills_levels AS BSL1 ON B.skill1 = BSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS BSL2 ON B.skill2 = BSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS CSL1 ON C.skill1 = CSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS CSL2 ON C.skill2 = CSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS DSL1 ON D.skill1 = DSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS DSL2 ON D.skill2 = DSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS ESL1 ON E.skill1 = ESL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS ESL2 ON E.skill2 = ESL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS FSL1 ON F.skill1 = FSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS FSL2 ON F.skill2 = FSL2.armor_skill_level_id
              LEFT JOIN armor_skills AS BS1 ON BSL1.armor_skill_id = BS1.armor_skill_id LEFT JOIN armor_skills AS BS2 ON BSL2.armor_skill_id = BS2.armor_skill_id
              LEFT JOIN armor_skills AS CS1 ON CSL1.armor_skill_id = CS1.armor_skill_id LEFT JOIN armor_skills AS CS2 ON CSL2.armor_skill_id = CS2.armor_skill_id
              LEFT JOIN armor_skills AS DS1 ON DSL1.armor_skill_id = DS1.armor_skill_id LEFT JOIN armor_skills AS DS2 ON DSL2.armor_skill_id = DS2.armor_skill_id
              LEFT JOIN armor_skills AS ES1 ON ESL1.armor_skill_id = ES1.armor_skill_id LEFT JOIN armor_skills AS ES2 ON ESL2.armor_skill_id = ES2.armor_skill_id
              LEFT JOIN armor_skills AS FS1 ON FSL1.armor_skill_id = FS1.armor_skill_id LEFT JOIN armor_skills AS FS2 ON FSL2.armor_skill_id = FS2.armor_skill_id
          ) AS X
          LEFT JOIN items AS I1 ON X.head_item_id = I1.item_id
          LEFT JOIN items AS I2 ON X.armor_item_id = I2.item_id
          LEFT JOIN items AS I3 ON X.gloves_item_id = I3.item_id
          LEFT JOIN items AS I4 ON X.belt_item_id = I4.item_id
          LEFT JOIN items AS I5 ON X.pants_item_id = I5.item_id
  		    LEFT JOIN armor_set_bonus AS SB ON x.armor_set_id = SB.set_id
  		    LEFT JOIN armor_skills_levels AS SB1 ON SB.skill = SB1.armor_skill_level_id
  		    LEFT JOIN armor_skills_levels AS SB2 ON SB.skill_2 = SB2.armor_skill_level_id
  		    LEFT JOIN armor_skills AS SS1 ON SS1.armor_skill_id = SB1.armor_skill_id
  		    LEFT JOIN armor_skills AS SS2 ON SS2.armor_skill_id = SB2.armor_skill_id
          WHERE LOWER(X.name) LIKE ? LIMIT 20`
           , [keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            lowRank.push(row);
          }
          this.renderContent('armor');
        });
        tx.executeSql(  `SELECT
            weapon_sharpness.*,
            weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
            weapons.*, items.name as name, items.rarity as rarity
            FROM weapons
            JOIN items on weapons.item_id = items.item_id
            LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
            LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
            LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
            LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
            LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
            LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
            LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
            WHERE items.name LIKE ? ORDER BY name LIMIT 20`, [keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            weapons.push(results.rows.item(i));
          }
          this.renderContent('weapon');
        });
        tx.executeSql(
          `SELECT item_id, name, category FROM items WHERE category = 'item' AND LOWER(name) LIKE ? ORDER BY name LIMIT 20`,
          [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              items.push(row);
            }
            this.renderContent('item');
          });
          tx.executeSql('SELECT * FROM quests WHERE LOWER(name) LIKE ? ORDER BY name LIMIT 20', [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              quests.push(row);
            }
            this.renderContent('quest');
          });
          tx.executeSql(
            'SELECT * FROM armor_skills WHERE LOWER(name) LIKE ? ORDER BY name LIMIT 20',
            [keyW+'%'], (tx, results) => {
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                skills.push(row);
              }
              this.renderContent('skill');
            },
          );
          tx.executeSql(
            `SELECT
              A.item_id as item_id, B.name as name, C.name as skill_name, D.level as skill_level
              FROM decorations AS A
              JOIN items AS B ON A.item_id = B.item_id
              LEFT JOIN armor_skills_levels AS D ON A.skill = D.armor_skill_level_id
              LEFT JOIN armor_skills AS C ON D.armor_skill_id = C.armor_skill_id
              WHERE LOWER(B.name) LIKE ? ORDER BY B.name LIMIT 20`
            , [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for(let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              decorations.push(row);
            }
            this.renderContent('decoration');
           },
          );
          tx.executeSql(
            `SELECT
              A.item_id as item_id, B.name as name,
              CL1.name as skill1_name, C1.level as skill1_level,
              CL2.name as skill2_name, C2.level as skill2_level
              FROM charms AS A
              JOIN items AS B ON A.item_id = B.item_id
              LEFT JOIN armor_skills_levels AS C1 ON A.armor_skill_1 = C1.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS C2 ON A.armor_skill_2 = C2.armor_skill_level_id
              LEFT JOIN armor_skills AS CL1 ON C1.armor_skill_id = CL1.armor_skill_id
              LEFT JOIN armor_skills AS CL2 ON C2.armor_skill_id = CL2.armor_skill_id WHERE LOWER(B.name) LIKE ? ORDER BY B.name LIMIT 20`
            , [keyW+'%'], (tx, results) => {
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                charms.push(row);
              }
              this.renderContent('charm');
            },
          );
          tx.executeSql(
            'SELECT * FROM maps WHERE LOWER(name) LIKE ? ORDER BY name LIMIT 20',
            [keyW+'%'], (tx, results) => {
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                maps.push(row);
              }
              this.renderContent('map');
              this.setState({
                data: allMonsters, allMonsters, lowRank, items,skills,maps,quests,decorations,charms, weapons, loading: false,
              });
              db.close();
            },
          );
      });
    }
    else if(keyWord.length >2 ){
      db.transaction((tx) => {
        const allMonsters = [];
        const lowRank = [];
        const smallMonsters = [];
        const largeMonsters = [];
        const items = [];
        const skills = [];
        const maps = [];
        const quests = [];
        const decorations = [];
        const charms = [];
        const weapons = [];
        tx.executeSql("SELECT * FROM monster WHERE LOWER(monster_name) LIKE ? OR LOWER(type) LIKE ? ORDER BY SUBSTR(monster_name,1,3)" , ['%'+keyW+'%','%'+keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
          }
          this.renderContent('monster');
        });
        tx.executeSql(`
          SELECT
          X.*,
          I1.name AS head_name, I1.rarity as head_rarity,
          I2.name AS armor_name, I2.rarity as armor_rarity,
          I3.name AS gloves_name, I3.rarity as gloves_rarity,
          I4.name AS belt_name, I4.rarity as belt_rarity,
          I5.name AS pants_name, I5.rarity as pants_rarity,
  		    SB.name AS set_bonus,
  		    SB.pieces AS pieces,
  		    SB.pieces_2 AS pieces2,
          SS1.armor_skill_id AS skill1_id,
          SS2.armor_skill_id AS skill2_id,
  	      SS1.name AS skill1_name,
  		    SS2.name AS skill2_name
          FROM
          ( SELECT
            A.name, A.armor_set_id, ifnull(B.rank, 'High') as rank,
            B.item_id AS head_item_id, b.slot1 AS head_slot1, b.slot2 AS head_slot2, b.slot3 AS head_slot3, BS1.name AS head_skill1, BS2.name AS head_skill2, BSL1.level as head_skill1_level, BSL2.level as head_skill2_level,
            C.item_id AS armor_item_id, C.slot1 AS armor_slot1, C.slot2 AS armor_slot2, C.slot3 AS armor_slot3, CS1.name AS armor_skill1, CS2.name AS armor_skill2, CSL1.level as armor_skill1_level, CSL2.level as armor_skill2_level,
            D.item_id AS gloves_item_id, D.slot1 AS gloves_slot1, D.slot2 AS gloves_slot2, D.slot3 AS gloves_slot3, DS1.name AS gloves_skill1, DS2.name AS gloves_skill2, DSL1.level as gloves_skill1_level, DSL2.level as gloves_skill2_level,
            E.item_id AS belt_item_id, E.slot1 AS belt_slot1, E.slot2 AS belt_slot2, E.slot3 AS belt_slot3, ES1.name AS belt_skill1, ES2.name AS belt_skill2, ESL1.level as belt_skill1_level, ESL2.level as belt_skill2_level,
            F.item_id AS pants_item_id, F.slot1 AS pants_slot1, F.slot2 AS pants_slot2, F.slot3 AS pants_slot3, FS1.name AS pants_skill1, FS2.name AS pants_skill2, FSL1.level as pants_skill1_level, FSL2.level as pants_skill2_level
              FROM armor_sets AS A
              LEFT JOIN armor AS B ON A.item_1 = B.item_id
              LEFT JOIN armor AS C ON A.item_2 = C.item_id
              LEFT JOIN armor AS D ON A.item_3 = D.item_id
              LEFT JOIN armor AS E ON A.item_4 = E.item_id
              LEFT JOIN armor AS F ON A.item_5 = F.item_id
              LEFT JOIN armor_skills_levels AS BSL1 ON B.skill1 = BSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS BSL2 ON B.skill2 = BSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS CSL1 ON C.skill1 = CSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS CSL2 ON C.skill2 = CSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS DSL1 ON D.skill1 = DSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS DSL2 ON D.skill2 = DSL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS ESL1 ON E.skill1 = ESL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS ESL2 ON E.skill2 = ESL2.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS FSL1 ON F.skill1 = FSL1.armor_skill_level_id LEFT JOIN armor_skills_levels AS FSL2 ON F.skill2 = FSL2.armor_skill_level_id
              LEFT JOIN armor_skills AS BS1 ON BSL1.armor_skill_id = BS1.armor_skill_id LEFT JOIN armor_skills AS BS2 ON BSL2.armor_skill_id = BS2.armor_skill_id
              LEFT JOIN armor_skills AS CS1 ON CSL1.armor_skill_id = CS1.armor_skill_id LEFT JOIN armor_skills AS CS2 ON CSL2.armor_skill_id = CS2.armor_skill_id
              LEFT JOIN armor_skills AS DS1 ON DSL1.armor_skill_id = DS1.armor_skill_id LEFT JOIN armor_skills AS DS2 ON DSL2.armor_skill_id = DS2.armor_skill_id
              LEFT JOIN armor_skills AS ES1 ON ESL1.armor_skill_id = ES1.armor_skill_id LEFT JOIN armor_skills AS ES2 ON ESL2.armor_skill_id = ES2.armor_skill_id
              LEFT JOIN armor_skills AS FS1 ON FSL1.armor_skill_id = FS1.armor_skill_id LEFT JOIN armor_skills AS FS2 ON FSL2.armor_skill_id = FS2.armor_skill_id
          ) AS X
          LEFT JOIN items AS I1 ON X.head_item_id = I1.item_id
          LEFT JOIN items AS I2 ON X.armor_item_id = I2.item_id
          LEFT JOIN items AS I3 ON X.gloves_item_id = I3.item_id
          LEFT JOIN items AS I4 ON X.belt_item_id = I4.item_id
          LEFT JOIN items AS I5 ON X.pants_item_id = I5.item_id
  		    LEFT JOIN armor_set_bonus AS SB ON x.armor_set_id = SB.set_id
  		    LEFT JOIN armor_skills_levels AS SB1 ON SB.skill = SB1.armor_skill_level_id
  		    LEFT JOIN armor_skills_levels AS SB2 ON SB.skill_2 = SB2.armor_skill_level_id
  		    LEFT JOIN armor_skills AS SS1 ON SS1.armor_skill_id = SB1.armor_skill_id
  		    LEFT JOIN armor_skills AS SS2 ON SS2.armor_skill_id = SB2.armor_skill_id
          WHERE LOWER(X.name) LIKE ? ORDER BY SUBSTR(X.name,1,3)`
           , ['%'+keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            lowRank.push(row);
          }
          this.renderContent('armor');
        });
        tx.executeSql(  `SELECT
            weapon_sharpness.*,
            weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
            weapons.*, items.name as name, items.rarity as rarity
            FROM weapons
            JOIN items on weapons.item_id = items.item_id
            LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
            LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
            LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
            LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
            LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
            LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
            LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
            WHERE items.name LIKE ? ORDER BY SUBSTR(items.name,1,3)`, ['%'+keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            weapons.push(results.rows.item(i));
          }
          this.renderContent('weapon');
        });
        tx.executeSql(
          `SELECT item_id, name, category FROM items WHERE category = 'item' AND LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)`,
          ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              items.push(row);
            }
            this.renderContent('item');
          });
          tx.executeSql('SELECT * FROM quests WHERE LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)', ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              quests.push(row);
            }
            this.renderContent('quest');
          });
          tx.executeSql(
            'SELECT * FROM armor_skills WHERE LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)',
            ['%'+keyW+'%'], (tx, results) => {
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                skills.push(row);
              }
              this.renderContent('skill');
            },
          );
          tx.executeSql(
            `SELECT
              A.item_id as item_id, B.name as name, C.name as skill_name, D.level as skill_level
              FROM decorations AS A
              JOIN items AS B ON A.item_id = B.item_id
              LEFT JOIN armor_skills_levels AS D ON A.skill = D.armor_skill_level_id
              LEFT JOIN armor_skills AS C ON D.armor_skill_id = C.armor_skill_id
              WHERE LOWER(B.name) LIKE ? ORDER BY SUBSTR(B.name,1,3)`
            , ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for(let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              decorations.push(row);
            }
            this.renderContent('decoration');
           },
          );
          tx.executeSql(
            `SELECT
              A.item_id as item_id, B.name as name,
              CL1.name as skill1_name, C1.level as skill1_level,
              CL2.name as skill2_name, C2.level as skill2_level
              FROM charms AS A
              JOIN items AS B ON A.item_id = B.item_id
              LEFT JOIN armor_skills_levels AS C1 ON A.armor_skill_1 = C1.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS C2 ON A.armor_skill_2 = C2.armor_skill_level_id
              LEFT JOIN armor_skills AS CL1 ON C1.armor_skill_id = CL1.armor_skill_id
              LEFT JOIN armor_skills AS CL2 ON C2.armor_skill_id = CL2.armor_skill_id WHERE LOWER(B.name) LIKE ? ORDER BY SUBSTR(B.name,1,3)`
            , ['%'+keyW+'%'], (tx, results) => {
            // Get rows with Web SQL Database spec compliance.
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                charms.push(row);
              }
              this.renderContent('charm');
            },
          );
          tx.executeSql(
            'SELECT * FROM maps WHERE LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)',
            ['%'+keyW+'%'], (tx, results) => {
              const len = results.rows.length;
              for (let i = 0; i < len; i += 1) {
                const row = results.rows.item(i);
                maps.push(row);
              }
              this.renderContent('map');
              this.setState({
                data: allMonsters, allMonsters, lowRank, items,skills,maps,quests,decorations,charms, weapons, loading: false,
              });
              db.close();
            },
          );
      });
    }
  }
  renderListWeapons = ({ item }) => {
    return (
      <WeaponListItem navigator={this.props.navigator} item={item} />
    );
  }
  renderListQuests = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8, height: 60 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          type: 'quests',
          quest_id: item.quest_id,
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}
      >
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: '#5e5e5e' }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }
  renderListMaps = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TabInfoScreen',
        passProps: {
          item_id: item.map_id,
          type: 'maps'
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
      <Left>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      </ListItem>
    );
  }
  renderListItems = ({ item }) => {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18 }} onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'item',
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </ListItem>
    );
  }
  renderListDecorations = ({ item }) => {
    return (
      <ListItem
        style={{ height: 60, marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'decorations'
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
      <Left style= {{ flex: 1 }}>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      <Right style= {{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: '#8e8e8e' }}>{item.skill_name} +{item.skill_level}</Text>
      </Right>
      </ListItem>
    );
  }
  renderListSkills = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TabInfoScreen',
        passProps: {
          armor_skill_id: item.armor_skill_id,
          type: 'skill',
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}
      >
      <Left>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      <Body>
        <Text style={{ fontSize: 13, color: '#8e8e8e' }}>{item.description}</Text>
      </Body>
      </ListItem>
    );
  }
  renderListCharms = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'charms'
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
      <Left style={{ flex: 2 }}>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      {this.renderSkills(item)}
      </ListItem>
    );
  }
  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <Right style={{ flex: 2 }}>
          <Text style={{ flex: 1, fontSize: 14, color: '#8e8e8e' }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ flex: 1, fontSize: 14, color: '#8e8e8e' }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </Right>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Right style={{ flex: 2 }}>
          <Text style={{ flex: 1, fontSize: 14, color: '#8e8e8e' }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
        </Right>
      );
    }
    return (
      null
    );
  }
  renderContent(screen) {
    if (this.state.loading) {
      return (
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
    if (screen === 'monster') {
      currentScreen = "monster";
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <MonsterList navigator={this.props.navigator} monsters={this.state.allMonsters} type={'monster'}/>
        </View>
      );
    }
    else if (screen === 'armor') {
      currentScreen = "armor";
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <EquipArmorList navigator={this.props.navigator} armor={this.state.lowRank}/>
        </View>
      );
    }
    else if (screen === 'weapon') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            style={{ backgroundColor: 'white' }}
            initialNumToRender={8}
            data={this.state.weapons}
            keyExtractor={(item) => item.item_id.toString()}
            renderItem={this.renderListWeapons}
          />
        </View>
      );
    }
    else if (screen === 'item') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.items}
            keyExtractor={(item) => item.item_id.toString()}
            renderItem={this.renderListItems}
          />
        </View>
      );
    } else if (screen === 'skill') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.skills}
            keyExtractor={(item) => item.armor_skill_id.toString()}
            renderItem={this.renderListSkills}
          />
        </View>
      );
    }
    else if (screen === 'map') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.maps}
            keyExtractor={(item) => item.map_id.toString()}
            renderItem={this.renderListMaps}
          />
        </View>
      );
    }
    else if (screen === 'decoration') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.decorations}
            keyExtractor={(item) => item.item_id.toString()}
            renderItem={this.renderListDecorations}
          />
        </View>
      );
    }
    else if (screen === 'charm') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.charms}
            keyExtractor={(item) => item.item_id.toString()}
            renderItem={this.renderListCharms}
          />
        </View>
      );
    }
    else if (screen === 'quest') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={this.state.quests}
            keyExtractor={(item) => item.quest_id.toString()}
            renderItem={this.renderListQuests}
          />
        </View>
      );
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Header
          style={{ backgroundColor: 'white' }}
          androidStatusBarColor='white'
          noShadow={true}
          searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" onChangeText={(text) => this.searchMatchingWords(text)}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}
        renderTabBar={() => <ScrollableTab style={{ elevation: 2 }}/>}
        >
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Monster"
           >
           {this.renderContent('monster')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Armor"
           >
           {this.renderContent('armor')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Weapon"
           >
           {this.renderContent('weapon')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Item"
           >
           {this.renderContent('item')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Quests"
           >
           {this.renderContent('quest')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Charms"
           >
           {this.renderContent('charm')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Decorations"
           >
           {this.renderContent('decoration')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Skills"
           >
           {this.renderContent('skill')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919',  }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Maps"
           >
           {this.renderContent('map')}
         </Tab>
       </Tabs>
       <AdBanner/>
      </Container>
    );
  }
}
