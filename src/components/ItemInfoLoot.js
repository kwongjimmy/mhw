import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, List, ListItem, Tab, Tabs } from 'native-base';

export default class ItemInfoLoot extends PureComponent {
  constructor(props) {
    super(props);
    this.currentMap = '';
    this.currentMonster = '';
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {
      monsterLoot: this.props.monsterLoot,
    };
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
    }
  }

  renderMapHeader(item) {
    if (this.currentMap !== item.name) {
      this.currentMap = item.name;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 15 }} itemDivider>
          <Text style={{ fontSize: 16, fontWeight: '100', color: '#191919' }}>{`${item.name}`}</Text>
          <Text style={{ fontSize: 16, fontWeight: '100', color: '#5e5e5e' }}>{` ${item.rank} Rank`}</Text>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderListMapItems = ({ item }) => {
    return (
      <View>
        {this.renderMapHeader(item)}
        <ListItem style={{ marginLeft: 0, paddingLeft: 15 }}>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{`Area ${item.area}`}</Text>
        </ListItem>
      </View>
    );
  }

  renderMapLoot() {
    if (this.props.mapLoot.length > 0) {
      return (
        <FlatList
          data={this.props.mapLoot}
          keyExtractor={(item) => `${item.map_id.toString()} ${item.area}`}
          renderItem={this.renderListMapItems}
        />
      );
    }
    return (
      null
    );
  }

  renderMonsterHeader(item) {
    if (this.currentMonster !== `${item.monster_name} ${item.rank}`) {
      this.currentMonster = `${item.monster_name} ${item.rank}`;
      if (item.rank) {
        return (
          <ListItem style={{ marginLeft: 0 }} itemDivider>
            <Text style={{ fontSize: 16, fontWeight: '100', color: '#191919' }}>{`${item.monster_name}`}</Text>
            <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` High Rank`}</Text>
          </ListItem>
        );
      }
      return (
        <ListItem style={{ marginLeft: 0 }} itemDivider>
          <Text style={{ fontSize: 16, fontWeight: '100', color: '#191919' }}>{`${item.monster_name}`}</Text>
          <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` Low Rank`}</Text>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderListMonsterItems = ({ item }) => {
    return (
      <View>
        {this.renderMonsterHeader(item)}
        <ListItem>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.name} x${item.quantity}`}</Text>
        </ListItem>
      </View>
    );
  }

  renderMonsterLoot() {
    if (this.props.monsterLoot.length > 0) {
      return (
        <FlatList
          data={this.state.monsterLoot}
          keyExtractor={(item) => `${item.monster_name} ${item.rank.toString()} ${item.name}`}
          renderItem={this.renderListMonsterItems.bind(this)}
        />
      );
    }
    return (
      null
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        {this.renderMapLoot()}
        {this.renderMonsterLoot()}
      </Container>
    );
  }
}
