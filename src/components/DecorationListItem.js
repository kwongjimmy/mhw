import React, { PureComponent } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, Left, Body, Right, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { ArmorImages } from '../assets';

// Styles
import colors from '../styles/colors';

class DecorationListItem extends PureComponent {
  renderListItems = (item) => {
    if (this.props.setSelected) {
      return (
        <View
          style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderWidth: 0, flexDirection: 'row' }}
          >
            <Left style={{ flex: 0.5 }}>
              <Image
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                source={ArmorImages[`decoration ${item.rarity}`]}
              />
            </Left>
          <Left style= {{ flex: 2 }}>
            <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
          </Left>
          <Right style= {{ flex: 2, justifyContent: 'center' }}>
            <Text style={{ fontSize: 11, color: this.props.theme.secondary }}>{item.skill_name} +{item.skill_level}</Text>
          </Right>
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
                type: 'decorations'
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
            source={ArmorImages[`decoration ${item.rarity}`]}
          />
        </Left>
        <Left style= {{ flex: 2 }}>
          <Text style={{ fontSize: 15.5, color: this.props.theme.main }}>{item.name}</Text>
        </Left>
        <Right style= {{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 11, color: this.props.theme.secondary }}>{item.skill_name} +{item.skill_level}</Text>
        </Right>
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

export default connect(mapStateToProps, {})(DecorationListItem);
