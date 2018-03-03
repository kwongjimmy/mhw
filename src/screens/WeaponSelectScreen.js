import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableHighlight, Platform } from 'react-native';
import { Container, ListItem, Body, Left, Right } from 'native-base';

import { WeaponImages } from '../assets';

// Styles
import styles from '../screens/Styles/MonsterScreenStyles';

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
      weapons:
      [
        'Great Sword', 'Long Sword', 'Sword and Shield', 'Dual Blades',
        'Hammer', 'Hunting Horn', 'Lance', 'Gunlance', 'Switch Axe',
        'Charge Blade', 'Insect Glaive', 'Bow', 'Light Bowgun', 'Heavy Bowgun',
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
    const src = WeaponImages[item];
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'WeaponSelectedScreen',
        passProps: {
          type: item,
        },
        animationType: 'fade',
        title: item
        })}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 35, height: 35 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 5 }}>
        <Text style={{ fontSize: 20, color: '#191919'}}>{item}</Text>
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
        keyExtractor={(item) => item}
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
