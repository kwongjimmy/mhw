import React, { PureComponent } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, Left, Body, Right, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { ArmorImages } from '../assets';

// Styles
import colors from '../styles/colors';

class CharmListItem extends PureComponent {
  renderSkills(item) {
    if (item.skill1_name !== null && item.skill2_name !== null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: this.props.theme.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
          <Text style={{ fontSize: 11, color: this.props.theme.secondary }}>{`${item.skill2_name} +${item.skill2_level}`}</Text>
        </Right>
      );
    } else if (item.skill1_name !== null && item.skill2_name === null) {
      return (
        <Right style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: this.props.theme.secondary }}>{`${item.skill1_name} +${item.skill1_level}`}</Text>
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
          style={{
            margin: 0,
            padding: 0,
            borderWidth: 0,
            flexDirection: 'row',
          }}>
            <Left style={{ flex: 0.5 }}>
              <Image
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                source={ArmorImages[`charm ${item.rarity}`]}
              />
            </Left>
            <Left style={{ flex: 2.5 }}>
              <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
            </Left>
            {this.renderSkills(item)}
        </View>
      );
    }
    return (
      <ListItem
        style={[styles.listHeader, { borderColor: this.props.theme.border, backgroundColor: this.props.theme.background === 'black' ? this.props.theme.listItemHeader : this.props.theme.listItem }]}
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
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
        </Left>
        {this.renderSkills(item)}
      </ListItem>
    );
  }

  render() {
    return this.renderListItems(this.props.item);
  }
}

const styles = StyleSheet.create({
  listHeader: {
    height: 55,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
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

export default connect(mapStateToProps, {})(CharmListItem);
