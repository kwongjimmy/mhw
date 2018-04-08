import React, { PureComponent } from 'react';
import { Platform, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right } from 'native-base';
import _ from 'lodash';
import AdBanner from '../components/AdBanner';


// Styles
import colors from '../styles/colors';

export default class CombinationScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      crafting: [],
      loading: true,
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let crafting = [];
      tx.executeSql(
        `SELECT A.*, B.name as name, C.name as material_name
          FROM crafting as A
          JOIN items as B ON A.item_id = B.item_id
          JOIN items as C on A.item_material_id = C.item_id
          WHERE craft_id NOT NULL`
        , [], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            crafting.push(row);
          }
          crafting = _.groupBy(crafting, item => item.craft_id);
          crafting = _.values(crafting);
          this.setState({ crafting, loading: false });
        },
      );
    });
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

  renderMaterials(item) {
    if (item.length > 1) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: colors.secondary, textAlign: 'right' }}>{`${item[0].material_name} x${item[0].quantity}`}</Text>
          <Text style={{ fontSize: 12, color: colors.secondary, textAlign: 'right' }}>{`${item[1].material_name} x${item[1].quantity}`}</Text>
        </Right>
      );
    }
    return (
      <Right style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, color: colors.secondary, textAlign: 'right' }}>{`${item[0].material_name} x${item[0].quantity}`}</Text>
      </Right>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item[0].item_id,
          type: 'item'
        },
        animationType: 'slide-horizontal',
        title: item[0].name,
      })}>
      <Left style={{ flex: 2 }}>
        <Text style={{ fontSize: 15.5, color: colors.main }}>{item[0].name}</Text>
      </Left>
      {this.renderMaterials(item)}
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
          initialNumToRender={24}
          data={this.state.crafting}
          keyExtractor={item => item[0].craft_id.toString()}
          renderItem={this.renderListItems}
        />
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderContent();
  }
}
