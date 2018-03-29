import React, { PureComponent } from 'react'
import { ScrollView, Image, View, FlatList, InteractionManager, ActivityIndicator } from 'react-native'
import { Text, ListItem, Left, Right, Body } from 'native-base';
import AdBanner from './AdBanner';
import styles from './Styles/MonsterInfoScreenStyles';
import { ElementStatusImages } from '../assets';

export default class MonsterWeakness extends PureComponent {
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
      extract_color: '',
      header: true,
    };
    let data = this.props.monster_hit;
    // data = data.splice(0, 0, firstData);
    this.state = {
      stickyHeaderIndices: [0],
      data: this.props.monster_hit,
      loading: true,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
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
      <ListItem style={{ marginLeft: 0, paddingLeft: 18, paddingRight: 5 }} itemDivider>
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

  renderExtractColor(item) {
    if (item.extract_color === '') {
      return <Text></Text>;
    }
    return <View style={[styles.monsterExtractContainer, { backgroundColor: item.extract_color }]} />;
  }

  renderDamageHeader() {
    return (
      <ListItem style={{ height: 45, marginLeft: 0, paddingLeft: 18, paddingRight: 5 }} itemDivider>
        <Text style={[styles.monsterHitText, { fontSize: 13, textAlign: 'left' }]}></Text>
        <Text style={styles.monsterHitText}>Flinch</Text>
        <Text style={styles.monsterHitText}>Wound</Text>
        <Text style={styles.monsterHitText}>Sever</Text>
      </ListItem>
    );
  }

  renderDamage() {
    return (
      <View>
        {this.renderDamageHeader()}
        {this.state.data.map((item, key) => {
          if (item.extract_color !== '') {
            return (
              <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 18, paddingRight: 5 }}>
                <Text style={[styles.monsterHitText, { fontSize: 13, textAlign: 'left' }]}>{item.part_name}</Text>
                <Text style={styles.monsterHitText}>{item.flinch}</Text>
                <Text style={styles.monsterHitText}>{item.wound}</Text>
                <Text style={styles.monsterHitText}>{item.sever2}</Text>
              </ListItem>
            );
          }
          return null;
        })}
      </View>
    );
  }

  renderWeakness() {
    return (
      <View>
        {this.renderHeader()}
        {this.state.data.map((item, key) => {
          return (
            <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 18, paddingRight: 5 }}>
              <Text style={[styles.monsterHitText, { flex: 2.5, fontSize: 9.5, textAlign: 'left' }]}>{item.part_name}</Text>
              <Text style={styles.monsterHitText}>{item.sever}</Text>
              <Text style={styles.monsterHitText}>{item.blunt}</Text>
              <Text style={styles.monsterHitText}>{item.shot}</Text>
              <Text style={styles.monsterHitText}>{item.stun}</Text>
              <Text style={[styles.monsterHitText, { color: 'red' }]}>{item.fire}</Text>
              <Text style={[styles.monsterHitText, { color: 'darkblue' }]}>{item.water}</Text>
              <Text style={[styles.monsterHitText, { color: 'teal' }]}>{item.ice}</Text>
              <Text style={[styles.monsterHitText, { color: '#e5c100' }]}>{item.thunder}</Text>
              <Text style={[styles.monsterHitText, { color: 'purple' }]}>{item.dragon}</Text>
              <View style={{ flex: 1, borderWidth: 0, alignItems: 'center' }}>
                {this.renderExtractColor(item)}
              </View>
            </ListItem>
          );
        })}
      </View>
    );
  }

  renderInfo() {
    if (this.props.monster_size === 'Large') {
      return (
        <ScrollView>
          {this.renderWeakness()}
          {this.renderDamage()}
          {/* <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.part_name}
            renderItem={this.renderListItems}
            // stickyHeaderIndices={this.state.stickyHeaderIndices}
          />
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.part_name}
            renderItem={this.renderDamageEffects}
            // stickyHeaderIndices={this.state.stickyHeaderIndices}
          /> */}
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        {this.renderWeakness()}
        {/* <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.part_name}
          renderItem={this.renderListItems}
          // stickyHeaderIndices={this.state.stickyHeaderIndices}
        /> */}
      </ScrollView>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white',
        }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderInfo()}
      </View>
    );
  }
}
