import React, { PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

export default class ItemScreen extends PureComponent {
  static navigatorStyle = {
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
        'SELECT item_id, name, category FROM items ORDER BY item_id',
        [], (tx, results) => {
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
    if (item.category === 'weapon') {
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 18 }} onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id: item.item_id,
            type: 'weapons',
            refetch: true,
          },
          animationType: 'slide-horizontal',
          title: item.name,
        })}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </ListItem>
      );
    }
    if (item.category === 'item') {
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 18 }} onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            item_id: item.item_id,
            type: item.category,
          },
          animationType: 'slide-horizontal',
          title: item.name,
        })}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
        </ListItem>
      );
    }
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18 }} onPress={() => this.props.navigator.push({
        screen: 'TablessInfoScreen',
        passProps: {
          item_id: item.item_id,
          type: `${item.category}s`,
        },
        animationType: 'slide-horizontal',
        title: item.name,
      })}>
        <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
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
      <FlatList
        style={{ backgroundColor: 'white' }}
        initialNumToRender={12}
        data={this.state.items}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={this.renderListItems}
        getItemLayout={(data, index) => (
          { length: 52, offset: 52 * index, index }
        )}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}
