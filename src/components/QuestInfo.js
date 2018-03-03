import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, Tab, Tabs, ListItem, Text, Left, Body } from 'native-base';

export default class QuestInfo extends Component {
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
			
			tx.executeSql(
				'SELECT * FROM quest WHERE quest_id=?',
				[this.props.quest_id], (tx, results) => {
					info = results.rows.item(0);
				});

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
	
	  renderContent(screen) {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    if (screen === 'Info') {
      return (
          /*<ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>Quest Objective</Text>
            </Left>
          </ListItem>*/
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{this.state.info.objective}</Text>
            </Left>
          </ListItem>
      );
    }
  }
	
  render() {
    return (
			this.renderContent('Info')
		);
  }	

}
  