import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs } from 'native-base';

export default class SearchScreen extends Component {
  static navigatorStyle = {
    topBarBorderColor: 'red',
    topBarBorderWidth: 20,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  render() {
    return (
      <Text>Hey</Text>
    );
  }
}
