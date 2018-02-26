import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../assets'

let top = true;
export default class MonsterLoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lowrank: true,
      data: this.props.monster_loot
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!');
    }
    if (event.id === 'bottomTabReselected') {
      if(top === false) {
        this.refs._Flatlist.scrollToOffset({
          animated: true,
          offSet: { y: 0, x: 0 }
        })
      } else {
        this.props.navigator.popToRoot({
          animated: true,
          animationType: 'fade',
        })
      }
    }
  }

  handleScroll(event) {
    if(event.nativeEvent.contentOffset.y !== 0) {
      top = false;
    } else {
      top = true;
    }
  }

  renderHeader() {
    if(this.state.lowrank) {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Condition</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Low</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity onPress={() => this.toggleRank('high')}>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>High</Text>
            </TouchableOpacity>
            </View> */}
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Condition</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
            <View style={{ flex: 1, marginLeft: 50 }}>
              <TouchableOpacity onPress={() => this.toggleRank('low')}>
                <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#5e5e5e' }}>Low</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginRight: 50 }}>
              <TouchableOpacity>
              <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>High</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      );
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

  // toggleRank = (text) => {
  //   if(text === 'low' && !this.state.lowrank) {
  //     this.setState({ lowrank: true, data: this.props.monster_loot });
  //   } else if(text === 'high' && this.state.lowrank){
  //     this.setState({ lowrank: false, data: this.props.monster_loot_high });
  //   }
  // }

  render() {
    return (
      <FlatList
        // ListHeaderComponent={this.renderHeader.bind(this)}
        data={this.state.data}
        keyExtractor={(item) => item.loot_id.toString()}
        renderItem={this.renderListItems}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}
