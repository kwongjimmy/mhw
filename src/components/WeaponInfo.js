import React, { PureComponent } from 'react';
import { ScrollView, View, ActivityIndicator, Image } from 'react-native';
import { Container, ListItem, Text, Right, Left, Body } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import { ElementStatusImages, BowCoatings } from '../assets';
import WeaponListItem from './WeaponListItem';
import AdBanner from './AdBanner';

const bulletTypes = {
  Nrm: 'Normal',
  Prc: 'Piercing',
  Spr: 'Spread',
  Sti: 'Sticky',
  Clu: 'Cluster',
  Rec: 'Recover',
  Poi: 'Poison',
  Par: 'Paralysis',
  Sle: 'Sleep',
  Exh: 'Exhaust',
  Fla: 'Flaming',
  Wat: 'Water',
  Fre: 'Freeze',
  Thn: 'Thunder',
  Dra: 'Dragon',
  Sli: 'Slicing',
  Wyv: 'Wyvern',
  Dem: 'Demon',
  Arm: 'Armor',
  Tra: 'Tranq',
};

export default class WeaponInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: this.props.item,
      craftMaterials: [],
      upgradeMaterials: [],
      upgradeFrom: [],
      ammo: [],
    };
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let craftMaterials = [];
      let upgradeMaterials = [];
      const upgradeTo = [];
      let ammo = [];
      let info = this.props.item;
      if (this.props.refetch) {
        tx.executeSql(
`          SELECT weapon_sharpness.*,
            weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
            weapons.*, items.name as name, items.rarity as rarity
            FROM weapons
            JOIN items on weapons.item_id = items.item_id
            LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
            LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
            LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
            LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
            LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
            LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
            LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
            WHERE items.item_id = ?`
          , [this.props.item_id], (tx, results) => {
            info = results.rows.item(0);
          },
        );
      }
      tx.executeSql(
        `SELECT A.bullet_type, A.level_1, A.level_2, A.level_3
          FROM weapon_bowgun_ammo as A
          WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            ammo.push(results.rows.item(i));
          }
        },
      );
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM weapons as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN crafting AS C ON A.item_id = C.item_id
        JOIN items as D ON C.item_material_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            craftMaterials.push(results.rows.item(i));
          }
        },
      );
      tx.executeSql(
        `SELECT D.item_id, D.name, C.quantity
        FROM weapons as A
        JOIN items AS B ON A.item_id = B.item_id
        JOIN weapon_upgrade_items AS C ON A.item_id = C.item_id
        JOIN items as D ON C.material_item_id = D.item_id WHERE A.item_id = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            upgradeMaterials.push(results.rows.item(i));
          }
        },
      );
      tx.executeSql(
        `SELECT
          weapon_sharpness.*,
          weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
          weapons.*, items.name as name, items.rarity as rarity
          FROM weapons
          JOIN items on weapons.item_id = items.item_id
          LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
          LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
          LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
          LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
          LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
          LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
          LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
  		    WHERE weapons.upgrade_from = ?`
        , [this.props.item_id], (tx, results) => {
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            upgradeTo.push(results.rows.item(i));
          }
          this.setState({
            info, ammo, craftMaterials, upgradeMaterials, upgradeTo, loading: false,
          });
        },
      );
    });
  }

  renderUpgradeTo() {
    if (this.state.upgradeTo.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Next Weapon</Text>
            </Left>
            <Right>
            </Right>
          </ListItem>
          {this.state.upgradeTo.map((item, key) => {
            return (
              <WeaponListItem key={key} navigator={this.props.navigator} item={item} />
            );
          })}
        </View>
      );
    }
    return (
      null
    );
  }

  renderSpecial(info) {
    if (info.type === 'charge_blade' || info.type === 'switch_axe') {
      return (
        <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.phial}`}</Text>
      );
    } else if (info.type === 'dual_blade') {
      return this.renderElement(info, true);
    } else if (info.type === 'insect_glaive') {
      return (
        <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.kinsect}`}</Text>
      );
    } else if (info.type === 'gun_lance') {
      return <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{info.shelling}</Text>;
    } else if (info.type === 'hunting_horn') {
      return (
        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15, paddingRight: 15 }}>
          <Text style={{ flex: 1, fontSize: 18, color: info.note1.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
          <Text style={{ flex: 1, fontSize: 18, color: info.note2.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
          <Text style={{ flex: 1, fontSize: 18, color: info.note3.replace('white', 'gray'), textAlign: 'center' }}>{`\u266b`}</Text>
        </View>
      );
    }
    return <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}></Text>;
  }

  renderElement(info, db) {
    if (db) {
      if (info.element_amount2 > 0) {
        return (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 15, marginRight: 15 }}>
            <View style={{ flex: 1, borderColor: 'blue', borderWidth: 0 }}>
              <Text style={{ fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.element_amount2}`}</Text>
            </View>
            <View style={{ flex: 0.5, borderWidth: 0, borderColor: 'red' }}>
              <Image
                resizeMode="contain"
                style={{ height: 22.5, width: 22.5 }}
                source={ElementStatusImages[info.element_type2]}
              />
            </View>
          </View>
        );
      }
      return (
        <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.element_amount2}`}</Text>
      )
    }
    if (info.req_armor_skill) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 0, marginRight: 0 }}>
            <Text style={{ fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`(${info.element_amount})`}</Text>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5 }}
              source={ElementStatusImages[info.element_type]}
            />
        </View>
      );
    } else if (info.element_amount > 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 0, marginLeft: 0, marginRight: 0 }}>
            <Text style={{ fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.element_amount}`}</Text>
            <Image
              resizeMode="contain"
              style={{ height: 22.5, width: 22.5 }}
              source={ElementStatusImages[info.element_type]}
            />
        </View>
      );
    }
    return (
      <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${info.element_amount}`}</Text>
    );
  }

  renderSecondaryInfo(info) {
    const {
      defense, affinity
    } = info;

    let special = '';
    if (info.type === 'charge_blade' || info.type === 'switch_axe') {
      special = 'Phial';
    } else if (info.type === 'dual_blade') {
      special = 'Element 2';
    } else if (info.type === 'insect_glaive') {
      special = 'Kinsect';
    } else if (info.type === 'hunting_horn') {
      special = 'Notes';
    } else if (info.type === 'gun_lance') {
      special = 'Shelling';
    }

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Defense</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Affinty</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Element</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{special}</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center', borderWidth: 0 }}>{`+${defense}`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center', borderWidth: 0 }}>{`${affinity}%`}</Text>
          <View style={{ flex: 1, borderWidth: 0 }}>
            {this.renderElement(info, false)}
          </View>
          <View style={{ flex: 1, borderWidth: 0 }}>
            {this.renderSpecial(info)}
          </View>
        </ListItem>
      </View>
    );
  }

  renderAmmo() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0 }} itemDivider>
          <Text style={{ flex: 3, fontSize: 15.5, color: '#191919' }}>Ammo Type</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Lv1</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Lv2</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Lv3</Text>
        </ListItem>
        {this.state.ammo.map((item, key) => {
          return (
            <ListItem key={key} style={{ marginLeft: 0, paddingLeft: 18 }}>
              <Text style={{ flex: 3, fontSize: 15.5, color: '#191919' }}>{bulletTypes[item.bullet_type]}</Text>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{item.level_1}</Text>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{item.level_2}</Text>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{item.level_3}</Text>
            </ListItem>
          );
        })}
      </View>
    );
  }

  renderCoatings(info) {
    const {
      cls, pow, par, poi, sle, bla,
    } = info;
    let margin = cls + pow + par + poi + sle + bla;

    if (margin <= 2) {
      margin = 25;
    } else {
      margin = 10;
    }

    const close = (cls === 1) ?
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          resizeMode="contain"
          style={{ height: 22.5, width: 22.5 }}
          source={BowCoatings['Close']}
        />
      </View>
      : null;
    const power = (pow === 1) ?
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ height: 22.5, width: 22.5 }}
        source={BowCoatings['Power']}
      />
    </View>
      : null;
    const paralysis = (par === 1) ?
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ height: 22.5, width: 22.5 }}
        source={BowCoatings['Paralysis']}
      />
    </View>
      : null;
    const poison = (poi === 1) ?
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ height: 22.5, width: 22.5 }}
        source={BowCoatings['Poison']}
      />
    </View>
      : null;
    const sleep = (sle === 1) ?
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ height: 22.5, width: 22.5 }}
        source={BowCoatings['Sleep']}
      />
    </View>
      : null;
    const blast = (bla === 1) ?
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        resizeMode="contain"
        style={{ height: 22.5, width: 22.5 }}
        source={BowCoatings['Blast']}
      />
    </View>
      : null;
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: margin, marginRight: margin }}>
        {close}{power}{paralysis}{poison}{sleep}{blast}
      </View>
    );
  }

  renderBowGunSecondaryInfo(info) {
    const {
      deviation, defense, affinity
    } = info;

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Defense</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Affinty</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Deviation</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${defense}`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${affinity}`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${deviation}`}</Text>
        </ListItem>
      </View>
    );
  }

  renderBowGunInfo(info) {
    const {
      damage, true_damage, rarity, slot1, slot2, slot3, special_ammo
    } = info;

    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Attack (True)</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Special</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${damage} (${true_damage})`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${special_ammo}`}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
        {this.renderBowGunSecondaryInfo(info)}
      </View>
    );
  }

  renderBowInfo(info) {
    const {
      damage, true_damage, req_armor_skill, element_amount, element_type, defense, affinity, rarity, slot1, slot2, slot3,
    } = info;
    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Attack (True)</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Coatings</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${damage} (${true_damage})`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {this.renderCoatings(info)}
          </View>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
        {this.renderSecondaryInfo(info)}
      </View>
    );
  }

  renderInfo(info) {
    const {
      damage, true_damage, req_armor_skill, element_amount, element_type, defense, affinity, rarity, slot1, slot2, slot3, red, orange, yellow, green, blue, white, black
    } = info;
    const slotOne = (slot1 === 0) ? `-` : (slot1 === 1) ? `\u2460` : (slot1 === 2) ? `\u2461` : `\u2462`;
    const slotTwo = (slot2 === 0) ? `-` : (slot2 === 1) ? `\u2460` : (slot2 === 2) ? `\u2461` : `\u2462`;
    const slotThree = (slot3 === 0) ? `-` : (slot3 === 1) ? `\u2460` : (slot3 === 2) ? `\u2461` : `\u2462`;

    return (
      <View>
        <ListItem style={{ marginLeft: 0, borderBottomWidth: 0.0 }} itemDivider>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Attack (True)</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Slots</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Sharpness</Text>
            <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>Rarity</Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0, backgroundColor: 'white' }} itemDivider>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${damage} (${true_damage})`} </Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{`${slotOne} ${slotTwo} ${slotThree}`}</Text>
          <View style={{ flex: 1, flexDirection: 'row', width: 100 }}>
            <View style={{ flex: red, height: 10, backgroundColor: '#C4424E' }}/>
            <View style={{ flex: orange, height: 10, backgroundColor: '#DE7A56' }}/>
            <View style={{ flex: yellow, height: 10, backgroundColor: '#D5BF45' }}/>
            <View style={{ flex: green, height: 10, backgroundColor: '#94BB46' }}/>
            <View style={{ flex: blue, height: 10, backgroundColor: '#465DD1' }}/>
            <View style={{ flex: white, height: 10, backgroundColor: 'white' }}/>
            <View style={{ flex: black, height: 10, backgroundColor: 'black' }}/>
          </View>
          <Text style={{ flex: 1, fontSize: 15.5, color: '#191919', textAlign: 'center' }}>{rarity}</Text>
        </ListItem>
        {this.renderSecondaryInfo(info)}
      </View>
    );
  }

  renderCrafting() {
    if (this.state.craftMaterials.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Craft Material</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
            </Right>
          </ListItem>
          {this.state.craftMaterials.map((item, key) => {
            return (
              <View key={key}>
                <ListItem style={{ marginLeft: 0, backgroundColor: 'white', paddingLeft: 8 }}
                  onPress={() => this.props.navigator.push({
                    screen: 'TablessInfoScreen',
                    passProps: {
                      item_id: item.item_id,
                      type: 'item',
                    },
                    animationType: 'slide-horizontal',
                    title: item.name,
                  })}
                  >
                  <Left>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
                  </Right>
                </ListItem>
              </View>
            );
          })
          }
        </View>
      );
    }
    return (
      null
    );
  }

  renderUpgrading() {
    if (this.state.upgradeMaterials.length > 0) {
      return (
        <View>
          <ListItem style={{ marginLeft: 0, paddingLeft: 8 }} itemDivider>
            <Left>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>Upgrade Material</Text>
            </Left>
            <Right>
              <Text style={{ flex: 1, fontSize: 15.5, color: '#8e8e8e' }}>Quantity</Text>
            </Right>
          </ListItem>
          {this.state.upgradeMaterials.map((item, key) => {
            return (
              <View key={key}>
                <ListItem style={{ marginLeft: 0, backgroundColor: 'white', paddingLeft: 8 }}
                  onPress={() => this.props.navigator.push({
                    screen: 'TablessInfoScreen',
                    passProps: {
                      item_id: item.item_id,
                      type: 'item',
                    },
                    animationType: 'slide-horizontal',
                    title: item.name,
                  })}
                  >
                  <Left>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Text style={{ flex: 1, fontSize: 15.5, color: '#191919' }}>{item.quantity}</Text>
                  </Right>
                </ListItem>
              </View>
            );
          })
          }
        </View>
      );
    }
    return (
      null
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color="#5e5e5e"/>
        </View>
      );
    } else if (this.state.info.type === 'bow') {
      return (
        <ScrollView style={{ backgroundColor: 'white' }}>
          {this.renderBowInfo(this.state.info)}
          {this.renderUpgrading()}
          {this.renderCrafting()}
          {this.renderUpgradeTo()}
        </ScrollView>
      );
    } else if (this.state.info.type.includes('bowgun')) {
      return (
        <ScrollView style={{ backgroundColor: 'white' }}>
          {this.renderBowGunInfo(this.state.info)}
          {this.renderUpgrading()}
          {this.renderCrafting()}
          {this.renderUpgradeTo()}
          {this.renderAmmo(this.state.info)}
        </ScrollView>
      );
    }
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        {this.renderInfo(this.state.info)}
        {this.renderUpgrading()}
        {this.renderCrafting()}
        {this.renderUpgradeTo()}
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderContent()}
        <AdBanner />
      </View>
    );
  }
}
