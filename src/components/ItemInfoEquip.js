import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Left, Right, ListItem } from 'native-base';
import { connect } from 'react-redux';
import AdBanner from './AdBanner';
import DropDown from './DropDown';
import { WeaponImages, ArmorImages } from '../assets/';

// Styles
import colors from '../styles/colors';

const weaponTypes = {
  great_sword: 'Great Sword',
  long_sword: 'Long Sword',
  sword_and_shield: 'Sword and Shield',
  dual_blade: 'Dual Blades',
  hammer: 'Hammer',
  hunting_horn: 'Hunting Horn',
  lance: 'Lance',
  gun_lance: 'Gunlance',
  switch_axe: 'Switch Axe',
  charge_blade: 'Charge Blade',
  insect_glaive: 'Insect Glaive',
  bow: 'Bow',
  light_bowgun: 'Light Bowgun',
  heavy_bowgun: 'Heavy Bowgun',
};

class ItemInfoEquip extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  renderWeaponHeader() {
    return (
      <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
        <Left>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>Weapons</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: this.props.theme.secondary }}>Cost</Text>
        </Right>
      </ListItem>
    );
  }

  renderWeaponListItems() {
    return (
      <DropDown
        headerName={`Weapon Requirements`}
        hide={true}
        content={
          this.props.weapons.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
                onPress={() => {
                  if (item.type.includes('bowgun')) {
                    this.props.navigator.push({
                      screen: 'TabInfoScreen',
                      passProps: {
                        item_id: item.item_id,
                        type: 'weapons',
                        item,
                      },
                      animationType: 'slide-horizontal',
                      title: item.name,
                    });
                  } else {
                    this.props.navigator.push({
                      screen: 'TablessInfoScreen',
                      passProps: {
                        item_id: item.item_id,
                        type: 'weapons',
                        item,
                      },
                      animationType: 'slide-horizontal',
                      title: item.name,
                    });
                  }
                }}>
                <Left style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center', height: 20, width: 20 }}
                    source={WeaponImages[`${weaponTypes[item.type]} ${item.rarity}`]}
                  />
                </Left>
                <Left style={{ flex: 3 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item.quantity}`}</Text>
                </Right>
              </ListItem>
            );
          })
        }
      />
    );
  }

  renderWeapons() {
    if (this.props.weapons.length > 0) {
      return this.renderWeaponListItems();
    }
    return (
      null
    );
  }

  renderArmorHeader() {
    return (
      <ListItem style={[styles.listHeader, { backgroundColor: this.props.theme.listItemHeader }]}>
        <Left>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>Armor</Text>
        </Left>
        <Right>
          <Text style={{ fontSize: 15.5, color: this.props.theme.secondary }}>Cost</Text>
        </Right>
      </ListItem>
    );
  }

  renderArmorListItems() {
    return (
      <DropDown
        headerName={`Armor Requirements`}
        hide={true}
        content={
          this.props.armor.map((item, key) => {
            return (
              <ListItem
                key={key}
                style={[styles.listItem, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.listItem }]}
                onPress={() => this.props.navigator.push({
                screen: 'EquipInfoScreen',
                passProps: {
                  item_id: item.item_id,
                  type: 'armor',
                },
                animationType: 'slide-horizontal',
                title: item.name
                })}>
                <Left style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ alignSelf: 'center', height: 20, width: 20 }}
                    source={ArmorImages[`${item.type.toLowerCase()} ${item.rarity}`]}
                  />
                </Left>
                <Left style={{ flex: 3 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
                </Left>
                <Right style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{`x${item.quantity}`}</Text>
                </Right>
              </ListItem>
            );
          })
        }
      />
    );
  }

  renderArmor() {
    if (this.props.armor.length > 0) {
      return this.renderArmorListItems();
    }
    return (
      null
    );
  }

  render() {
    if (this.props.armor.length === 0 && this.props.weapons.length === 0) {
      return (
        null
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {this.renderArmor()}
        {this.renderWeapons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0,
  },
  listItem: {
    height: 50,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return state.settings;
};

export default connect(mapStateToProps, {})(ItemInfoEquip);
