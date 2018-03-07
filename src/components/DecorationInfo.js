import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';

export default class DecorationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},

    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let info = {};
      tx.executeSql(`SELECT * FROM decorations WHERE item_id=?`,
        [this.props.item_id], (tx, results) => {
          info = results.rows.item(0);
          this.setState({
            loading: false,
            info,
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

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Mysterious Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.mysterious}%</Text>
          </Right>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Glowing Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.glowing}%</Text>
          </Right>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>Worn Feystone</Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: '#8e8e8e' }}>{this.state.info.worn}%</Text>
          </Right>
        </ListItem>
      </View>
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
