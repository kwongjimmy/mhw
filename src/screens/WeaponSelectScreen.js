import React, { PureComponent } from 'react';
import { View, Image, FlatList, TouchableHighlight, Platform, ActivityIndicator } from 'react-native';
import { Container, ListItem, Body, Left, Right, Text } from 'native-base';
import { WeaponImages } from '../assets';
import AdBanner from '../components/AdBanner';

export default class WeaponSelectScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: '#ff6666',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      weapons: [
        {
          name: 'Great Sword',
          table: 'weapon_general_melee',
          type: 'great_sword',
        },
        {
          name: 'Long Sword',
          table: 'weapon_general_melee',
          type: 'long_sword',
        },
        {
          name: 'Sword and Shield',
          table: 'weapon_general_melee',
          type: 'sword_and_shield',
        },
        {
          name: 'Dual Blades',
          table: 'weapon_dual_blades',
          type: 'dual_blade',
        },
        {
          name: 'Hammer',
          table: 'weapon_general_melee',
          type: 'hammer',
        },
        {
          name: 'Hunting Horn',
          table: 'weapon_hunting_horns',
          type: 'hunting_horn',
        },
        {
          name: 'Lance',
          table: 'weapon_general_melee',
          type: 'lance',
        },
        {
          name: 'Gunlance',
          table: 'weapon_gunlances',
          type: 'gun_lance',
        },
        {
          name: 'Switch Axe',
          table: 'weapon_switch_axes',
          type: 'switch_axe',
        },
        {
          name: 'Charge Blade',
          table: 'weapon_charge_blades',
          type: 'charge_blade',
        },
        {
          name: 'Insect Glaive',
          table: 'weapon_insect_glaives',
          type: 'insect_glaive',
        },
        {
          name: 'Bow',
          table: 'weapon_bows',
          type: 'bow',
        },
        {
          name: 'Light Bowgun',
          table: 'weapon_bowguns',
          type: 'light_bowgun',
        },
        {
          name: 'Heavy Bowgun',
          table: 'weapon_bowguns',
          type: 'heavy_bowgun',
        },
      ],
      loading: true,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear' && this.state.loading) {
      this.setState({
        loading: false,
      });
    }
  }

  renderListItems = ({ item }) => {
    const src = WeaponImages[item.name];
    return (
      <ListItem
        style={{ height: 52, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'WeaponSelectedScreen',
        passProps: {
          type: item.type,
          item
        },
        animationType: 'slide-horizontal',
        title: item.name
        })}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 35, height: 35 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 6 }}>
        <Text style={{ fontSize: 20, color: '#191919' }}>{item.name}</Text>
      </Body>
      </ListItem>
    );
  }

  renderSelectList() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          initialNumToRender={10}
          data={this.state.weapons}
          keyExtractor={(item) => item.name}
          renderItem={this.renderListItems}
          getItemLayout={(data, index) => (
            { length: 52, offset: 52 * index, index }
          )}
        />
        <AdBanner />
      </View>
    );
  }

  render() {
    return this.renderSelectList();
  }
}
