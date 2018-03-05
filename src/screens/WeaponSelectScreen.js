import React, { Component } from 'react';
import { Image, View, FlatList, TouchableHighlight, Platform } from 'react-native';
import { Container, ListItem, Body, Left, Right, Text } from 'native-base';
import { WeaponImages } from '../assets';

export default class WeaponSelectScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: 'red',
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    this.state = {
      weapons1:
      [
        'Great Sword', 'Long Sword', 'Sword and Shield', 'Dual Blades',
        'Hammer', 'Hunting Horn', 'Lance', 'Gunlance', 'Switch Axe',
        'Charge Blade', 'Insect Glaive', 'Bow', 'Light Bowgun', 'Heavy Bowgun',
      ],
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
          type: 'gunlance',
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
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.weaponSelectList.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  }

  renderListItems = ({ item }) => {
    const src = WeaponImages[item.name];
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'WeaponSelectedScreen',
        passProps: {
          name: item.name,
          type: item.type,
          table: item.table,
          item
        },
        animationType: 'fade',
        title: item.name
        })}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 35, height: 35 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 5 }}>
        <Text style={{ fontSize: 20, color: '#191919'}}>{item.name}</Text>
      </Body>
      <Right>
      </Right>
      </ListItem>
    );
  }

  renderSelectList() {
    return (
      <FlatList
        data={this.state.weapons}
        keyExtractor={(item) => item.name}
        renderItem={this.renderListItems}
        ref={(ref) => { this.weaponSelectList = ref; }}
      />
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderSelectList()}
      </Container>
    );
  }
}
