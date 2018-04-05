import React, { Component } from 'react';
import { Platform, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right } from 'native-base';
import AdBanner from '../components/AdBanner';

export default class DecorationScreen extends Component {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: '#ff6666',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);

    db.transaction((tx) => {
      const items = [];
      tx.executeSql(
        `SELECT
          A.item_id as item_id, B.name as name, C.name as skill_name, D.level as skill_level
          FROM decorations AS A
          JOIN items AS B ON A.item_id = B.item_id
          LEFT JOIN armor_skills_levels AS D ON A.skill = D.armor_skill_level_id
          LEFT JOIN armor_skills AS C ON D.armor_skill_id = C.armor_skill_id`
        , [], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            items.push(row);
          }
          this.setState({ items });
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
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </Left>
      <Right style= {{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: '#8e8e8e' }}>{item.skill_name} +{item.skill_level}</Text>
      </Right>
      </ListItem>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
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
