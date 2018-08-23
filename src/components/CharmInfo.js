import React, { PureComponent } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { ListItem, Text, Right, Left } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

class CharmInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      materials: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let materials = [];
      let info = {};
      tx.executeSql(
        `SELECT
          A.*, B.*,
          CL1.name as skill1_name, C1.level as skill1_level, CL1.armor_skill_id as skill1_id,
          CL2.name as skill2_name, C2.level as skill2_level, CL2.armor_skill_id as skill2_id
          FROM charms AS A
          JOIN items AS B ON A.item_id = B.item_id
          LEFT JOIN armor_skills_levels AS C1 ON A.armor_skill_1 = C1.armor_skill_level_id
          LEFT JOIN armor_skills_levels AS C2 ON A.armor_skill_2 = C2.armor_skill_level_id
          LEFT JOIN armor_skills AS CL1 ON C1.armor_skill_id = CL1.armor_skill_id
          LEFT JOIN armor_skills AS CL2 ON C2.armor_skill_id = CL2.armor_skill_id
          WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          info = results.rows.item(0);
        }
      );
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM charms as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN crafting AS C ON A.item_id = C.item_id
        JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            materials.push(results.rows.item(i));
          }
          this.setState({ info, materials, loading: false });
        }
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
    const {
      buy_price, sell_price, rarity,
    } = this.state.info;
    return (
      <View>
        <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Buy</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Sell</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{`${buy_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{`${sell_price}z`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main, textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
      </View>
    );
  }

  renderSkillBody() {
    if (this.state.info.skill1_name !== null && this.state.info.skill2_name !== null) {
      return (
        <View>
          <ListItem
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
            onPress={() => this.props.navigator.push({
              screen: 'TabInfoScreen',
              passProps: {
                armor_skill_id: this.state.info.skill1_id,
                type: 'skill',
              },
              animationType: 'slide-horizontal',
              title: this.state.info.skill1_name,
            })}
            >
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.info.skill1_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.info.skill1_level}`}</Text>
            </Right>
          </ListItem>
          <ListItem
            style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
            onPress={() => this.props.navigator.push({
              screen: 'TabInfoScreen',
              passProps: {
                armor_skill_id: this.state.info.skill2_id,
                type: 'skill',
              },
              animationType: 'slide-horizontal',
              title: this.state.info.skill2_name,
            })}
            >
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.info.skill2_name}`}</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.info.skill2_level}`}</Text>
            </Right>
          </ListItem>
      </View>
      );
    } else if (this.state.info.skill1_name !== null && this.state.info.skill2_name === null) {
      return (
        <ListItem
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              armor_skill_id: this.state.info.skill1_id,
              type: 'skill',
            },
            animationType: 'slide-horizontal',
            title: this.state.info.skill1_name,
          })}
          >
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`${this.state.info.skill1_name}`}</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>{`+${this.state.info.skill1_level}`}</Text>
          </Right>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderSkills() {
    return (
      <View>
        <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Skill</Text>
          </Left>
        </ListItem>
        {this.renderSkillBody()}
      </View>
    );
  }

  renderCrafting() {
    return (
      <View>
        <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
          <Left>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.main }}>Material</Text>
          </Left>
          <Right>
            <Text style={{ flex: 1, fontSize: 15.5, color: this.props.theme.secondary }}>Quantity</Text>
          </Right>
        </ListItem>
        {this.state.materials.map((item, key) => {
          return (
            <View key={key}>
              <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
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
        <ScrollView>
          {this.renderInfo()}
          {this.renderSkills()}
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

export default connect(mapStateToProps, {})(CharmInfo);
