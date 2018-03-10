import React, { PureComponent } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { ElementStatusImages, WeaponImages, BowCoatings } from '../assets';

const weaponTypes = {
  great_sword: 'Great Sword',
  long_sword: 'Long Sword',
  sword_and_shield: 'Sword and Shield',
  dual_blade: 'Dual Blades',
  hammer: 'Hammer',
  hunting_horn: 'Hunting Horn',
  lance: 'Lance',
  gun_lance: 'Gunlance',
  switch_axe: 'Switch Axe',
  charge_blade: 'Charge Blade',
  insect_glaive: 'Insect Glaive',
  bow: 'Bow',
  light_bowgun: 'Light Bowgun',
  heavy_bowgun: 'Heavy Bowgun',
};

export default class WeaponListItem extends PureComponent {
  renderSpecial(item) {
    const { type, shelling, kinsect, note1, note2, note3, phial, deviation } = item;
    if (type === 'switch_axe' || type === 'charge_blade') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#191919',textAlign: 'center' }}>{`${phial}`}</Text>
        </View>
      );
    } else if (type === 'insect_glaive') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${kinsect}`}</Text>
        </View>
      );
    } else if (type === 'gun_lance') {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#191919', textAlign: 'center' }}>{`${shelling}`}</Text>
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
    } else if (type.includes('bowgun')) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ fontSize: 14, color: '#191919', textAlign: 'right' }}>{`DEV: ${deviation}`}</Text>
        </View>
      );
    }
    return (
      <Text />
    );
  }

  renderAffinity(item) {
    const { affinity } = item;
    if (affinity !== 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0 }}>
          <Text style={{ fontSize: 14, color: '#191919' }}>{`AFF: ${affinity}%`}</Text>
        </View>
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
    );
  }

  renderCoatings(info) {
    const {
      cls, pow, par, poi, sle, bla,
    } = info;
    let margin = cls + pow + par + poi + sle + bla;
    if (margin < 3) {
      margin = 90
    } else {
      margin = 95 - (margin * 10);
    }
    const close = (cls === 1) ?
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Image
          resizeMode="contain"
          style={{ height: 20, width: 20 }}
          source={BowCoatings['Close']}
        />
      </View>
      : null;
    const power = (pow === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
        source={BowCoatings['Power']}
      />
    </View>
      : null;
    const paralysis = (par === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
        source={BowCoatings['Paralysis']}
      />
    </View>
      : null;
    const poison = (poi === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
        source={BowCoatings['Poison']}
      />
    </View>
      : null;
    const sleep = (sle === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
        source={BowCoatings['Sleep']}
      />
    </View>
      : null;
    const blast = (bla === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 20, width: 20 }}
        source={BowCoatings['Blast']}
      />
    </View>
      : null;
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, paddingLeft: margin }}>
        {close}{power}{paralysis}{poison}{sleep}{blast}
      </View>
    );
  }

  renderMeleeRangeInfo(info) {
    const {
      red, orange, yellow, green, blue, white, black, type, special_ammo,
    } = info;

    if (type.includes('bow')) {
      if (type.includes('gun')) {
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15.5, color: '#191919' }}>{`${special_ammo}`}</Text>
          </View>
        );
      }
      return this.renderCoatings(info);
    }
    let marginTop = 7.5;
    let marginBottom = 7.5;
    if (info.type === 'hunting_horn' || info.type === 'gun_lance' ||
    info.type === 'switch_axe' || info.type === 'charge_blade' ||
    info.type === 'insect_glaive') {
      marginTop = 4.5;
      marginBottom = 4.5;
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', width: 95, justifyContent: 'center'}}>
        <View style={{ flex: red, marginTop, marginBottom, backgroundColor: '#C4424E' }}/>
        <View style={{ flex: orange, marginTop, marginBottom, backgroundColor: '#DE7A56' }}/>
        <View style={{ flex: yellow, marginTop, marginBottom, backgroundColor: '#D5BF45' }}/>
        <View style={{ flex: green, marginTop, marginBottom, backgroundColor: '#94BB46' }}/>
        <View style={{ flex: blue, marginTop, marginBottom, backgroundColor: '#465DD1' }}/>
        <View style={{ flex: white, marginTop, marginBottom, backgroundColor: 'white' }}/>
        <View style={{ flex: black, marginTop, marginBottom, backgroundColor: 'black' }}/>
      </View>
    );
  }

  render() {
    const {
       item_id, name, slot1, slot2, slot3, damage, type
    } = this.props.item;

    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    return (
      <ListItem
        style={{ marginLeft: 0, marginRight: 0, paddingRight: 8, paddingLeft: 8, height: 87.5 }}
        onPress={() => this.props.navigator.push({
          screen: 'TablessInfoScreen',
          passProps: {
            item_id,
            type: 'weapons',
            item: this.props.item,
            refetch: false,
          },
          animationType: 'slide-horizontal',
          title: name,
        })}
        >
        <Left style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'red' }}>
          <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderWidth: 0 }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20 }}
              source={WeaponImages[weaponTypes[type]]}
            />
          </View>
          <View style={{ flex: 5, flexDirection: 'column'}}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, color: '#191919' }}>{`DMG: ${damage}`}</Text>
              {this.renderElement(this.props.item)}
            </View>
            {this.renderAffinity(this.props.item)}
          </View>
        </Left>
        <Right style={{ flex: 0.5, borderWidth: 0, borderColor: 'green' }}>
            {this.renderMeleeRangeInfo(this.props.item)}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'right' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          </View>
          {this.renderSpecial(this.props.item)}
        </Right>
      </ListItem>
    );
  }
}
