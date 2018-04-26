import React, { PureComponent } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

export default class MonsterLoot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', location: 'Default',
      }, this.okCallback, this.errorCallback);
      db.transaction((tx) => {
        const data = [];
        const rank = this.props.lowRank ? 0 : 1;
        tx.executeSql(
          `SELECT
          loot.item_id,
          loot.chance,
          items.name as name,
          items.rarity,
          loot.quantity
          FROM monster_loot as loot
          INNER JOIN monster_loot_categories as cat ON loot.category_id = cat.category_id
          INNER JOIN items as items ON loot.item_id = items.item_id
          WHERE loot.monster_id = ? AND cat.rank = ? AND cat.name = ?`,
          [this.props.monster_id, rank, this.props.categoryName], (tx, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);
              data.push(row);
            }
            this.setState({
              data,
              loading: false,
            });
          },
        );
      });
    });
  }

  onNavigatorEvent(event) {
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
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id: item.item_id,
            type: 'item',
          },
          animationType: 'slide-horizontal',
          title: item.name,
        })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{`x${item.quantity}`}</Text>
        </Right>
        <Right>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{`${item.chance}%`}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: colors.secondary }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.data}
          keyExtractor={item => `${item.name} ${item.quantity} ${item.chance}`}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
        />
        <AdBanner />
      </View>
    );
  }
}
