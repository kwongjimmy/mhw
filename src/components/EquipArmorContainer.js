import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text, Icon, Left, Body, Right, ListItem } from 'native-base';

export default class EquipArmorContainer extends PureComponent {
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
        skill1_level: this.props.armor.head_skill1_level,
        skill2_level: this.props.armor.head_skill2_level,
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
      });
    }
    this.state = {
      setName: this.props.armor.name,
      armor,
      hide: true,
    };
  }

  renderSkills(item) {
    if (item.skill1 !== null && item.skill2 !== null) {
      return (
        <View>
          <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
          <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill2} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1 !== null && item.skill2 === null) {
      return (
        <Text style={{ flex: 1, fontSize: 11, color: '#8e8e8e' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
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
      <Text style={{ flex: 1, fontSize: 14, fontWeight: '500', color: '#8e8e8e', textAlign: 'center' }}>{`${slot1} ${slot2} ${slot3}`}</Text>
    );
  }

  renderHeaderIcon() {
    if (!this.state.hide) {
      return (
        <Icon ios='ios-arrow-down' android="ios-arrow-down" style={{ fontSize: 20, color: 'red' }}/>
      );
    }
    return (
      <Icon ios='ios-arrow-up' android="ios-arrow-up" style={{ fontSize: 20, color: 'red' }}/>
    );
  }

  renderHeader() {
    return (
      <ListItem style={{ borderBottomWidth: 0.5, borderColor: '#d1d1d1' }} onPress={() => this.setState({ hide: !this.state.hide })} itemDivider>
        <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{this.state.setName}</Text>
        <Right>
          {this.renderHeaderIcon()}
        </Right>
      </ListItem>
    );
  }

  renderBody() {
    if (!this.state.hide) {
      return (
        this.state.armor.map((item, key) => {
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
            })}
            >
              <Left style={{ flex: 1.5 }}>
                <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
              </Left>
              <Body style={{ flex: 1.5 }}>
                {this.renderSkills(item)}
              </Body>
              <Right style={{ flex: 0.75 }}>
                {this.renderSlots(item)}
              </Right>
            </ListItem>
          );
        })
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderBody()}
      </View>

    );
  }
}
