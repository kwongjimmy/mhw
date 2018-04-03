import React, { PureComponent } from 'react';
import { View, FlatList, ScrollView, Image } from 'react-native';
import { Container, Text, Left, Body, Right, ListItem, Icon } from 'native-base';
import AdBanner from './AdBanner';
import DropDown from './DropDown';
import { MonsterImages } from '../assets';

export default class ItemInfoLoot extends PureComponent {
  constructor(props) {
    super(props);
    this.currentMap = '';
    this.currentMonster = '';
    let result = [];
    let currentName = '';
    let currentRank = '';
    let currentArea = '';
    let currentID = '';
    for (let i = 0; i < this.props.mapLoot.length; i += 1) {
      if (i === 0) {
        currentID = this.props.mapLoot[i].map_id;
        currentName = this.props.mapLoot[i].name;
        currentRank = this.props.mapLoot[i].rank;
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
      } else if (this.props.mapLoot[i].name !== currentName
        || this.props.mapLoot[i].rank !== currentRank) {
        result.push({
          map_id: currentID,
          name: currentName,
          rank: currentRank,
          area: currentArea.slice(0, currentArea.length - 2),
        });
        currentID = this.props.mapLoot[i].map_id;
        currentArea = '';
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
        currentName = this.props.mapLoot[i].name;
        currentRank = this.props.mapLoot[i].rank;
      } else if (i === this.props.mapLoot.length - 1) {
        currentArea = currentArea.concat(this.props.mapLoot[i].area).concat(', ');
        result.push({
          map_id: currentID,
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
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }}
          onPress={() => this.props.navigator.push({
          screen: 'TabInfoScreen',
          passProps: {
            item_id: item.map_id,
            type: 'maps',
          },
          animationType: 'slide-horizontal',
          title: item.name,
          })}>
          <Left>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.name}`} <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>{` ${item.rank} Rank`}</Text> </Text>
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
        <DropDown
          headerName={'Map Loot'}
          hide={true}
          content={
        this.state.mapLoot.map((item, key) => {
          return (
            <View key={key}>
              {this.renderMapHeader(item)}
              <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
                <Left>
                  <Text style={{ fontSize: 15.5, color: '#191919' }}>{`Area ${item.area}`}</Text>
                </Left>
              </ListItem>
            </View>
          );
        })} />
      );
    }
    return (
      null
    );
  }

  renderMonsterHeader(item) {
    if (this.currentMonster !== `${item.monster_name} ${item.rank}`) {
      this.currentMonster = `${item.monster_name} ${item.rank}`;
      let src = MonsterImages['Unknown'];
      let name = item.monster_name;
      if (name !== 'Gajalaka' && name !== 'Grimalkyne') {
        name = name.replace(/["'-]/g, '');
        name = name.replace(' ', '');
        src = MonsterImages[name];
      }
      if (item.rank) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }}
            onPress={() => this.props.navigator.push({
            screen: 'MonsterInfoScreen',
            passProps: {
              monster_id: item.monster_id,
              monster_info: item,
            },
            animationType: 'slide-horizontal',
            title: item.monster_name,
            })}>
            <Left style={{ flex: 1 }}>
              <Image
                resizeMode="contain"
                style={{ width: 35, height: 35 }}
                source={src}
              />
            </Left>
            <Body style={{ flex: 3 }}>
              <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.monster_name}`}</Text>
              <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>{`High Rank`}</Text>
            </Body>
            <Right style={{ flex: 3 }}>
              <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>{``}</Text>
            </Right>
          </ListItem>
        );
      }
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }}
          onPress={() => this.props.navigator.push({
          screen: 'MonsterInfoScreen',
          passProps: {
            monster_id: item.monster_id,
            monster_info: item,
          },
          animationType: 'slide-horizontal',
          title: item.monster_name,
          })}>
          <Left style={{ flex: 1 }}>
            <Image
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
              source={src}
            />
          </Left>
          <Body style={{ flex: 3 }}>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.monster_name}`}</Text>
            <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>{`Low Rank`}</Text>
          </Body>
          <Right style={{ flex: 3 }}>
            <Text style={{ fontSize: 15.5, color: '#5e5e5e' }}>{``}</Text>
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
        <DropDown
          headerName={'Monster Drops'}
          hide={true}
          content={
            this.props.monsterLoot.map((item, key) => {
              return (
                <View key={key}>
                  {this.renderMonsterHeader(item)}
                  <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
                    <Left>
                      <Text style={{ fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                    </Left>
                    <Right>
                      <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${item.chance}%`}</Text>
                    </Right>
                  </ListItem>
                </View>
              );
            })
          }
        />
      );
    }
    return (
      null
    );
  }

  render() {
    if (this.props.monsterLoot.length === 0 && this.props.mapLoot.length === 0) {
      return (
        null
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderMonsterLoot()}
        {this.renderMapLoot()}
      </View>
    );
  }
}
