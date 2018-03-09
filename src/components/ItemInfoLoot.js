import React, { PureComponent } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Container, Text, Left, Body, Right, ListItem, Icon } from 'native-base';

export default class ItemInfoLoot extends PureComponent {
  constructor(props) {
    super(props);
    this.currentMap = '';
    this.currentMonster = '';
    let result = [];
    let currentName = '';
    let currentRank = '';
    let currentArea = '';
    for (let i = 0; i < this.props.mapLoot.length; i += 1) {
      if (i === 0) {
        currentName = this.props.mapLoot[i].name;
        currentRank = this.props.mapLoot[i].rank;
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
      } else if (this.props.mapLoot[i].name !== currentName
        || this.props.mapLoot[i].rank !== currentRank) {
        result.push({
          name: currentName,
          rank: currentRank,
          area: currentArea.slice(0, currentArea.length - 2),
        });
        currentArea = '';
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
        currentName = this.props.mapLoot[i].name;
        currentRank = this.props.mapLoot[i].rank;
      } else if (i === this.props.mapLoot.length - 1) {
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
        result.push({
          name: currentName,
          rank: currentRank,
          area: currentArea.slice(0, currentArea.length - 2),
        });
      } else {
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
      }
    }
    this.state = {
      mapLoot: result,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      //console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderMapHeader(item) {
    if (this.currentMap !== `${item.name} ${item.rank}`) {
      this.currentMap = `${item.name} ${item.rank}`;
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#191919' }}>{`${item.name}`} <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` ${item.rank} Rank`}</Text> </Text>
          </Left>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderMapLoot() {
    if (this.state.mapLoot.length > 0) {
      return (
        this.state.mapLoot.map((item, key) => {
          return (
            <View key={key}>
              {this.renderMapHeader(item)}
              <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
                <Left>
                  <Text style={{ fontSize: 15.5, color: '#191919' }}>{`Area ${item.area}`}</Text>
                </Left>
              </ListItem>
            </View>
          );
        })
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
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#191919' }}>{`${item.monster_name}`}  <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` High Rank`}</Text></Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` Amount`}</Text>
            </Right>
          </ListItem>
        );
      }
      return (
        <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#191919' }}>{`${item.monster_name}`}  <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` Low Rank`}</Text></Text>
          </Left>
          <Right>
            <Text style={{ fontSize: 15.5, fontWeight: '100', color: '#5e5e5e' }}>{` Amount`}</Text>
          </Right>
        </ListItem>
      );
    }
    return (
      null
    );
  }

  renderMonsterLoot() {
    if (this.props.monsterLoot.length > 0) {
      return (
        this.props.monsterLoot.map((item, key) => {
          return (
            <View key={key}>
              {this.renderMonsterHeader(item)}
              <ListItem style={{ marginLeft: 0, paddingLeft: 8 }}>
                <Left>
                  <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
                </Right>
              </ListItem>
            </View>
          );
        })
      );
    }
    return (
      null
    );
  }

  render() {
    if (this.props.monsterLoot.length === 0 && this.props.mapLoot.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Icon ios='ios-alert-outline' android='ios-alert-outline' style={{ textAlign: 'center', fontSize: 50, color: '#8e8e8e' }} />
          <Text style={{ textAlign: 'center', fontSize: 25, color: '#8e8e8e' }}>No Data</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        {this.renderMonsterLoot()}
        {this.renderMapLoot()}
      </ScrollView>
    );
  }
}
