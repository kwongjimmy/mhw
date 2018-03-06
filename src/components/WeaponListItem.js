import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';

export default class WeaponListItem extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props.item);
    console.log(this.props);
  }

  render() {
    const { item_id, name } = this.props.item;
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id,
            type: 'weapons',
            item: this.props.item,
          },
          animationType: 'fade',
          title: name,
        })}
        >
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{name}</Text>
        </Left>
        <Right>
        </Right>
      </ListItem>
    );
  }
}
