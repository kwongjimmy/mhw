import React, { PureComponent } from 'react';
import { View, FlatList, InteractionManager, ActivityIndicator, Image } from 'react-native';
import { Text, ListItem, Right, Left, Body, Icon } from 'native-base';
import WeaponListItem from './WeaponListItem';
import ArmorListItem from './ArmorListItem';
import AdBanner from './AdBanner';
import { ArmorImages } from '../assets';

// Styles
import colors from '../styles/colors';

export default class MonsterEquip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      armor: true,
      data: this.props.data,
      loading: true,
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

  renderWeaponListItems = ({ item }) => {
    return (
      <WeaponListItem navigator={this.props.navigator} item={item} />
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ArmorListItem navigator={this.props.navigator} item={item} monster={true}/>
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
    if (this.props.type === 'armor') {
      return (
        <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
          <FlatList
            initialNumToRender={11}
            data={this.state.data}
            keyExtractor={(item) => item.item_id.toString()}
            renderItem={this.renderListItems.bind(this)}
            getItemLayout={(data, index) => (
              { length: 52, offset: 52 * index, index }
            )}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
        <FlatList
          initialNumToRender={7}
          data={this.state.data}
          keyExtractor={(item) => item.item_id.toString()}
          renderItem={this.renderWeaponListItems.bind(this)}
        />
      </View>
    );
  }
}
