import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles'
import { Images, ElementStatusImages } from '../assets'

let top = true;
export default class MonsterQuest extends Component {
  constructor(props) {
    super(props)
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
    return (
      <View style={{ paddingTop: 10, paddingBottom: 7.5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 1, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Name</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Type</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 16, flex: 1, textAlign: 'center', color: '#191919' }}>Rank</Text>
        </View>
      </View>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <View style={{ paddingTop: 5, flex: 1, flexDirection: 'row', borderColor: 'red', borderBottomWidth: 0, alignItems: 'center', marginLeft: 7.5, marginRight: 7.5 }}>
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.quest_name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{item.type}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0}}>
          <Text style={{ fontSize: 15.5, flex: 1, textAlign: 'center', color: '#191919' }}>{`${item.required_rank} \u2605`}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        // ListHeaderComponent={this.renderHeader}
        data={this.props.monster_quest}
        keyExtractor={(item) => item.quest_id.toString()}
        renderItem={this.renderListItems}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}
