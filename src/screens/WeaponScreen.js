import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableHighlight } from 'react-native';

import { WeaponImages } from '../assets';

// Styles
import styles from '../screens/Styles/MonsterScreenStyles';

let top = true;
export default class WeaponScreen extends Component {
  static navigatorStyle = {
    // navBarHideOnScroll: true,
    topBarBorderColor: 'red',
    topBarBorderWidth: 15,
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
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      });
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  renderListItems = ({ item }) => {
    const src = WeaponImages[item];
    return (
      <TouchableHighlight activeOpacity={0.5} underlayColor={'white'}
        >
        <View style={[styles.monsterContainer, { borderWidth: 0, justifyContent: 'center' }]}>
          <View style={styles.monsterImageContainer}>
            <Image
              resizeMode="contain"
              style={styles.monsterImage2}
              source={src}
            />
          </View>
          <View style={[styles.monsterTextContainer, { marginTop: 15, marginBottom: 15 }]}>
            <Text style={[styles.monsterText]}>{item}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderSelectList() {
    return (
      <FlatList
        data={this.state.weapons}
        keyExtractor={(item) => item}
        renderItem={this.renderListItems}
      />
    );
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.type}
        </Text>
      </View>
    );
  }
}
