import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Text, Left, Body, Right, ListItem } from 'native-base';

export default class ItemInfoEquip extends PureComponent {
  constructor(props) {
    super(props);
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

  renderWeaponHeader() {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
        <Left>
          <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#191919' }}>Weapons</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>Cost</Text>
        </Right>
      </ListItem>
    );
  }

  renderWeaponListItems() {
    return (
      this.props.weapons.map((item, key) => {
        return (
          <View key={key}>
            <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
              <Left>
                <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
              </Right>
            </ListItem>
          </View>
        );
      })
    );
  }

  renderWeapons() {
    if (this.props.weapons.length > 0) {
      return (
        <View>
          {this.renderWeaponHeader()}
          {this.renderWeaponListItems()}
        </View>
      );
    }
    return (
      null
    );
  }

  renderArmorHeader() {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
        <Left>
          <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#191919' }}>Armor</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>Cost</Text>
        </Right>
      </ListItem>
    );
  }

  renderArmorListItems() {
    return (
      this.props.armor.map((item, key) => {
        return (
          <ListItem
            key={key}
            style={{ marginLeft: 0, paddingLeft: 8 }}
            onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'armor',
            },
            animationType: 'fade',
            title: item.name
            })}>
            <Left>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
            </Right>
          </ListItem>
        );
      })
    );
  }

  renderArmor() {
    if (this.props.armor.length > 0) {
      return (
        <View>
          {this.renderArmorHeader()}
          {this.renderArmorListItems()}
        </View>
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <ScrollView>
          {this.renderArmor()}
          {this.renderWeapons()}
        </ScrollView>
      </Container>
    );
  }
}
