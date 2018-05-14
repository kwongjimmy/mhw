import React, { Component } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Body, Icon } from 'native-base';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

export default class MonsterQuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: this.props.monster_quest
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
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
      <View>
        <ListItem
          style={{ height: 65, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            type: 'quests',
            quest_id: item.quest_id,
          },
          animationType: 'slide-horizontal',
          title: item.quest_name,
        })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: colors.main }}>{item.quest_name}</Text>
          </Left>
          <Right style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 14.5, color: colors.secondary, textAlign: 'right' }}>{item.type.replace('Assignment', '')}</Text>
            <Text style={{ fontSize: 14.5, color: colors.secondary, textAlign: 'right' }}>{`${item.required_rank} \u2605`}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background,
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: colors.background }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: colors.secondary }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          initialNumToRender={8}
          data={this.state.data}
          keyExtractor={(item) => item.quest_id.toString()}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 65, offset: 65 * index, index }
          )}
        />
      </View>
    );
  }
}
