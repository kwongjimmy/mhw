import React, { PureComponent } from 'react';
import { ScrollView, Image, View, Platform } from 'react-native';
import { Text, Left, Body, Right, ListItem } from 'native-base';
import ArmorListItem from '../components/ArmorListItem';
import { ArmorImages } from '../assets';
import AdBanner from '../components/AdBanner';

// Styles
import colors from '../styles/colors';

export default class EquipArmorSetScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  constructor(props) {
    super(props);
    const armor = [];
    if (this.props.armor.head_item_id !== null) {
      armor.push({
        name: this.props.armor.head_name,
        item_id: this.props.armor.head_item_id,
        skill1: this.props.armor.head_skill1,
        skill2: this.props.armor.head_skill2,
        slot1: this.props.armor.head_slot1,
        slot2: this.props.armor.head_slot2,
        slot3: this.props.armor.head_slot3,
        skill1_level: this.props.armor.head_skill1_level,
        skill2_level: this.props.armor.head_skill2_level,
        rarity: this.props.armor.head_rarity,
        type: 'head',
        min_def: this.props.armor.head_def,
        fire: this.props.armor.head_fire,
        water: this.props.armor.head_water,
        thunder: this.props.armor.head_thunder,
        ice: this.props.armor.head_ice,
        dragon: this.props.armor.head_dragon,
        set_bonus_name: this.props.armor.set_bonus_name,
        pieces: this.props.armor.pieces,
        pieces_2: this.props.armor.pieces_2,
        set_bonus_skill1_level: this.props.armor.set_bonus_skill1_level,
        set_bonus_skill2_level: this.props.armor.set_bonus_skill2_level,
        set_bonus_skill1_id: this.props.armor.set_bonus_skill1_id,
        set_bonus_skill2_id: this.props.armor.set_bonus_skill2_id,
        set_bonus_skill1: this.props.armor.set_bonus_skill1,
        set_bonus_skill2: this.props.armor.set_bonus_skill2,
      });
    }
    if (this.props.armor.armor_item_id !== null) {
      armor.push({
        name: this.props.armor.armor_name,
        item_id: this.props.armor.armor_item_id,
        skill1: this.props.armor.armor_skill1,
        skill2: this.props.armor.armor_skill2,
        slot1: this.props.armor.armor_slot1,
        slot2: this.props.armor.armor_slot2,
        slot3: this.props.armor.armor_slot3,
        skill1_level: this.props.armor.armor_skill1_level,
        skill2_level: this.props.armor.armor_skill2_level,
        rarity: this.props.armor.armor_rarity,
        type: 'chest',
        min_def: this.props.armor.armor_def,
        fire: this.props.armor.armor_fire,
        water: this.props.armor.armor_water,
        thunder: this.props.armor.armor_thunder,
        ice: this.props.armor.armor_ice,
        dragon: this.props.armor.armor_dragon,
        set_bonus_name: this.props.armor.set_bonus_name,
        pieces: this.props.armor.pieces,
        pieces_2: this.props.armor.pieces_2,
        set_bonus_skill1_level: this.props.armor.set_bonus_skill1_level,
        set_bonus_skill2_level: this.props.armor.set_bonus_skill2_level,
        set_bonus_skill1_id: this.props.armor.set_bonus_skill1_id,
        set_bonus_skill2_id: this.props.armor.set_bonus_skill2_id,
        set_bonus_skill1: this.props.armor.set_bonus_skill1,
        set_bonus_skill2: this.props.armor.set_bonus_skill2,
      });
    }
    if (this.props.armor.gloves_item_id !== null) {
      armor.push({
        name: this.props.armor.gloves_name,
        item_id: this.props.armor.gloves_item_id,
        skill1: this.props.armor.gloves_skill1,
        skill2: this.props.armor.gloves_skill2,
        slot1: this.props.armor.gloves_slot1,
        slot2: this.props.armor.gloves_slot2,
        slot3: this.props.armor.gloves_slot3,
        skill1_level: this.props.armor.gloves_skill1_level,
        skill2_level: this.props.armor.gloves_skill2_level,
        rarity: this.props.armor.gloves_rarity,
        type: 'arm',
        min_def: this.props.armor.gloves_def,
        fire: this.props.armor.gloves_fire,
        water: this.props.armor.gloves_water,
        thunder: this.props.armor.gloves_thunder,
        ice: this.props.armor.gloves_ice,
        dragon: this.props.armor.gloves_dragon,
        set_bonus_name: this.props.armor.set_bonus_name,
        pieces: this.props.armor.pieces,
        pieces_2: this.props.armor.pieces_2,
        set_bonus_skill1_level: this.props.armor.set_bonus_skill1_level,
        set_bonus_skill2_level: this.props.armor.set_bonus_skill2_level,
        set_bonus_skill1_id: this.props.armor.set_bonus_skill1_id,
        set_bonus_skill2_id: this.props.armor.set_bonus_skill2_id,
        set_bonus_skill1: this.props.armor.set_bonus_skill1,
        set_bonus_skill2: this.props.armor.set_bonus_skill2,
      });
    }
    if (this.props.armor.belt_item_id !== null) {
      armor.push({
        name: this.props.armor.belt_name,
        item_id: this.props.armor.belt_item_id,
        skill1: this.props.armor.belt_skill1,
        skill2: this.props.armor.belt_skill2,
        slot1: this.props.armor.belt_slot1,
        slot2: this.props.armor.belt_slot2,
        slot3: this.props.armor.belt_slot3,
        skill1_level: this.props.armor.belt_skill1_level,
        skill2_level: this.props.armor.belt_skill2_level,
        rarity: this.props.armor.belt_rarity,
        type: 'waist',
        min_def: this.props.armor.belt_def,
        fire: this.props.armor.belt_fire,
        water: this.props.armor.belt_water,
        thunder: this.props.armor.belt_thunder,
        ice: this.props.armor.belt_ice,
        dragon: this.props.armor.belt_dragon,
        set_bonus_name: this.props.armor.set_bonus_name,
        pieces: this.props.armor.pieces,
        pieces_2: this.props.armor.pieces_2,
        set_bonus_skill1_level: this.props.armor.set_bonus_skill1_level,
        set_bonus_skill2_level: this.props.armor.set_bonus_skill2_level,
        set_bonus_skill1_id: this.props.armor.set_bonus_skill1_id,
        set_bonus_skill2_id: this.props.armor.set_bonus_skill2_id,
        set_bonus_skill1: this.props.armor.set_bonus_skill1,
        set_bonus_skill2: this.props.armor.set_bonus_skill2,
      });
    }
    if (this.props.armor.pants_item_id !== null) {
      armor.push({
        name: this.props.armor.pants_name,
        item_id: this.props.armor.pants_item_id,
        skill1: this.props.armor.pants_skill1,
        skill2: this.props.armor.pants_skill2,
        slot1: this.props.armor.pants_slot1,
        slot2: this.props.armor.pants_slot2,
        slot3: this.props.armor.pants_slot3,
        skill1_level: this.props.armor.pants_skill1_level,
        skill2_level: this.props.armor.pants_skill2_level,
        rarity: this.props.armor.pants_rarity,
        type: 'legs',
        min_def: this.props.armor.pants_def,
        fire: this.props.armor.pants_fire,
        water: this.props.armor.pants_water,
        thunder: this.props.armor.pants_thunder,
        ice: this.props.armor.pants_ice,
        dragon: this.props.armor.pants_dragon,
        set_bonus_name: this.props.armor.set_bonus_name,
        pieces: this.props.armor.pieces,
        pieces_2: this.props.armor.pieces_2,
        set_bonus_skill1_level: this.props.armor.set_bonus_skill1_level,
        set_bonus_skill2_level: this.props.armor.set_bonus_skill2_level,
        set_bonus_skill1_id: this.props.armor.set_bonus_skill1_id,
        set_bonus_skill2_id: this.props.armor.set_bonus_skill2_id,
        set_bonus_skill1: this.props.armor.set_bonus_skill1,
        set_bonus_skill2: this.props.armor.set_bonus_skill2,
      });
    }
    this.state = {
      setName: this.props.armor.name,
      armor,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    console.log('EquipArmorSetScreen');
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderSkills(item) {
    if (item.skill1 !== null && item.skill2 !== null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill2} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1 !== null && item.skill2 === null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1} +${item.skill1_level}`}</Text>
        </View>
      );
    }
    return (
      null
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

  renderSetBonus() {
    if (this.props.armor.set_bonus_name !== null) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }} itemDivider>
            <Text style={{ fontSize: 15.5, color: colors.main }}>
              {`${this.props.armor.set_bonus_name} Set Bonus`}
            </Text>
          </ListItem>
          {this.renderSetBonus1()}
          {this.renderSetBonus2()}
        </View>
      );
    }
    return null;
  }

  renderSetBonus1() {
    if (this.props.armor.set_bonus_skill1 !== null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.props.armor.set_bonus_skill1_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.props.armor.set_bonus_skill1,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: colors.main }}>
              {`(${this.props.armor.pieces} pieces) ${this.props.armor.set_bonus_skill1}`}
            </Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: colors.main }}>
              {`+${this.props.armor.set_bonus_skill1_level}`}
            </Text>
          </Right>
        </ListItem>
      );
    }
    return null;
  }

  renderSetBonus2() {
    if (this.props.armor.set_bonus_skill2 !== null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.props.armor.set_bonus_skill2_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.props.armor.set_bonus_skill2,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: colors.main }}>
              {`(${this.props.armor.pieces_2} pieces) ${this.props.armor.set_bonus_skill2}`}
            </Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, color: colors.main }}>
              {`+${this.props.armor.set_bonus_skill2_level}`}
            </Text>
          </Right>
        </ListItem>
      );
    }
    return null;
  }

  renderBody() {
    return (
      <View style={{ flex: 1 }}>
      {this.renderSetBonus()}
      {this.state.armor.map((item, key) => {
        return (
          <ArmorListItem key={key} item={item} navigator={this.props.navigator} />
        );
      })}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView>
          {this.renderBody()}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }
}
