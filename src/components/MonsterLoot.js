import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

let top = true;
export default class MonsterLoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowrank: true,
      data: this.props.monster_loot,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      if (top === false) {
        this.refs._Flatlist.scrollToOffset({
          animated: true,
          offSet: { y: 0, x: 0 },
        });
      } else {
        this.props.navigator.popToRoot({
          animated: true,
          animationType: 'fade',
        });
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

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0}}>
            {/* <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderWidth: 0}} onPress={() => this.props.navigation.navigate('ItemInfo', { item_id: item.item_id, item_name: item.item_name })}> */}
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', borderWidth: 0}}
              onPress={() => this.props.navigator.push({
              screen: 'ItemInfoScreen',
              passProps: {
                item_id: item.item_id,
                category: 'item'
              },
              animationType: 'fade',
              title: item.item_name
            })}>
              <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.item_name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.loot_id.toString()}
        renderItem={this.renderListItems}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}
