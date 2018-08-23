import React, { PureComponent } from 'react';
import { Platform, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from '../components/AdBanner';
import CharmListItem from '../components/CharmListItem';
// Styles
import colors from '../styles/colors';

class CharmScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const items = [];
      tx.executeSql(
        `SELECT
          A.item_id as item_id, B.name as name, B.rarity as rarity,
          CL1.name as skill1_name, C1.level as skill1_level,
          CL2.name as skill2_name, C2.level as skill2_level
          FROM charms AS A
          JOIN items AS B ON A.item_id = B.item_id
          LEFT JOIN armor_skills_levels AS C1 ON A.armor_skill_1 = C1.armor_skill_level_id
          LEFT JOIN armor_skills_levels AS C2 ON A.armor_skill_2 = C2.armor_skill_level_id
          LEFT JOIN armor_skills AS CL1 ON C1.armor_skill_id = CL1.armor_skill_id
          LEFT JOIN armor_skills AS CL2 ON C2.armor_skill_id = CL2.armor_skill_id`
        , [], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            items.push(row);
          }
          this.setState({ items });
          // db.close();
        },
      );
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  renderListItems = ({ item }) => {
    return (
      <CharmListItem navigator={this.props.navigator} item={item} />
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
        <FlatList
          style={{ backgroundColor: this.props.theme.background }}
          initialNumToRender={11}
          data={this.state.items}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 60, offset: 60 * index, index }
          )}
        />
        <AdBanner />
      </View>
    );
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
    return this.renderContent();
  }
}

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(CharmScreen);
