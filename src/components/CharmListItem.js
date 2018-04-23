import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { View, Text, Left, Body, Right, ListItem } from 'native-base';
import { ArmorImages } from '../assets';

// Styles
import colors from '../styles/colors';

export default class CharmListItem extends PureComponent {
  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </Right>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: colors.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
        </Right>
      );
    }
    return (
      null
    );
  }

  renderListItems(item) {
    if (this.props.setSelected) {
      return (
        <View
          style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderWidth: 0, flexDirection: 'row' }}
          >
            <Left style={{ flex: 0.5 }}>
              <Image
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                source={ArmorImages[`charm ${item.rarity}`]}
              />
            </Left>
            <Left style={{ flex: 2.5 }}>
              <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
            </Left>
            {this.renderSkills(item)}
        </View>
      );
    }
    return (
      <ListItem
        style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => {
        if (this.props.setBuilder) {
          this.props.onPassProp(item);
          this.props.navigator.dismissModal({
            animationType: 'slide-down',
          });
        } else {
          this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id: item.item_id,
              type: 'charms'
            },
            animationType: 'slide-horizontal',
            title: item.name,
          });
        }
      }}>
        <Left style={{ flex: 0.5 }}>
          <Image
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            source={ArmorImages[`charm ${item.rarity}`]}
          />
        </Left>
        <Left style={{ flex: 2 }}>
          <Text style={{ fontSize: 15.5, color: colors.main }}>{item.name}</Text>
        </Left>
        {this.renderSkills(item)}
      </ListItem>
    );
  }

  render() {
    return this.renderListItems(this.props.item);
  }
}
