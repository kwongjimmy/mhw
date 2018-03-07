import React, { Component, PureComponent } from 'react';
import { Image, View, FlatList, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { MonsterImages } from '../assets';

// Styles
import styles from '../screens/Styles/MonsterScreenStyles';

export default class MonsterList extends PureComponent {
  componentDidMount() {
  }

  renderMonster = ({ item }) => {
    let src = MonsterImages['Unknown'];
    let name = item.monster_name;
    if (name !== 'Gajalaka' && name !== 'Grimalkyne') {
      name = name.replace(/["'-]/g, '');
      name = name.replace(' ', '');
      src = MonsterImages[name];
    }
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18 }}
        onPress={() => this.props.navigator.push({
        screen: 'MonsterInfoScreen',
        passProps: {
          monster_id: item.monster_id,
        },
        animationType: 'fade',
        title: item.monster_name,
      })}>
      <Left>
        <Image
          resizeMode="contain"
          style={styles.monsterImage2}
          source={src}
        />
      </Left>
      <Body style={{ flex: 4 }}>
        <Text style={styles.monsterText}>{item.monster_name}</Text>
        <Text style={styles.monsterTypeText}>{item.type}</Text>
      </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <FlatList
          initialNumToRender={0}
          data={this.props.monsters}
          keyExtractor={(item) => item.monster_id.toString()}
          renderItem={this.renderMonster}
        />
      </Container>
    );
  }
}
