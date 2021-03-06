import React, { Component } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator, StyleSheet } from 'react-native';
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
          style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.background }]}
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
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.quest_name}</Text>
          </Left>
          <Right style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 14.5, color: this.props.theme.secondary, textAlign: 'right' }}>{item.type.replace('Assignment', '')}</Text>
            <Text style={{ fontSize: 14.5, color: this.props.theme.secondary, textAlign: 'right' }}>{`${item.required_rank} \u2605`}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background,
        }}>
          <ActivityIndicator size="large" color={this.props.theme.main}/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: this.props.theme.background }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: this.props.theme.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: this.props.theme.secondary }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  listItem: {
    height: 60,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
