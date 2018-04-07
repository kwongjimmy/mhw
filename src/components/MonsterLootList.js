import React, { PureComponent } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import AdBanner from './AdBanner';

// Styles
import colors from '../styles/colors';

export default class MonsterLootList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.monster_loot,
      lowRank: this.props.lowRank,
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
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            monster_id: this.props.monster_id,
            categoryName: item.name,
            type: 'monsterLoot',
            lowRank: this.state.lowRank,
          },
          animationType: 'slide-horizontal',
          title: item.name,
        })}>
        <Left>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
        </Left>
        <Right>
        </Right>
      </ListItem>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: colors.secondary }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: colors.secondary }}>No Data</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={12}
          data={this.state.data}
          keyExtractor={item => item.name}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
        />
      </View>
    );
  }
}
