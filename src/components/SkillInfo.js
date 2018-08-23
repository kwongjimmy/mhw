import React, { PureComponent } from 'react';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import SkillEquip from './SkillEquip';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

class SkillInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      levels: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let info = {};
      let levels = [];

      tx.executeSql(
        'SELECT * FROM armor_skills WHERE armor_skill_id=?'
        , [this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          info = results.rows.item(0);
        });

      tx.executeSql(
        `SELECT B.level as level, B.armor_skill_level_id as level_id, B.description as description
          from armor_skills as A
          join armor_skills_levels as B on A.armor_skill_id = B.armor_skill_id
          WHERE A.armor_skill_id = ?`
        , [this.props.armor_skill_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            levels.push(row);
          }
          this.setState({
            info,
            levels,
            loading: false,
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

  renderLevels() {
    return this.state.levels.map((item, key) => (
        <ListItem key={key} style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
          <Left style={{ flex: 1 }}>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`Lv ${item.level}`}</Text>
          </Left>
          <Body style={{ flex: 3 }}>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.description}</Text>
          </Body>
        </ListItem>
    ));
  }

  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    if (screen === 'Info') {
      return (
        <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
          <ScrollView style={{ flex: 1, backgroundColor: this.props.theme.background }}>
            <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
              <Left>
                <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>Description</Text>
              </Left>
            </ListItem>
            <ListItem style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}>
              <Left>
                <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{this.state.info.description}</Text>
              </Left>
            </ListItem>
            <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
              <Left>
                <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>Level</Text>
              </Left>
              <Body>
              <Text></Text>
              </Body>
            </ListItem>
            {this.renderLevels()}
          </ScrollView>
        </View>

      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <SkillEquip navigator={this.props.navigator} armor_skill_id={this.props.armor_skill_id}/>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Tabs prerenderingSiblingsNumber={2} tabBarUnderlineStyle={{ backgroundColor: this.props.theme.accent, height: 3 }} initialPage={0}>
          <Tab
           activeTabStyle={{ backgroundColor: this.props.theme.background }}
           tabStyle={{ backgroundColor: this.props.theme.background }}
           activeTextStyle={{ color: this.props.theme.main }}
           textStyle={{ color: this.props.theme.secondary }}
           heading="Info"
           >
           {this.renderContent('Info')}
          </Tab>
          <Tab
           activeTabStyle={{ backgroundColor: this.props.theme.background }}
           tabStyle={{ backgroundColor: this.props.theme.background }}
           activeTextStyle={{ color: this.props.theme.main }}
           textStyle={{ color: this.props.theme.secondary }}
           heading="Equip"
           >
           {this.renderContent('Equip')}
          </Tab>
       </Tabs>
       <AdBanner />
      </Container>
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

export default connect(mapStateToProps, {})(SkillInfo);
