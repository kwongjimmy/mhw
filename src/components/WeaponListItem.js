import React, { PureComponent } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { ElementStatusImages } from '../assets';


export default class WeaponListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderSpecial(item) {
    const { type, shelling, kinsect, note1, note2, note3 , phial } = item;
    if (type === 'switch_axe' || type === 'charge_blade') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${phial}`}</Text>
        </View>
      );
    } else if (type === 'insect_glaive') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${kinsect}`}</Text>
        </View>
      );
    } else if (type === 'gunlance') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ flex: 1, fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${shelling}`}</Text>
        </View>
      );
    } else if (type === 'hunting_horn') {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, color: note1.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
          <Text style={{ fontSize: 18, color: note2.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
          <Text style={{ fontSize: 18, color: note3.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
        </View>
      )
    }
    return (
      null
    );
  }

  renderAffinity(item) {
    const { affinity } = item;
    if (affinity !== 0) {
      return (
        <Text style={{ flex: 1, fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${affinity}%`}</Text>
      );
    }
    return (
      <Text />
    );
  }

  renderElement2(item) {
    const {
      element_amount2, element_type2,
    } = item;
    if (element_amount2) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 14, color: '#191919' }}>{`${element_amount2}`}</Text>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={ElementStatusImages[element_type2]}
          />
        </View>
      );
    }
    return (
      null
    );
  }
  renderElement(item) {
    const {
      element_amount, element_type, req_armor_skill, type,
    } = item;
    if (element_amount && req_armor_skill) {
      return (
        <View style={{ flexDirection: 'row', borderWidth: 0 }}>
          <Text style={{ fontSize: 14, color: '#191919' }}>{`(${element_amount})`}</Text>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={ElementStatusImages[element_type]}
          />
        </View>
      );
    } else if (element_amount && type === 'dual_blade') {
      return (
        <View style={{ flexDirection: 'row', borderWidth: 0 }}>
          <Text style={{ fontSize: 14, color: '#191919' }}>{`${element_amount}`}</Text>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={ElementStatusImages[element_type]}
          />
          {this.renderElement2(item)}
        </View>
      );
    } else if (element_amount) {
      return (
        <View style={{ flexDirection: 'row', borderWidth: 0 }}>
          <Text style={{ fontSize: 14, color: '#191919' }}>{`${element_amount}`}</Text>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={ElementStatusImages[element_type]}
          />
        </View>
      );
    }
    return (
      <Text />
    )
  }

  render() {
    const {
       item_id, name, red, orange, yellow, green, blue, white, black, type, slot1, slot2, slot3, damage,
    } = this.props.item;

    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    if (!type.includes('bow')) {
      return (
        <ListItem
          style={{ marginLeft: 0, marginRight: 0, paddingRight: 8, paddingLeft: 8 }}
          onPress={() => this.props.navigator.push({
            screen: 'TablessInfoScreen',
            passProps: {
              item_id,
              type: 'weapons',
              item: this.props.item,
            },
            animationType: 'fade',
            title: name,
          })}
          >
          <Left style={{ flex: 1, flexDirection: 'column', borderWidth: 0, borderColor: 'red' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, color: '#191919' }}>{`DMG:${damage}`}</Text>
              {this.renderElement(this.props.item)}
            </View>
          </Left>
          <Right style={{ flex: 0.5, borderWidth: 0, borderColor: 'green' }}>
            <View style={{ flex: 1, flexDirection: 'row', width: 93 }}>
              <View style={{ flex: red, height: 10, backgroundColor: '#C4424E' }}/>
              <View style={{ flex: orange, height: 10, backgroundColor: '#DE7A56' }}/>
              <View style={{ flex: yellow, height: 10, backgroundColor: '#D5BF45' }}/>
              <View style={{ flex: green, height: 10, backgroundColor: '#94BB46' }}/>
              <View style={{ flex: blue, height: 10, backgroundColor: '#465DD1' }}/>
              <View style={{ flex: white, height: 10, backgroundColor: 'white' }}/>
              <View style={{ flex: black, height: 10, backgroundColor: 'black' }}/>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 2.5 }}>
              {this.renderAffinity(this.props.item)}
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'right' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
            </View>
            {this.renderSpecial(this.props.item)}
          </Right>
        </ListItem>
      );
    }
    return (
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 8 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id,
            type: 'weapons',
            item: this.props.item,
          },
          animationType: 'fade',
          title: name,
        })}
        >
        <Left>
          <Text style={{ fontSize: 15.5, color: '#191919' }}>{name}</Text>
        </Left>
        <Body>

        </Body>
        <Right>
        </Right>
      </ListItem>
    );
  }
}
