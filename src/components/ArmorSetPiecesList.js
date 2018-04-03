import React, { PureComponent } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Text, Left, Body, Right, ListItem } from 'native-base';
import { ArmorImages } from '../assets';
import AdBanner from './AdBanner';

export default class ArmorSetPiecesList extends PureComponent {
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
        type: 'armor',
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
        type: 'gloves',
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
        type: 'belt',
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
        type: 'pants',
      });
    }
    this.state = {
      setName: this.props.armor.name,
      armor,
    };
  }

  renderSkills(item) {
    if (item.skill1 !== null && item.skill2 !== null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 11, color: '#8e8e8e' }}>{`${item.skill2} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1 !== null && item.skill2 === null) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
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
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#8e8e8e', textAlign: 'center' }}>{`${slot1} ${slot2} ${slot3}`}</Text>
      </View>
    );
  }

  renderSetBonus() {
    if (this.props.armor.set_bonus !== null) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }} itemDivider>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>
              {`${this.props.armor.set_bonus} Set Bonus`}
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
    if (this.props.armor.skill1_name !== null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.props.armor.skill1_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.props.armor.skill1_name,
          })}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>
            {`(${this.props.armor.pieces} pieces) ${this.props.armor.skill1_name}`}
          </Text>
        </ListItem>
      );
    }
    return null;
  }

  renderSetBonus2() {
    if (this.props.armor.skill2_name !== null) {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            armor_skill_id: this.props.armor.skill2_id,
            type: 'skill',
          },
          animationType: 'slide-horizontal',
          title: this.props.armor.skill2_name,
          })}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>
            {`(${this.props.armor.pieces2} pieces) ${this.props.armor.skill2_name}`}
          </Text>
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
          <ListItem
            key={key}
            style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'armor',
            },
            animationType: 'slide-horizontal',
            title: item.name,
          })}
          >
            <Left style={{ flex: 0.5 }}>
              <Image
                resizeMode="contain"
                style={{ alignSelf: 'center', width: 20, height: 20 }}
                source={ArmorImages[`${item.type} ${item.rarity}`]}
              />
            </Left>
            <Left style={{ flex: 1.25 }}>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
            </Left>
            <Body style={{ flex: 1.5, flexGrow: 2 }}>
              {this.renderSkills(item)}
            </Body>
            <Right style={{ flex: 0.5, flexGrow: 1 }}>
              {this.renderSlots(item)}
            </Right>
          </ListItem>
        );
      })}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
          {this.renderBody()}
        </ScrollView>
        <AdBanner />
      </View>
    );
  }
}
