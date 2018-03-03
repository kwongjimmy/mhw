import React, { Component, PureComponent } from 'react';
import { Image, View, FlatList, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { MonsterImages } from '../assets';

// Styles
import styles from '../screens/Styles/SearchScreenStyles';

let top = true;
export default class SearchList extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      if (top === false) {
        if (this.props.type === 'all') {
          this.allFlatListRef.scrollToIndex({
            animated: true,
            index: 0,
          });
        } else if (this.props.type === 'large') {
          this.largeFlatListRef.scrollToIndex({
            animated: true,
            index: 0,
          });
        }
        else {
          this.smallFlatListRef.scrollToIndex({
            animated: true,
            index: 0,
          });
        }
      }
    }
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y !== 0) {
      top = false;
    } else {
      top = true;
    }
  }

  setRef(ref) {
    if (this.props.type === 'all') return this.allFlatListRef = ref;
    else if (this.props.type === 'large') return this.largeFlatListRef = ref;
    return this.smallFlatListRef = ref;
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
          data={this.props.monsters}
          keyExtractor={(item) => item.monster_id.toString()}
          renderItem={this.renderMonster}
          ref={this.setRef.bind(this)}
          onScroll={this.handleScroll.bind(this)}
        />
      </Container>
    );
  }
}
