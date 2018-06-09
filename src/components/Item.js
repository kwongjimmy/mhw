import React, { PureComponent } from 'react';
import { Text, ActivityIndicator, InteractionManager, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem } from 'native-base';
import _ from 'lodash';

export default class Item extends PureComponent {
  _onClick = () => this.props.navigator.push({
    screen: 'TablessInfoScreen',
    passProps: {
      item_id: this.props.item.item_id,
      type: 'item',
    },
    animationType: 'slide-horizontal',
    title: this.props.item.name,
  });

  render() {
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={this._onClick}
      >
        {this.props.children}
      </ListItem>
    );
  }
}
