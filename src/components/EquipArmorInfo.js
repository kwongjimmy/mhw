import React, { PureComponent } from 'react';
import { Image, View, ActivityIndicator, InteractionManager, ScrollView, StyleSheet} from 'react-native';
import { ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';
import { ElementStatusImages } from '../assets';

// Styles
import colors from '../styles/colors';

class EquipArmorInfo extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      materials: [],
      skills: [],
      setBonus: null,
    };
    InteractionManager.runAfterInteractions(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', location: 'Default',
      }, this.okCallback, this.errorCallback);
      db.transaction((tx) => {
        let materials = [];
        let info = {};
        let setBonus = null;
        let skills = [];
        tx.executeSql('SELECT * FROM armor as A JOIN items AS B ON A.item_id = B.item_id WHERE A.item_id = ?', [this.props.item_id], (tx, results) => {
          info = results.rows.item(0);
        });
        tx.executeSql(
          `SELECT D.item_id, D.name, C.quantity
          FROM armor as A
          JOIN items AS B ON A.item_id = B.item_id
          JOIN crafting AS C ON A.item_id = C.item_id
          JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
          , [this.props.item_id], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              materials.push(results.rows.item(i));
            }
          },
        );
        tx.executeSql(
          `SELECT
            A.*,
            B.name as set_bonus,
            B.pieces as pieces,
            B.pieces_2 as pieces_2,
            SL1.level as set_bonus_skill1_level,
            SL2.level as set_bonus_skill2_level,
            S1.name as skill1,
            S1.armor_skill_id as skill1_id,
            S2.name as skill2,
            S2.armor_skill_id as skill2_id
            FROM (
              SELECT armor_set_id FROM armor_sets
              WHERE item_1 = ? OR item_2 = ? OR item_3 = ? OR item_4 = ? OR item_5 = ?
            ) AS A
            LEFT JOIN armor_set_bonus AS B ON A.armor_set_id = B.set_id
            LEFT JOIN armor_skills_levels AS SL1 ON B.skill = SL1.armor_skill_level_id
            LEFT JOIN armor_skills_levels AS SL2 ON B.skill_2 = SL2.armor_skill_level_id
            LEFT JOIN armor_skills AS S1 ON S1.armor_skill_id = SL1.armor_skill_id
            LEFT JOIN armor_skills AS S2 ON S2.armor_skill_id = SL2.armor_skill_id`
          , [this.props.item_id,this.props.item_id,this.props.item_id,this.props.item_id,this.props.item_id], (tx, results) => {
            setBonus = results.rows.item(0);
          },
        );
        tx.executeSql(
          `SELECT
            B.armor_skill_id as skill1_id, B.level as skill1_level, B1.name as skill1_name,
            C.armor_skill_id as skill2_id, C.level as skill2_level, C1.name as skill2_name
            FROM armor as A
            LEFT JOIN armor_skills_levels AS B ON A.skill1 = B.armor_skill_level_id
            LEFT JOIN armor_skills_levels AS C ON A.skill2 = C.armor_skill_level_id
            LEFT JOIN armor_skills AS B1 ON B.armor_skill_id = B1.armor_skill_id
            LEFT JOIN armor_skills AS C1 ON C.armor_skill_id = C1.armor_skill_id
            WHERE A.item_id = ?`
          , [this.props.item_id], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              skills.push(results.rows.item(i));
            }
            this.setState({
              info, setBonus, materials, skills, loading: false,
            });
          },
        );
      });
    });
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      // console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderInfo() {
    const {
      buy_price, min_def, rarity, slot1, slot2, slot3, fire, water, thunder, ice, dragon
    } = this.state.info;
    let slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    let slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    let slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;
    return (
      <View>
        <ListItem style={[styles.listItem, { backgroundColor: this.props.theme.listItemHeader }]}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Defense</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Price</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={[styles.listItem, { backgroundColor: this.props.theme.listItem }]}>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{min_def}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{`${buy_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
        <ListItem style={[styles.listItem, { backgroundColor: this.props.theme.listItemHeader }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Fire']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Water']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Thunder']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Ice']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Dragon']}
            />
          </View>
        </ListItem>
        <ListItem style={[styles.listItem, { backgroundColor: this.props.theme.listItem }]}>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{fire}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{water}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{thunder}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{ice}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{dragon}</Text>
        </ListItem>
      </View>
    );
  }

  renderSkill2() {
    if (this.state.skills[0].skill2_name !== null) {
      return (
        <ListItem
          style={[styles.listItem, {
            height: 55,
            backgroundColor: this.props.theme.listItem,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: this.props.theme.border,
          }]}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              armor_skill_id: this.state.skills[0].skill2_id,
              type: 'skill',
            },
            animationType: 'slide-horizontal',
            title: this.state.skills[0].skill2_name,
          })}
          >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{this.state.skills[0].skill2_name}</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`+${this.state.skills[0].skill2_level}`}</Text>
          </Right>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderSkill1() {
    return (
      <ListItem
        style={[styles.listItem, {
          height: 55,
          backgroundColor: this.props.theme.listItem,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: this.props.theme.border,
        }]}
        onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.state.skills[0].skill1_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.state.skills[0].skill1_name,
        })}
        >
        <Left>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{this.state.skills[0].skill1_name}</Text>
        </Left>
        <Right>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`+${this.state.skills[0].skill1_level}`}</Text>
        </Right>
      </ListItem>
    );
  }

  renderSkills() {
    if (this.state.skills[0].skill1_name !== null) {
      return (
        <View>
          <ListItem style={[styles.listItem, { height: 55, backgroundColor: this.props.theme.listItemHeader }]}>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Skill</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.secondary }}></Text>
            </Right>
          </ListItem>
          {this.renderSkill1()}
          {this.renderSkill2()}
        </View>
      );
    }
    return (
      null
    );
  }

  renderCrafting() {
    return (
      <View>
        <ListItem style={[styles.listItem, { height: 55, backgroundColor: this.props.theme.listItemHeader }]}>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Material</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, justifyContent: 'center', color: this.props.theme.secondary }}>Quantity</Text>
          </Right>
        </ListItem>
        {this.state.materials.map((item, key) => {
          return (
            <View key={key}>
              <ListItem
                style={[styles.listItem, {
                  height: 55,
                  backgroundColor: this.props.theme.listItem,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: this.props.theme.border,
                }]}
                onPress={() => this.props.navigator.push({
                  screen: 'TablessInfoScreen',
                  passProps: {
                    item_id: item.item_id,
                    type: 'item',
                  },
                  animationType: 'slide-horizontal',
                  title: item.name,
                })}
                >
                <Left>
                  <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                </Left>
                <Right>
                  <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`x${item.quantity}`}</Text>
                </Right>
              </ListItem>
            </View>
          );
        })
        }
      </View>
    );
  }

  renderSetBonus() {
    if (this.state.setBonus.set_bonus !== null) {
      return (
        <View>
          <ListItem style={[styles.listItem, { height: 55, backgroundColor: this.props.theme.listItemHeader }]}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.setBonus.set_bonus} Set Bonus`}</Text>
          </ListItem>
          {this.renderSetBonus1()}
          {this.renderSetBonus2()}
        </View>
      );
    }
    return null;
  }

  renderSetBonus1() {
    if (this.state.setBonus.skill1 !== null) {
      return (
        <ListItem
          style={[styles.listItem, {
            height: 55,
            backgroundColor: this.props.theme.listItem,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: this.props.theme.border,
          }]}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.state.setBonus.skill1_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.state.setBonus.skill1,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>
              {`(${this.state.setBonus.pieces} pieces) ${this.state.setBonus.skill1}`}
            </Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>
              {`+${this.state.setBonus.set_bonus_skill1_level}`}
            </Text>
          </Right>
        </ListItem>
      );
    }
    return null;
  }

  renderSetBonus2() {
    if (this.state.setBonus.skill2 !== null) {
      return (
        <ListItem
          style={[styles.listItem, {
            height: 55,
            backgroundColor: this.props.theme.listItem,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: this.props.theme.border,
          }]}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.state.setBonus.skill2_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.state.setBonus.skill2,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>
              {`(${this.state.setBonus.pieces_2} pieces) ${this.state.setBonus.skill2}`}
            </Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>
              {`+${this.state.setBonus.set_bonus_skill2_level}`}
            </Text>
          </Right>
        </ListItem>
      );
    }
    return null;
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <ScrollView style={{ backgroundColor: this.props.theme.background }}>
          {this.renderInfo()}
          {this.renderSkills()}
          {this.renderSetBonus()}
          {this.renderCrafting()}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  listHeader: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
  },
  listItem: {
    height: 45,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(EquipArmorInfo);
