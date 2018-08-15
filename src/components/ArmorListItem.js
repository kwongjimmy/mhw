import React, { PureComponent } from 'react';
import { ScrollView, Image } from 'react-native';
import { Text, Left, Body, Right, ListItem, View } from 'native-base';
import { ArmorImages, ElementStatusImages } from '../assets';

// Styles
import colors from '../styles/colors';

export default class ArmorListItem extends PureComponent {
  renderSkills(item) {
    if (item.skill1 !== null && item.skill2 !== null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 10, color: colors.main, textAlign: 'left' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 10, color: colors.main, textAlign: 'left' }}>{`${item.skill2} +${item.skill2_level}`}</Text>
        </View>
      );
    } else if (item.skill1 !== null && item.skill2 === null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 10, color: colors.main, textAlign: 'left' }}>{`${item.skill1} +${item.skill1_level}`}</Text>
        </View>
      );
    }
    return (
      null
    );
  }

  renderSkills2(item) {
    if (item.set_bonus_skill1 !== null && item.set_bonus_skill2 !== null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ flex: 1, fontSize: 10, color: colors.main, textAlign: 'left' }}>{`${item.set_bonus_name}`}</Text>
          <Text style={{ flex: 1, fontSize: 10, color: colors.main, textAlign: 'left' }}>{`(${item.pieces}) ${item.set_bonus_skill1} +${item.set_bonus_skill1_level}`}</Text>
          <Text style={{ flex: 1, fontSize: 10, color: colors.main, textAlign: 'left' }}>{`(${item.pieces_2}) ${item.set_bonus_skill2} +${item.set_bonus_skill2_level}`}</Text>
        </View>
      );
    } else if (item.set_bonus_skill1 !== null && item.set_bonus_skill2 === null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ flex: 1, fontSize: 10, color: colors.main, textAlign: 'left' }}>{`${item.set_bonus_name}`}</Text>
          <Text style={{ flex: 1, fontSize: 10, color: colors.main, textAlign: 'left' }}>{`(${item.pieces}) ${item.set_bonus_skill1} +${item.set_bonus_skill1_level}`}</Text>
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
        <Text style={{ fontSize: 13, fontWeight: '500', color: colors.main, textAlign: 'center' }}>{`${slot1} ${slot2} ${slot3}`}</Text>
      </View>
    );
  }

  renderBody(item) {
    if (this.props.setSelected) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Left style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={ArmorImages[`${item.type.toLowerCase()} ${item.rarity}`]}
            />
          </Left>
          <Left style={{ flex: 4.5, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'purple' }}>
              <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{item.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue' }}>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Defense']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.min_def}`}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Fire']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.fire}`}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Water']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.water}`}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Thunder']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.thunder}`}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Ice']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.ice}`}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 0.5 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: 12.5, height: 12.5 }}
                      source={ElementStatusImages['Dragon']}
                    />
                  </View>
                  <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.dragon}`}</Text>
                </View>
              </View>
              {this.renderSlots(item)}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
              {this.renderSkills(item)}
              {this.renderSkills2(item)}
            </View>
          </Left>
        </View>
      );
    }
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => {
          if (this.props.setBuilder) {
            this.props.onPassProp(item);
            this.props.navigator.dismissModal({
              animationType: 'slide-down',
            });
          } else {
            this.props.navigator.push({
              screen: 'EquipInfoScreen',
              passProps: {
                item_id: item.item_id,
                item,
                type: 'armor',
              },
              animationType: 'slide-horizontal',
              title: item.name,
            });
          }}}>
        <Left style={{ flex: 0.5 }}>
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            source={ArmorImages[`${item.type.toLowerCase()} ${item.rarity}`]}
          />
        </Left>
        <Left style={{ flex: 4.5, flexDirection: 'column' }}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'purple' }}>
            <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{item.name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue' }}>
            <View style={{ flex: 1.5, flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Defense']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.min_def}`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Fire']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.fire}`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Water']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.water}`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Thunder']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.thunder}`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Ice']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.ice}`}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  <Image
                    resizeMode="contain"
                    style={{ width: 12.5, height: 12.5 }}
                    source={ElementStatusImages['Dragon']}
                  />
                </View>
                <Text style={{ flex: 1, fontSize: 11, color: colors.main }}>{`${item.dragon}`}</Text>
              </View>
            </View>
            {this.renderSlots(item)}
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
            {this.renderSkillsContainer(item)}
          </View>
        </Left>
      </ListItem>
    );
  }

  renderSkillsContainer(item) {
    if (this.props.monster === true) {
      return (
        <View>
          {this.renderSkills(item)}
        </View>
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
        {this.renderSkills(item)}
        {this.renderSkills2(item)}
      </View>
    );
  }

  render() {
    return this.renderBody(this.props.item);
  }
}
