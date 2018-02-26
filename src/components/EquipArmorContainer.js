import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class EquipArmorContainer extends Component {
  constructor(props) {
    super(props);
    const armor = [];
    if (this.props.armor_head_item_id !== null) {
      armor.push({
        name: this.props.armor.head_name,
        item_id: this.props.armor.head_item_id,
        skill1: this.props.armor.head_skill1,
        skill2: this.props.armor.head_skill2,
        slot1: this.props.armor.head_slot1,
        slot2: this.props.armor.head_slot2,
        slot3: this.props.armor.head_slot3,
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
      });
    }
    this.state = {
      setName: this.props.armor.name,
      armor,
      hide: false,
    };
  }

  renderHeader() {
    return (
      <TouchableOpacity onPress={() => this.setState({ hide: !this.state.hide })}>
        <View style={{ flex: 1, borderWidth: 0, borderColor: '#191919', alignItems: 'center', paddingTop: 2.5, paddingBottom: 2.5 }}>
            <Text style={{ fontSize: 16, color: '#191919' }}>{this.state.setName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderBody() {
    if(!this.state.hide) {
      return (
        <View style={{ alignItems: 'center', flex: 1, paddingTop: 2.5, borderLeftWidth: 0, borderRightWidth: 0, borderColor: '#191919' }}>
          {this.state.armor.map((item, key) => (
            <View key={item.item_id} style={{ flex: 1, flexDirection: 'row', paddingLeft: 25, paddingRight: 25 }}>
              <View style={{ flex: 4 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigator.push({
                  screen: 'ItemInfoScreen',
                  passProps: {
                    item_id: item.item_id,
                    category: 'armor'
                  },
                  animationType: 'fade',
                  title: item.name
                })}>
                  <Text key={item.item_id} style={{ fontSize: 15.5, color: '#191919' }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ flex: 1, fontSize: 15, color: '#191919', textAlign: 'center' }}>{`(${item.slot1}-${item.slot2}-${item.slot3})`}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10, borderBottomWidth: 0, borderColor: '#191919' }}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>

    );
  }
}
