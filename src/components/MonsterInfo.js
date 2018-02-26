import React, { Component } from 'react'
import { Text, Image, View, FlatList } from 'react-native'

import styles from './Styles/MonsterInfoScreenStyles';
import { ElementStatusImages } from '../assets';

let top = true;
export default class MonsterInfo extends Component {
  constructor(props) {
    super(props);
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

  renderHeader() {
    return (
      <View style={[styles.monsterHitContainer, { paddingTop: 10, paddingBottom: 5, borderColor: 'red', borderBottomWidth: 1, marginLeft: 7.5, marginRight: 7.5 }]}>
        <Text style={[styles.monsterHitText, { flex: 2 }]}>{''}</Text>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Sever}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Blunt}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Shot}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Stun}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Fire}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Water}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Ice}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Thunder}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Dragon}
          />
        </View>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            style={{ height: 22.5, width: 22.5 }}
            source={ElementStatusImages.Extract}
          />
        </View>
      </View>
    );
  }

  renderListItems = ({ item }) => {
    return (
      <View style={[styles.monsterHitContainer, { marginLeft: 7.5, marginRight: 7.5 }]}>
        <Text style={[styles.monsterHitText, { flex: 2 }]}>{item.part_name}</Text>
        <Text style={styles.monsterHitText}>{item.sever}</Text>
        <Text style={styles.monsterHitText}>{item.blunt}</Text>
        <Text style={styles.monsterHitText}>{item.shot}</Text>
        <Text style={styles.monsterHitText}>{item.stun}</Text>
        <Text style={styles.monsterHitText}>{item.fire}</Text>
        <Text style={styles.monsterHitText}>{item.water}</Text>
        <Text style={styles.monsterHitText}>{item.ice}</Text>
        <Text style={styles.monsterHitText}>{item.thunder}</Text>
        <Text style={styles.monsterHitText}>{item.dragon}</Text>
        <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
          <View style={[styles.monsterExtractContainer, { backgroundColor: item.extract_color }]} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader.bind(this)}
        data={this.props.monster_hit}
        keyExtractor={(item) => item.part_name}
        renderItem={this.renderListItems}
        ref={ref='_Flatlist'}
        onScroll={this.handleScroll.bind(this)}
      />
    );
  }
}
