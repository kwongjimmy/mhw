import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator, Platform } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Header, Button, Icon, Tabs, Title, Right, Item, Input, ListItem, Text, Left, Body, ScrollableTab } from 'native-base';
import MonsterList from '../components/MonsterList';
import WeaponListItem from '../components/WeaponListItem';
import EquipArmorList from '../components/EquipArmorList';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class SearchScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
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
      loading: false,
      data: [],
      tabs: 0,
      keyWord: '',
    };
    this.searchMatchingWords = _.debounce(this.searchMatchingWords, 625);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // if (event.id === 'willAppear' && this.state.loading) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  searchMatchingWords(keyWord) {
    let keyW = keyWord.toLowerCase();
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
    });
    if (keyWord === '') {
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
        const tabs = 0;
        const keyWord = '';
        this.setState({
          allMonsters, lowRank, items, skills, maps, quests, decorations, charms, weapons, loading: false, tabs, keyWord,
        });
      });
    } else if (keyWord.length < 3) {
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
        let tabs = 0;
        this.setState({
          loading: true, keyWord
        });
        tx.executeSql('SELECT * FROM monster WHERE LOWER(monster_name) LIKE ? ORDER BY monster_name LIMIT 20', [keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
          }
          if (allMonsters.length > 0) tabs += 1;
        });
        tx.executeSql(
          `SELECT
          X.*,
          I1.name AS head_name, I1.rarity as head_rarity,
          I2.name AS armor_name, I2.rarity as armor_rarity,
          I3.name AS gloves_name, I3.rarity as gloves_rarity,
          I4.name AS belt_name, I4.rarity as belt_rarity,
          I5.name AS pants_name, I5.rarity as pants_rarity,
          SB.name AS set_bonus_name,
  		    SB.pieces AS pieces,
  		    SB.pieces_2 AS pieces_2,
          SB1.level as set_bonus_skill1_level,
          SB2.level as set_bonus_skill2_level,
          SS1.armor_skill_id AS set_bonus_skill1_id,
          SS2.armor_skill_id AS set_bonus_skill2_id,
  	      SS1.name AS set_bonus_skill1,
  		    SS2.name AS set_bonus_skill2
          FROM
          ( SELECT
            A.name, A.armor_set_id, ifnull(B.rank, 'Low') as rank,
            B.item_id AS head_item_id, b.slot1 AS head_slot1, b.slot2 AS head_slot2, b.slot3 AS head_slot3, BS1.name AS head_skill1, BS2.name AS head_skill2, BSL1.level as head_skill1_level, BSL2.level as head_skill2_level, B.min_def as head_def, B.fire as head_fire, B.water as head_water, B.thunder as head_thunder, B.ice as head_ice, B.dragon as head_dragon,
            C.item_id AS armor_item_id, C.slot1 AS armor_slot1, C.slot2 AS armor_slot2, C.slot3 AS armor_slot3, CS1.name AS armor_skill1, CS2.name AS armor_skill2, CSL1.level as armor_skill1_level, CSL2.level as armor_skill2_level, C.min_def as armor_def, C.fire as armor_fire, C.water as armor_water, C.thunder as armor_thunder, C.ice as armor_ice, C.dragon as armor_dragon,
            D.item_id AS gloves_item_id, D.slot1 AS gloves_slot1, D.slot2 AS gloves_slot2, D.slot3 AS gloves_slot3, DS1.name AS gloves_skill1, DS2.name AS gloves_skill2, DSL1.level as gloves_skill1_level, DSL2.level as gloves_skill2_level, D.min_def as gloves_def, D.fire as gloves_fire, D.water as gloves_water, D.thunder as gloves_thunder, D.ice as gloves_ice, D.dragon as gloves_dragon,
            E.item_id AS belt_item_id, E.slot1 AS belt_slot1, E.slot2 AS belt_slot2, E.slot3 AS belt_slot3, ES1.name AS belt_skill1, ES2.name AS belt_skill2, ESL1.level as belt_skill1_level, ESL2.level as belt_skill2_level, E.min_def as belt_def, E.fire as belt_fire, E.water as belt_water, E.thunder as belt_thunder, E.ice as belt_ice, E.dragon as belt_dragon,
            F.item_id AS pants_item_id, F.slot1 AS pants_slot1, F.slot2 AS pants_slot2, F.slot3 AS pants_slot3, FS1.name AS pants_skill1, FS2.name AS pants_skill2, FSL1.level as pants_skill1_level, FSL2.level as pants_skill2_level, F.min_def as pants_def, F.fire as pants_fire, F.water as pants_water, F.thunder as pants_thunder, F.ice as pants_ice, F.dragon as pants_dragon
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
              WHERE A.name NOT LIKE '%Alpha%' AND A.name NOT LIKE '%Beta%'
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
            if (lowRank.length > 0) tabs += 1;
          },
        );
        tx.executeSql(
          `SELECT
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
            WHERE items.name LIKE ? ORDER BY name LIMIT 20`
          , [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              weapons.push(results.rows.item(i));
            }
            if (weapons.length > 0) tabs += 1;
          },
        );
        tx.executeSql(
          `SELECT item_id, name, type FROM items WHERE type = 'item' AND LOWER(name) LIKE ? ORDER BY name LIMIT 20`,
          [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              items.push(row);
            }
            console.log(items.length, len);
            if (items.length > 0) tabs += 1;
          }
        );
        tx.executeSql('SELECT * FROM quests WHERE LOWER(name) LIKE ? ORDER BY name LIMIT 20', [keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            quests.push(row);
          }
          if (quests.length > 0) tabs += 1;
        });
        tx.executeSql(
          'SELECT * FROM armor_skills WHERE LOWER(name) LIKE ? ORDER BY name LIMIT 20',
          [keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              skills.push(row);
            }
            if (skills.length > 0) tabs += 1;
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
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              decorations.push(row);
            }
            if (decorations.length > 0) tabs += 1;
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
            if (charms.length > 0) tabs += 1;
            this.setState({
              allMonsters, lowRank, items, skills, maps, quests, decorations, charms, weapons, loading: false, tabs,
            });
          },
        );
      });
    } else if (keyWord.length > 2) {
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
        let tabs = 0;
        this.setState({
          loading: true, keyWord
        });
        tx.executeSql(
          "SELECT * FROM monster WHERE LOWER(monster_name) LIKE ? OR LOWER(type) LIKE ? ORDER BY SUBSTR(monster_name,1,3)"
          , ['%'+keyW+'%','%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              allMonsters.push(row);
            }
            if (allMonsters.length > 0) tabs += 1;
          },
        );
        tx.executeSql(
          `SELECT
          X.*,
          I1.name AS head_name, I1.rarity as head_rarity,
          I2.name AS armor_name, I2.rarity as armor_rarity,
          I3.name AS gloves_name, I3.rarity as gloves_rarity,
          I4.name AS belt_name, I4.rarity as belt_rarity,
          I5.name AS pants_name, I5.rarity as pants_rarity,
          SB.name AS set_bonus_name,
  		    SB.pieces AS pieces,
  		    SB.pieces_2 AS pieces_2,
          SB1.level as set_bonus_skill1_level,
          SB2.level as set_bonus_skill2_level,
          SS1.armor_skill_id AS set_bonus_skill1_id,
          SS2.armor_skill_id AS set_bonus_skill2_id,
  	      SS1.name AS set_bonus_skill1,
  		    SS2.name AS set_bonus_skill2
          FROM
          ( SELECT
            A.name, A.armor_set_id, ifnull(B.rank, 'Low') as rank,
            B.item_id AS head_item_id, b.slot1 AS head_slot1, b.slot2 AS head_slot2, b.slot3 AS head_slot3, BS1.name AS head_skill1, BS2.name AS head_skill2, BSL1.level as head_skill1_level, BSL2.level as head_skill2_level, B.min_def as head_def, B.fire as head_fire, B.water as head_water, B.thunder as head_thunder, B.ice as head_ice, B.dragon as head_dragon,
            C.item_id AS armor_item_id, C.slot1 AS armor_slot1, C.slot2 AS armor_slot2, C.slot3 AS armor_slot3, CS1.name AS armor_skill1, CS2.name AS armor_skill2, CSL1.level as armor_skill1_level, CSL2.level as armor_skill2_level, C.min_def as armor_def, C.fire as armor_fire, C.water as armor_water, C.thunder as armor_thunder, C.ice as armor_ice, C.dragon as armor_dragon,
            D.item_id AS gloves_item_id, D.slot1 AS gloves_slot1, D.slot2 AS gloves_slot2, D.slot3 AS gloves_slot3, DS1.name AS gloves_skill1, DS2.name AS gloves_skill2, DSL1.level as gloves_skill1_level, DSL2.level as gloves_skill2_level, D.min_def as gloves_def, D.fire as gloves_fire, D.water as gloves_water, D.thunder as gloves_thunder, D.ice as gloves_ice, D.dragon as gloves_dragon,
            E.item_id AS belt_item_id, E.slot1 AS belt_slot1, E.slot2 AS belt_slot2, E.slot3 AS belt_slot3, ES1.name AS belt_skill1, ES2.name AS belt_skill2, ESL1.level as belt_skill1_level, ESL2.level as belt_skill2_level, E.min_def as belt_def, E.fire as belt_fire, E.water as belt_water, E.thunder as belt_thunder, E.ice as belt_ice, E.dragon as belt_dragon,
            F.item_id AS pants_item_id, F.slot1 AS pants_slot1, F.slot2 AS pants_slot2, F.slot3 AS pants_slot3, FS1.name AS pants_skill1, FS2.name AS pants_skill2, FSL1.level as pants_skill1_level, FSL2.level as pants_skill2_level, F.min_def as pants_def, F.fire as pants_fire, F.water as pants_water, F.thunder as pants_thunder, F.ice as pants_ice, F.dragon as pants_dragon
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
              WHERE A.name NOT LIKE '%Alpha%' AND A.name NOT LIKE '%Beta%'
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
            if (lowRank.length > 0) tabs += 1;
          },
        );
        tx.executeSql(
          `SELECT
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
            WHERE items.name LIKE ? ORDER BY SUBSTR(items.name,1,3)`
          , ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              weapons.push(results.rows.item(i));
            }
            if (weapons.length > 0) tabs += 1;
          },
        );
        tx.executeSql(
          `SELECT item_id, name, type FROM items WHERE type = 'item' AND LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)`,
          ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              items.push(row);
            }
            if (items.length > 0) tabs += 1;
          });
        tx.executeSql('SELECT * FROM quests WHERE LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)', ['%'+keyW+'%'], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            quests.push(row);
          }
          if (quests.length > 0) tabs += 1;
        });
        tx.executeSql(
          'SELECT * FROM armor_skills WHERE LOWER(name) LIKE ? ORDER BY SUBSTR(name,1,3)',
          ['%'+keyW+'%'], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              skills.push(row);
            }
            if (skills.length > 0) tabs += 1;
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
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i);
              decorations.push(row);
            }
            if (decorations.length > 0) tabs += 1;
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
            if (charms.length > 0) tabs += 1;
            this.setState({
              allMonsters, lowRank, items, skills, maps, quests, decorations, charms, weapons, loading: false, tabs
            });
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
        style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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
          <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 14.5, color: colors.secondary }}>{`${item.required_rank} \u2605`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderListMaps = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </Left>
      </ListItem>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'item',
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </ListItem>
    );
  }

  renderListDecorations = ({ item }) => {
    return (
      <ListItem
        style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </Left>
      <Right style= {{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: colors.secondary }}>{item.skill_name} +{item.skill_level}</Text>
      </Right>
      </ListItem>
    );
  }

  renderListSkills = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </Left>
      <Body>
        <Text style={{ fontSize: 13, color: colors.secondary }}>{item.description}</Text>
      </Body>
      </ListItem>
    );
  }

  renderListCharms = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      </Left>
      {this.renderSkills(item)}
      </ListItem>
    );
  }

  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <Right style={{ flex: 2 }}>
          <Text style={{ flex: 1, fontSize: 14, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ flex: 1, fontSize: 14, color: colors.secondary }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </Right>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Right style={{ flex: 2 }}>
          <Text style={{ flex: 1, fontSize: 14, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
        </Right>
      );
    }
    return (
      null
    );
  }

  renderContent(screen) {
    if (screen === 'monster') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <MonsterList navigator={this.props.navigator} monsters={this.state.allMonsters} type={'monster'}/>
        </View>
      );
    } else if (screen === 'armor') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <EquipArmorList navigator={this.props.navigator} armor={this.state.lowRank}/>
        </View>
      );
    } else if (screen === 'weapon') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            style={{ backgroundColor: colors.background }}
            initialNumToRender={8}
            data={this.state.weapons}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderListWeapons}
          />
        </View>
      );
    } else if (screen === 'item') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.items}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderListItems}
          />
        </View>
      );
    } else if (screen === 'skill') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.skills}
            keyExtractor={item => item.armor_skill_id.toString()}
            renderItem={this.renderListSkills}
          />
        </View>
      );
    } else if (screen === 'map') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.maps}
            keyExtractor={item => item.map_id.toString()}
            renderItem={this.renderListMaps}
          />
        </View>
      );
    } else if (screen === 'decoration') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.decorations}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderListDecorations}
          />
        </View>
      );
    } else if (screen === 'charm') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.charms}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderListCharms}
          />
        </View>
      );
    } else if (screen === 'quest') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.quests}
            keyExtractor={item => item.quest_id.toString()}
            renderItem={this.renderListQuests}
          />
        </View>
      );
    }
    return null;
  }

  renderTab(screen) {
    if (screen === 'monster' && this.state.allMonsters.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Monsters"
          >
          {this.renderContent('monster')}
        </Tab>
      );
    } else if (screen === 'armor' && this.state.lowRank.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Armor"
          >
          {this.renderContent('armor')}
        </Tab>
      );
    } else if (screen === 'weapon' && this.state.weapons.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Weapons"
          >
          {this.renderContent('weapon')}
        </Tab>
      );
    } else if (screen === 'item' && this.state.items.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Items"
          >
          {this.renderContent('item')}
        </Tab>
      );
    } else if (screen === 'quest' && this.state.quests.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Quests"
          >
          {this.renderContent('quest')}
        </Tab>
      );
    } else if (screen === 'charm' && this.state.charms.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Charms"
          >
          {this.renderContent('charm')}
        </Tab>
      );
    } else if (screen === 'decoration' && this.state.decorations.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Decorations"
          >
          {this.renderContent('decoration')}
        </Tab>
      );
    } else if (screen === 'skill' && this.state.skills.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Skills"
          >
          {this.renderContent('skill')}
        </Tab>
      );
    } else if (screen === 'map' && this.state.maps.length > 0) {
      return (
        <Tab
          activeTabStyle={{ backgroundColor: colors.background }}
          tabStyle={{ backgroundColor: colors.background }}
          activeTextStyle={{ color: colors.main }}
          textStyle={{ color: colors.secondary }}
          heading="Maps"
          >
          {this.renderContent('map')}
        </Tab>
      );
    }
    return null;
  }

  renderTabs() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background,
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (this.state.keyWord.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <Icon ios='ios-search-outline' android='ios-search-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 22.5, color: colors.secondary }}>Begin search using search bar</Text>
        </View>
      );
    } else if (this.state.keyWord.length > 0 && this.state.tabs === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 22.5, color: colors.secondary }}>No Results Found</Text>
        </View>
      );
    }
    if (this.state.tabs < 4) {
      return (
        <Tabs
        tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
        prerenderingSiblingsNumber={5}
        initialPage={0}>
          {this.renderTab('monster')}
          {this.renderTab('armor')}
          {this.renderTab('weapon')}
          {this.renderTab('item')}
          {this.renderTab('quest')}
          {this.renderTab('charm')}
          {this.renderTab('decoration')}
          {this.renderTab('skill')}
        </Tabs>
      );
    }
    return (
      <Tabs
      tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
      prerenderingSiblingsNumber={5}
      initialPage={0}
      renderTabBar={() => <ScrollableTab style={{ backgroundColor: colors.background, elevation: 2 }}/>}>
        {this.renderTab('monster')}
        {this.renderTab('armor')}
        {this.renderTab('weapon')}
        {this.renderTab('item')}
        {this.renderTab('quest')}
        {this.renderTab('charm')}
        {this.renderTab('decoration')}
        {this.renderTab('skill')}
      </Tabs>
    );
  }

  render() {
    console.log(this.state);
    let noShadow = true;
    let style = {
      borderBottomWidth: (Platform.OS !== 'ios') ? 0 : 0,
      borderBottomColor: colors.accent,
      backgroundColor: colors.background,
    };
    if (
      this.state.allMonsters.length <= 0
      && this.state.lowRank.length <= 0
      && this.state.weapons.length <= 0
      && this.state.items.length <= 0
      && this.state.skills.length <= 0
      && this.state.quests.length <= 0
      && this.state.decorations.length <= 0
      && this.state.charms.length <= 0
    ) {
      style = {
        borderBottomWidth: (Platform.OS !== 'ios') ? 2 : 1,
        borderBottomColor: colors.accent,
        backgroundColor: colors.background,
      };
      noShadow = false;
    }
    return (
      <Container style={{ backgroundColor: colors.background }}>
        <Header
          style={style}
          androidStatusBarColor='white'
          noShadow={noShadow}
          searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" onChangeText={text => this.searchMatchingWords(text)}/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        {this.renderTabs()}
       <AdBanner/>
      </Container>
    );
  }
}
