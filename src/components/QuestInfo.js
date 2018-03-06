import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Container, ListItem, Text, Left, Body, Right } from 'native-base';
import DropDown from './DropDown';

export default class QuestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: {},
      rewards: [],
      monsters: [],
    };

    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: 'mhworld.db', location: 'Default',
    });

    db.transaction((tx) => {
      let info = {};
      let rewards = [];
      tx.executeSql(
        `SELECT A.*, B.*, C.name
					FROM quests AS A
					JOIN quest_items AS B ON A.quest_id = B.quest_id
					JOIN items as C ON B.item_id = C.item_id
					WHERE A.quest_id=? AND B.condition = '1'`,
        [this.props.quest_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            rewards.push(results.rows.item(i));
          }
          this.setState({
            loading: false,
            rewards,
          });
          console.log(this.state);
        }
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
				<DropDown
					headerName={'Rewards'}
					content={this.state.rewards.map((item, key) => {
					return (
						<ListItem
							style={{ marginLeft: 0, paddingLeft: 8 }}
							onPress={() => this.props.navigator.push({
								screen: 'TabInfoScreen',
								passProps: {
									item_id: item.item_id,
									type: 'item',
								},
								animationType: 'fade',
								title: item.name,
							})}
							key={key}>
							<Left>
								<Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
							</Left>
							<Right>
                <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.chance}%`}</Text>
              </Right>
						</ListItem>
					);
				})}
			/>
			</View>
    );
  }

  render() {
    return (
			<ScrollView>
				{this.renderContent()}
			</ScrollView>
		);
  }
}
