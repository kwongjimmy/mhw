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

  renderSlots(item) {
    let slot1 = (item.slot1 === 0) ? `-` : (item.slot1 === 1) ? `\u2460` : (item.slot1 === 2) ? `\u2461` : `\u2462`;
    let slot2 = (item.slot2 === 0) ? `-` : (item.slot2 === 1) ? `\u2460` : (item.slot2 === 2) ? `\u2461` : `\u2462`;
    let slot3 = (item.slot3 === 0) ? `-` : (item.slot3 === 1) ? `\u2460` : (item.slot3 === 2) ? `\u2461` : `\u2462`;
    return (
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.secondary, textAlign: 'center' }}>{`${slot1} ${slot2} ${slot3}`}</Text>
      </View>
    );
  }

  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
        </View>
      );
    }
    return (
      null
    );
  }

  renderListItems = ({ item }) => {
    return (
      <ArmorListItem item={item} navigator={this.props.navigator} monster={true}/>
      // <ListItem
      //   style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
      //   onPress={() => this.props.navigator.push({
      //   screen: 'TablessInfoScreen',
      //   passProps: {
      //     item_id: item.item_id,
      //     type: 'armor',
      //   },
      //   animationType: 'slide-horizontal',
      //   title: item.name,
      // })}
      // >
      //   <Left style={{ flex: 0.5 }}>
      //     <Image
      //       resizeMode="contain"
      //       style={{ alignSelf: 'center', width: 20, height: 20 }}
      //       source={ArmorImages[`${item.type.toLowerCase()} ${item.rarity}`]}
      //     />
      //   </Left>
      //   <Left style={{ flex: 1.25 }}>
      //     <Text style={{ flex: 1, fontSize: 15.5, color: colors.main }}>{item.name}</Text>
      //   </Left>
      //   <Body style={{ flex: 1.5, flexGrow: 2 }}>
      //     {this.renderSkills(item)}
      //   </Body>
      //   <Right style={{ flex: 0.5, flexGrow: 1 }}>
      //     {this.renderSlots(item)}
      //   </Right>
      // </ListItem>
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
    if (this.props.type === 'armor') {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
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
      <View style={{ flex: 1, backgroundColor: colors.background }}>
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
