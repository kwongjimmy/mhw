import React, { PureComponent } from 'react'
import { Image, View, FlatList } from 'react-native'
import { Text, ListItem, Left, Right, Body } from 'native-base';

import styles from './Styles/MonsterInfoScreenStyles';
import { ElementStatusImages } from '../assets';

export default class MonsterInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const firstData = {
      part_name: '',
      sever: ElementStatusImages.Sever,
      blunt: ElementStatusImages.Blunt,
      shot: ElementStatusImages.Shot,
      stun: ElementStatusImages.Stun,
      fire: ElementStatusImages.Fire,
      water: ElementStatusImages.Water,
      ice: ElementStatusImages.Ice,
      thunder: ElementStatusImages.Thunder,
      dragon: ElementStatusImages.Dragon,
      header: true,
    };
    let data = this.props.monster_hit;
    data = data.splice(0, 0, firstData);
    this.state = {
      stickyHeaderIndices: [0],
      data: this.props.monster_hit
    };
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

  renderHeader() {
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, borderColor: 'red', paddingRight: 5, backgroundColor: 'white' }}>
        <Text style={[styles.monsterHitText, { flex: 2.5 }]}>{''}</Text>
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
      </ListItem>
    );
  }

  renderListItems = ({ item }) => {
    if (item.header === true) {
      return this.renderHeader();
    }
    return (
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, paddingRight: 5 }}>
        <Text style={[styles.monsterHitText, { flex: 2.5, fontSize: 13, textAlign: 'left' }]}>{item.part_name}</Text>
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
      </ListItem>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.part_name}
        renderItem={this.renderListItems}
        stickyHeaderIndices={this.state.stickyHeaderIndices}
      />
    );
  }
}
