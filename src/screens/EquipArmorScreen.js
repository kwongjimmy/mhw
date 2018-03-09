import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';
import EquipArmorList from '../components/EquipArmorList';

export default class EquipArmorScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highRank: [],
      lowRank: [],
      loading: true,
    };
  }

  componentWillMount() {
  }

  getData() {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const lowRank = [];
      const highRank = [];
      tx.executeSql(`
        SELECT
        X.*,
        I1.name AS head_name,
        I2.name AS armor_name,
        I3.name AS gloves_name,
        I4.name AS belt_name,
        I5.name AS pants_name
        FROM
        ( SELECT
          A.name, A.armor_set_id, B.rank,
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
        WHERE X.rank = ?`, ['High'], (tx, results) => {
        for (let i = 0; i < results.rows.length; i += 1) {
          const row = results.rows.item(i);
          highRank.push(row);
        }
      });
      tx.executeSql(`
        SELECT
          X.*,
          I1.name AS head_name,
          I2.name AS armor_name,
          I3.name AS gloves_name,
          I4.name AS belt_name,
          I5.name AS pants_name
          FROM
          ( SELECT
            A.name, A.armor_set_id, B.rank,
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
          WHERE X.rank = ?`, ['Low'], (tx, results) => {
        for (let i = 0; i < results.rows.length; i += 1) {
          const row = results.rows.item(i);
          lowRank.push(row);
        }
        this.setState({ highRank, lowRank, loading: false });
      });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.getData();
    }, 200);
  }

  componentWillUnmount() {
    // db.close();
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'low') {
      return (
        <EquipArmorList navigator={this.props.navigator} armor={this.state.lowRank}/>
      );
    }
    return (
      <EquipArmorList navigator={this.props.navigator} armor={this.state.highRank}/>
    );
  }

  render() {
    return (
       <Tabs prerenderingSiblingsNumber={0} scrollWithoutAnimation={false} tabBarUnderlineStyle={{ backgroundColor: 'red', height: 3 }} initialPage={0}>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="Low Rank"
           >
           {this.renderContent('low')}
         </Tab>
         <Tab
           activeTabStyle={{ backgroundColor: 'white' }}
           tabStyle={{ backgroundColor: 'white' }}
           activeTextStyle={{ color: '#191919', fontWeight: '100' }}
           textStyle={{ color: '#5e5e5e' }}
           heading="High Rank"
           >
           {this.renderContent('high')}
         </Tab>
       </Tabs>
    );
  }
}
