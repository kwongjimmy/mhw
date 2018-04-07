import React, { PureComponent } from 'react';
import { Platform, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right } from 'native-base';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class CharmScreen extends PureComponent {
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
          A.item_id as item_id, B.name as name,
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

  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 14, color: colors.secondary }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </Right>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
        </Right>
      );
    }
    return (
      null
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
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

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
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

  render() {
    return this.renderContent();
  }
}
