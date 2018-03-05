import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, ListItem, Text, Left, Right } from 'native-base';

export default class DecorationScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
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
          A.item_id as item_id, B.name as name
          FROM decorations AS A
          JOIN items AS B ON A.item_id = B.item_id`
        , [], (tx, results) => {
        const len = results.rows.length;
        for(let i = 0; i < len; i += 1) {
          const row = results.rows.item(i);
          items.push(row);
        }
        this.setState({ items });
        db.close();
       },
      );
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  renderListItems = ({ item }) => {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: 'decorations'
        },
        animationType: 'fade',
        title: item.name,
      })}>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
      </ListItem>
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
        data={this.state.items}
        keyExtractor={(item) => item.item_id.toString()}
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
