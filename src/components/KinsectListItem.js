import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { View, Text, Left, Body, Right, ListItem } from 'native-base';
import { ElementStatusImages, WeaponImages } from '../assets';

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

export default class KinsectListItem extends PureComponent {
  renderKinsectInfo() {
    let { item } = this.props;
    const dust = (item.dust === null) ? 'None' : item.dust;
    return (
      <View style={{ flex: 1.5, flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 12.5, height: 12.5 }}
              source={WeaponImages['Kinsect Type']}
            />
          </View>
          <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.type}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 12.5, height: 12.5 }}
              source={WeaponImages['Kinsect Dust']}
            />
          </View>
          <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${dust}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 12.5, height: 12.5 }}
              source={WeaponImages['Kinsect Power']}
            />
          </View>
          <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`LV ${item.power}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 12.5, height: 12.5 }}
              source={WeaponImages['Kinsect Heal']}
            />
          </View>
          <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`LV ${item.heal}`}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 12.5, height: 12.5 }}
              source={WeaponImages['Kinsect Speed']}
            />
          </View>
          <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`LV ${item.speed}`}</Text>
        </View>
      </View>
    );
  }
  render() {
    const {
       item_id, name, type, power, speed, heal, rarity
    } = this.props.item;

    const kinsectTree = ['Culldrone', 'Alucanid', 'Monarch Alucanid', 'Empresswing', 'Rigiprayne', 'Cancadaman', 'Fiddlebrix', 'Windchopper', 'Grancathar', 'Pseudocath'];
    const kinsectTreePath = kinsectTree.some(val => name.includes(val)) ? 'C' : 'M';
    // For SetBuilder
    if (this.props.setSelected) {
      return (
        <View
          style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderWidth: 0, flexDirection: 'row' }}
          >
          <Left style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20 }}
              source={WeaponImages[`Kinsect ${kinsectTreePath} ${rarity}`]} />
          </Left>
          <Body style={{ flex: 4.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: colors.accent }}>
              <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {this.renderKinsectInfo()}
              </View>
            </View>
          </Body>
        </View>
      );
    }
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => {
          if (this.props.setBuilder) {
            this.props.onPassProp(this.props.item);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          } else {
            this.props.navigator.push({
              screen: 'WeaponInfoScreen',
              passProps: {
                item_id,
                type: 'kinsect',
                item: this.props.item,
              },
              animationType: 'slide-horizontal',
              title: name,
            });
          }
        }}>
        <Left style={{ flex: 0.5 }}>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={WeaponImages[`Kinsect ${kinsectTreePath} ${rarity}`]} />
        </Left>
        <Body style={{ flex: 4.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: colors.accent }}>
            <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {this.renderKinsectInfo()}
            </View>
          </View>
        </Body>
      </ListItem>
    );
  }
}
