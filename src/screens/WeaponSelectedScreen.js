import React, { PureComponent } from 'react';
import { FlatList, Platform, ActivityIndicator, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import WeaponListItem from '../components/WeaponListItem';
import KinsectListItem from '../components/KinsectListItem';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class WeaponSelectedScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      weapons: [],
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  componentWillMount() {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      const weapons = [];
      if (this.props.type === 'kinsect') {
        tx.executeSql(
          `SELECT A.*, B.name as name, B.rarity as rarity FROM kinsects AS A JOIN items AS B on A.item_id = B.item_id`
          , [], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              weapons.push(results.rows.item(i));
            }
            console.log(weapons);
            this.setState({
              loading: false,
              weapons,
            });
          },
        );
      } else {
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
          WHERE weapons.type = ?`
          , [this.props.type], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i += 1) {
              weapons.push(results.rows.item(i));
            }
            this.setState({
              loading: false,
              weapons,
            });
          },
        );
      }
    });
  }

  renderListItems = ({ item }) => {
    if (this.props.type === 'kinsect') {
      return (
        <KinsectListItem navigator={this.props.navigator} item={item}/>
      );
    }
    return (
      <WeaponListItem navigator={this.props.navigator} item={item} />
    );
  }

  renderSelectList() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <FlatList
        style={{ backgroundColor: colors.background }}
        initialNumToRender={16}
        data={this.state.weapons}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={this.renderListItems}
        // getItemLayout={(data, index) => (
        //   { length: 87.5, offset: 87.5 * index, index }
        // )}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {this.renderSelectList()}
        <AdBanner />
      </View>
    );
  }
}
