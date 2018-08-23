import React, { PureComponent } from 'react';
import { ScrollView, View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, ListItem, Text, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import DropDown from './DropDown';
import { ArmorImages } from '../assets/';

// Styles
import colors from '../styles/colors';

class SkillEquip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      armor: [],
      charms: [],
      decorations: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let armor = [];
      let charms = [];
      let decorations = [];
      tx.executeSql(
        `SELECT
          A.item_id as item_id, A.rank as rank, A.type as type,
          A.slot1, A.slot2, A.slot3,
          C.name as name, C.rarity as rarity,
          B1.level as level
          FROM armor AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.skill1 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?
          UNION
          SELECT
          A.item_id as item_id, A.rank as rank, A.type as type,
          A.slot1, A.slot2, A.slot3,
          C.name as name, C.rarity as rarity,
          B1.level as level
          FROM armor as A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.skill2 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?`
        , [this.props.armor_skill_id, this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            armor.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT
          A.item_id as item_id,
          C.name as name,
          B1.level as level
          FROM charms AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.armor_skill_1 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?
          UNION
          SELECT
          A.item_id as item_id,
          C.name as name,
          B1.level as level
          FROM charms AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.armor_skill_2 = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?`
        , [this.props.armor_skill_id, this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            charms.push(row);
          }
        },
      );
      tx.executeSql(
        `SELECT
          A.item_id as item_id,
          C.name as name,
          B1.level as level
          FROM decorations AS A
          JOIN items AS C ON A.item_id = C.item_id
          LEFT JOIN armor_skills_levels AS B1 ON A.skill = B1.armor_skill_level_id
          WHERE B1.armor_skill_id = ?`
        , [this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            decorations.push(row);
          }
          this.setState({
            armor,
            charms,
            decorations,
            loading: false,
          });
        },
      );
    });
  }

  renderArmor() {
    if (this.state.armor.length > 0) {
      return (
        <View>
          <DropDown
            headerName={'Armor'}
            hide={true}
            content={this.state.armor.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
                onPress={() => this.props.navigator.push({
                screen: 'EquipInfoScreen',
                passProps: {
                  item_id: item.item_id,
                  type: 'armor',
                },
                animationType: 'slide-horizontal',
                title: item.name,
                })}>
                <Left style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center', height: 20, width: 20 }}
                    source={ArmorImages[`${item.type.toLowerCase()} ${item.rarity}`]}
                  />
                </Left>
                <Left style={{ flex: 2 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                </Left>
                <Right style={{ flex: 2 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`+${item.level}`}</Text>
                </Right>
              </ListItem>
            );
          })}
          />
        </View>
      );
    }
    return (
      null
    );
  }

  renderCharms() {
    if (this.state.charms.length > 0) {
      return (
        <View>
          <DropDown
            headerName={'Charms'}
            hide={true}
            content={this.state.charms.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
                onPress={() => this.props.navigator.push({
                screen: 'TablessInfoScreen',
                passProps: {
                  item_id: item.item_id,
                  type: 'charms',
                },
                animationType: 'slide-horizontal',
                title: item.name
                })}
                >
                <Left>
                  <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                </Left>
                <Right>
                  <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`+${item.level}`}</Text>
                </Right>
              </ListItem>
            );
          })}
          />
        </View>
      );
    }
    return (
      null
    );
  }

  renderDecorations() {
    if (this.state.decorations.length > 0) {
      return (
        <View>
          <DropDown
            headerName={`Decorations`}
            hide={true}
            content={this.state.decorations.map((item, key) => {
              return (
                <ListItem
                  key={key}
                  style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
                  onPress={() => this.props.navigator.push({
                  screen: 'TablessInfoScreen',
                  passProps: {
                    item_id: item.item_id,
                    type: 'decorations',
                  },
                  animationType: 'slide-horizontal',
                  title: item.name
                  })}
                  >
                  <Left>
                    <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`+${item.level}`}</Text>
                  </Right>
                </ListItem>
              );
            })}
          />
        </View>
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderArmor()}
        {this.renderCharms()}
        {this.renderDecorations()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
  },
  listItem: {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(SkillEquip);
