import React, { Component } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';

export default class MapInfo extends Component {
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
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            areas.push(row);
          }
          this.setState({
            areas,
            loading: false,
          });
          console.log(this.state);
        },
      );
    });
    this.currentArea = '';
  }


  renderHeader(item) {
    if (this.currentArea !== item.area) {
      this.currentArea = item.area;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`Area ${this.currentArea}`}</Text>
          </Left>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderListItems = ({ item }) => {
    return (
      <View>
        {this.renderHeader(item)}
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TabInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'item',
            },
            animationType: 'fade',
            title: item.item_name,
          })}
          >
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.item_name}</Text>
          </Left>
        </ListItem>
      </View>
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.areas}
        keyExtractor={(item) => `${item.map_id} ${item.area} ${item.item_id}`}
        renderItem={this.renderListItems}
      />
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderContent()}
      </Container>
    );
  }
}
