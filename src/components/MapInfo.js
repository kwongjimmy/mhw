import React, { PureComponent } from 'react';
import { ScrollView, FlatList, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body, Right, Icon } from 'native-base';
import _ from 'underscore';
import DropDown from './DropDown';
import AdBanner from './AdBanner';

export default class MapInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      areas: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let areas = [];
      tx.executeSql(
        `SELECT DISTINCT A.map_id as map_id, A.name as name, B.area as area, C.name as item_name, C.item_id as item_id
          FROM maps AS A JOIN map_items as B ON A.map_id = B.map_id JOIN items as C ON B.item_id = C.item_id
          WHERE A.map_id = ?`
        , [this.props.map_id], (tx, results) => {
        // Get rows with Web SQL Database spec compliance.
          // let area = 0;
          // let first = true;
          // let areaArr = [];
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            areas.push(row);
          }
          areas = _.groupBy(areas, area => area.area);
          areas = _.values(areas);
          this.setState({
            areas,
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

  renderListItems = ({ item }) => {
    return (
        <DropDown
          headerName={`Area ${item[0].area}`}
          hide={true}
          content={item.map((item2, key2) => {
          return (
            <ListItem
              style={{ marginLeft: 0, paddingLeft: 8 }}
              onPress={() => this.props.navigator.push({
                screen: 'TablessInfoScreen',
                passProps: {
                  item_id: item2.item_id,
                  type: 'item',
                },
                animationType: 'slide-horizontal',
                title: item2.item_name,
              })}
              key={key2}>
              <Left>
                <Text style={{ fontSize: 15.5, color: '#191919' }}>{item2.item_name}</Text>
              </Left>
              <Right>
              </Right>
            </ListItem>
          );
        })}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (!this.state.loading && this.state.areas.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: '#8e8e8e' }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: '#8e8e8e' }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.areas}
          keyExtractor={item => `${item[0].area} ${item[0].item_name}`}
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
