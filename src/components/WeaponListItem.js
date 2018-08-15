import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { View, Text, Left, Body, Right, ListItem } from 'native-base';
import { ElementStatusImages, WeaponImages, BowCoatings } from '../assets';

// Styles
import colors from '../styles/colors';

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
    const {
      type, shelling, kinsect, note1, note2, note3, phial, deviation,
    } = item;

    if (type === 'switch_axe' || type === 'charge_blade') {
      return (
        <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`${phial.replace('Phial', '')}`}</Text>
      );
    } else if (type === 'insect_glaive') {
      return (
        <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`${kinsect}`}</Text>
      );
    } else if (type === 'gun_lance') {
      return (
        <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`${shelling}`}</Text>
      );
    } else if (type === 'hunting_horn') {
      return (
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={{ flex: 1, fontSize: 17.5, lineHeight: 16.5, color: note1.replace('white', 'gray').replace('yellow', '#D5BF45'), textAlign: 'right' }}>{`\u266b`}
            <Text style={{ flex: 1, fontSize: 17.5, lineHeight: 16.5, color: note2.replace('white', 'gray').replace('yellow', '#D5BF45'), textAlign: 'right' }}>{`\u266b`}</Text>
            <Text style={{ flex: 1, fontSize: 17.5, lineHeight: 16.5, color: note3.replace('white', 'gray').replace('yellow', '#D5BF45'), textAlign: 'right' }}>{`\u266b`}</Text>
          </Text>
        </View>
      )
    } else if (type.includes('bowgun')) {
      return (
        <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`DEV: ${deviation}`}</Text>
      );
    }
    return (
      <View style={{ flex: 1 }} />
    );
  }

  renderAffinity(item) {
    const { affinity } = item;
    if (affinity !== 0) {
      return (
        <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'left' }}>{`AFF: ${affinity}%`}</Text>
      );
    }
    return (
      null
    );
  }

  renderDefense(item) {
    const { defense } = item;
    if ( defense !== 0) {
      return (
        <Text style={{ flex: 1.5, fontSize: 12.5, color: colors.main, textAlign: 'left' }}>{`DEF: ${defense}`}</Text>
      );
    }
    return (
      null
    );
  }

  renderElement2(item) {
    const {
      element_amount2, element_type2,
    } = item;
    if (element_amount2) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 12.5, color: colors.main }}>{`${element_amount2}`}</Text>
          <View style={{ justifyContent: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20, justifyContent: 'center' }}
              source={ElementStatusImages[element_type2]}
            />
          </View>
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
        <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 12.5, color: colors.main }}>{`(${element_amount})`}</Text>
          <View style={{ justifyContent: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20, justifyContent: 'center' }}
              source={ElementStatusImages[element_type]}
            />
          </View>
        </View>
      );
    } else if (element_amount && type === 'dual_blade') {
      return (
        <View style={{ flex: 1.5, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 12.5, color: colors.main }}>{`${element_amount}`}</Text>
            <View style={{ justifyContent: 'center' }}>
              <Image
                resizeMode="contain"
                style={{ height: 20, width: 20, justifyContent: 'center' }}
                source={ElementStatusImages[element_type]}
              />
            </View>
          </View>
          {this.renderElement2(item)}
        </View>
      );
    } else if (element_amount) {
      return (
        <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 12.5, color: colors.main }}>{`${element_amount}`}</Text>
          <View style={{ justifyContent: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20, justifyContent: 'center' }}
              source={ElementStatusImages[element_type]}
            />
          </View>
        </View>
      );
    }
    return (
      null
    );
  }

  renderCoatings(info) {
    const {
      cls, pow, par, poi, sle, bla,
    } = info;
    let margin = cls + pow + par + poi + sle + bla;
    if (margin < 3) {
      margin = 70
    } else {
      margin = 70 - (margin * 5);
    }
    const close = (cls === 1) ?
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Image
          resizeMode="contain"
          style={{ height: 15, width: 15 }}
          source={BowCoatings['Close']}
        />
      </View>
      : null;
    const power = (pow === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 15, width: 15 }}
        source={BowCoatings['Power']}
      />
    </View>
      : null;
    const paralysis = (par === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 15, width: 15 }}
        source={BowCoatings['Paralysis']}
      />
    </View>
      : null;
    const poison = (poi === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 15, width: 15 }}
        source={BowCoatings['Poison']}
      />
    </View>
      : null;
    const sleep = (sle === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 15, width: 15 }}
        source={BowCoatings['Sleep']}
      />
    </View>
      : null;
    const blast = (bla === 1) ?
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Image
        resizeMode="contain"
        style={{ height: 15, width: 15 }}
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
          <Text style={{ flex: 1, fontSize: 13, color: colors.main, textAlign: 'right' }}>{`${special_ammo}`}</Text>
        );
      }
      return this.renderCoatings(info);
    }

    return (
        <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', borderWidth: 1.5, borderColor: colors.secondary }}>
          <View style={{ flex: red, backgroundColor: '#C4424E', marginRight: -0.5 }}/>
          <View style={{ flex: orange, backgroundColor: '#DE7A56', marginRight: -0.5 }}/>
          <View style={{ flex: yellow, backgroundColor: '#D5BF45', marginRight: -0.5 }}/>
          <View style={{ flex: green, backgroundColor: '#94BB46', marginRight: -0.5 }}/>
          <View style={{ flex: blue, backgroundColor: '#465DD1', marginRight: -0.5 }}/>
          <View style={{ flex: white, backgroundColor: colors.background, marginRight: -0.5 }}/>
          <View style={{ flex: black, backgroundColor: 'black', marginRight: -0.5 }}/>
        </View>
    );
  }

  renderSharpness2(info) {
    const {
      red2, orange2, yellow2, green2, blue2, white2, black2, type,
    } = info;

    if (type.includes('bow')) {
      return null;
    }

    return (
      <View style={{ flex: 0.25, flexDirection: 'row', justifyContent: 'center', borderWidth: 1.5, borderTopWidth: 0, borderColor: colors.secondary }}>
        <View style={{ flex: red2, backgroundColor: '#C4424E', marginRight: -0.5 }}/>
        <View style={{ flex: orange2, backgroundColor: '#DE7A56', marginRight: -0.5 }}/>
        <View style={{ flex: yellow2, backgroundColor: '#D5BF45', marginRight: -0.5 }}/>
        <View style={{ flex: green2, backgroundColor: '#94BB46', marginRight: -0.5 }}/>
        <View style={{ flex: blue2, backgroundColor: '#465DD1', marginRight: -0.5 }}/>
        <View style={{ flex: white2, backgroundColor: colors.background, marginRight: -0.5 }}/>
        <View style={{ flex: black2, backgroundColor: 'black', marginRight: -0.5 }}/>
      </View>
    );
  }

  render() {
    const {
       item_id, name, slot1, slot2, slot3, damage, type, rarity
    } = this.props.item;

    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    // For SetBuilder
    if (this.props.setSelected) {
      return (
        <View
          style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0, borderWidth: 0, flexDirection: 'row' }}
          >
          <Left style={{ flex: 0.5 }}>
            <Image
              resizeMode="contain"
              style={{ height: 20, width: 20 }}
              source={WeaponImages[`${weaponTypes[type]} ${rarity}`]} />
          </Left>
          <Body style={{ flex: 4.5 }}>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: colors.accent }}>
              <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{name}</Text>
              <View style={{ flex: 0.75, justifyContent: 'center' }}>
                {this.renderMeleeRangeInfo(this.props.item)}
                {this.renderSharpness2(this.props.item)}
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue' }}>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <Text style={{ flex: 1, fontSize: 12.5, color: colors.main }}>{`DMG: ${damage}`}</Text>
                {this.renderElement(this.props.item)}
              </View>
              <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                {this.renderAffinity(this.props.item)}
                {this.renderDefense(this.props.item)}
              </View>
              {this.renderSpecial(this.props.item)}
            </View>
          </Body>
        </View>
      );
    }
    return (
      // <ListItem
      //   style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
      //   onPress={() => this.props.navigator.push({
      //   screen: 'TablessInfoScreen',
      //   passProps: {
      //     item_id,
      //     type: 'weapons',
      //     item: this.props.item,
      //   },
      //   animationType: 'slide-horizontal',
      //   title: name,
      // })}>
      <ListItem
        style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => {
          if (this.props.setBuilder) {
            this.props.onPassProp(this.props.item);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          } else if (type.includes('bowgun')) {
            // this.props.navigator.push({
            //   screen: 'TabInfoScreen',
            //   passProps: {
            //     item_id,
            //     type: 'weapons',
            //     item: this.props.item,
            //   },
            //   animationType: 'slide-horizontal',
            //   title: name,
            // });
            this.props.navigator.push({
              screen: 'WeaponInfoScreen',
              passProps: {
                item_id,
                type: this.props.item.type,
                item: this.props.item,
              },
              animationType: 'slide-horizontal',
              title: name,
            });
          } else {
            this.props.navigator.push({
              screen: 'WeaponInfoScreen',
              passProps: {
                item_id,
                type: this.props.item.type,
                item: this.props.item,
              },
              animationType: 'slide-horizontal',
              title: name,
            });
          }
        }}
        >
        <Left style={{ flex: 0.5 }}>
          <Image
            resizeMode="contain"
            style={{ height: 20, width: 20 }}
            source={WeaponImages[`${weaponTypes[type]} ${rarity}`]} />
        </Left>
        <Body style={{ flex: 4.5 }}>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: colors.accent }}>
            <Text style={{ flex: 1.5, fontSize: 15.5, color: colors.main, justifyContent: 'center', lineHeight: 17.5 }}>{name}</Text>
            <View style={{ flex: 0.75, justifyContent: 'center' }}>
              {this.renderMeleeRangeInfo(this.props.item)}
              {this.renderSharpness2(this.props.item)}
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'blue' }}>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 12.5, color: colors.main }}>{`DMG: ${damage}`}</Text>
              {this.renderElement(this.props.item)}
            </View>
            <Text style={{ flex: 1, fontSize: 12.5, color: colors.main, textAlign: 'right' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', borderWidth: 0, borderColor: 'green' }}>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              {this.renderAffinity(this.props.item)}
              {this.renderDefense(this.props.item)}
            </View>
            {this.renderSpecial(this.props.item)}
          </View>
        </Body>
      </ListItem>
    );
  }
}
