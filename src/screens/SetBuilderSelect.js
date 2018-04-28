import React, { PureComponent } from 'react';
import { View, Platform, InteractionManager, FlatList, Image, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Body, Tabs, Tab, Container, Header, Item, Input, Icon, Button, InputGroup } from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import AdBanner from '../components/AdBanner';
import { WeaponImages, ArmorImages, MiscImages } from '../assets';
import WeaponListItem from '../components/WeaponListItem';
import KinsectListItem from '../components/KinsectListItem';
import CharmListItem from '../components/CharmListItem';
import DecorationListItem from '../components/DecorationListItem';
import ArmorListItem from '../components/ArmorListItem';

// Styles
import colors from '../styles/colors';

export default class SetBuilderSelect extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
    navBarHidden: true,
  };

  static navigatorButtons = {
    leftButtons: [
      {
        // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
        icon: Platform.OS === 'ios' ? MiscImages['ios-back'] : MiscImages['android-back'],
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ],
  };


  constructor(props) {
    super(props);
    this.state = {
      weapons: [
        {
          name: 'Great Sword',
          table: 'weapon_general_melee',
          type: 'great_sword',
        },
        {
          name: 'Long Sword',
          table: 'weapon_general_melee',
          type: 'long_sword',
        },
        {
          name: 'Sword and Shield',
          table: 'weapon_general_melee',
          type: 'sword_and_shield',
        },
        {
          name: 'Dual Blades',
          table: 'weapon_dual_blades',
          type: 'dual_blade',
        },
        {
          name: 'Hammer',
          table: 'weapon_general_melee',
          type: 'hammer',
        },
        {
          name: 'Hunting Horn',
          table: 'weapon_hunting_horns',
          type: 'hunting_horn',
        },
        {
          name: 'Lance',
          table: 'weapon_general_melee',
          type: 'lance',
        },
        {
          name: 'Gunlance',
          table: 'weapon_gunlances',
          type: 'gun_lance',
        },
        {
          name: 'Switch Axe',
          table: 'weapon_switch_axes',
          type: 'switch_axe',
        },
        {
          name: 'Charge Blade',
          table: 'weapon_charge_blades',
          type: 'charge_blade',
        },
        {
          name: 'Insect Glaive',
          table: 'weapon_insect_glaives',
          type: 'insect_glaive',
        },
        {
          name: 'Bow',
          table: 'weapon_bows',
          type: 'bow',
        },
        {
          name: 'Light Bowgun',
          table: 'weapon_bowguns',
          type: 'light_bowgun',
        },
        {
          name: 'Heavy Bowgun',
          table: 'weapon_bowguns',
          type: 'heavy_bowgun',
        },
      ],
      data: [],
      data2: [],
      loading: true,
      weapon: null,
    };
    InteractionManager.runAfterInteractions(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', location: 'Default',
      }, this.okCallback, this.errorCallback);
      db.transaction((tx) => {
        let data = [];
        let data2 =[];
        if (this.props.type === 'armor') {
          let setType = '';
          if (this.props.type2 === 'Head') setType = 'G.item_1';
          else if (this.props.type2 === 'Chest') setType = 'G.item_2';
          else if (this.props.type2 === 'Arm') setType = 'G.item_3';
          else if (this.props.type2 === 'Waist') setType = 'G.item_4';
          else setType = 'G.item_5';
          tx.executeSql(
            `SELECT
              A.*, B.name as name, B.rarity as rarity, B.buy_price as buy_price,
              C.level as skill1_level,
              D.level as skill2_level,
              E.name as skill1,
              F.name as skill2,
              E.armor_skill_id as skill1_id,
              F.armor_skill_id as skill2_id,
      			  H.pieces as pieces, H.pieces_2 as pieces_2, H.name as set_bonus_name,
      			  I.level as set_bonus_skill1_level,
      			  J.level as set_bonus_skill2_level,
      			  K.armor_skill_id as set_bonus_skill1_id, K.name as set_bonus_skill1,
      			  L.armor_skill_id as set_bonus_skill2_id, L.name as set_bonus_skill2
                    FROM armor AS A
                    JOIN items AS B ON A.item_id = B.item_id
                    LEFT JOIN armor_skills_levels AS C ON A.skill1 = C.armor_skill_level_id
                    LEFT JOIN armor_skills_levels AS D ON A.skill2 = D.armor_skill_level_id
                    LEFT JOIN armor_skills AS E ON C.armor_skill_id = E.armor_skill_id
                    LEFT JOIN armor_skills AS F ON D.armor_skill_id = F.armor_skill_id
      			  LEFT JOIN armor_sets AS G ON A.item_id = ${setType}
      			  LEFT JOIN armor_set_bonus AS H ON G.armor_set_id = H.set_id
      			  LEFT JOIN armor_skills_levels AS I ON H.skill = I.armor_skill_level_id
      			  LEFT JOIN armor_skills_levels AS J ON H.skill_2 = J.armor_skill_level_id
      			  LEFT JOIN armor_skills as K ON I.armor_skill_id = K.armor_skill_id
      			  LEFT JOIN armor_skills as L ON J.armor_skill_id = L.armor_skill_id
              WHERE A.rank = 'Low' AND A.type = ?`
            , [this.props.type2], (tx, results) => {
              const len = results.rows.length;
              data2.push({ item_id: '0' });
              for (let i = 0; i < len; i += 1) {
                data2.push(results.rows.item(i));
              }
            },
          );
          tx.executeSql(
            `SELECT
              A.*, B.name as name, B.rarity as rarity, B.buy_price as buy_price,
              C.level as skill1_level,
              D.level as skill2_level,
              E.name as skill1,
              F.name as skill2,
              E.armor_skill_id as skill1_id,
              F.armor_skill_id as skill2_id,
      			  H.pieces as pieces, H.pieces_2 as pieces_2, H.name as set_bonus_name,
      			  I.level as set_bonus_skill1_level,
      			  J.level as set_bonus_skill2_level,
      			  K.armor_skill_id as set_bonus_skill1_id, K.name as set_bonus_skill1,
      			  L.armor_skill_id as set_bonus_skill2_id, L.name as set_bonus_skill2
                    FROM armor AS A
                    JOIN items AS B ON A.item_id = B.item_id
                    LEFT JOIN armor_skills_levels AS C ON A.skill1 = C.armor_skill_level_id
                    LEFT JOIN armor_skills_levels AS D ON A.skill2 = D.armor_skill_level_id
                    LEFT JOIN armor_skills AS E ON C.armor_skill_id = E.armor_skill_id
                    LEFT JOIN armor_skills AS F ON D.armor_skill_id = F.armor_skill_id
      			  LEFT JOIN armor_sets AS G ON A.item_id = ${setType}
      			  LEFT JOIN armor_set_bonus AS H ON G.armor_set_id = H.set_id
      			  LEFT JOIN armor_skills_levels AS I ON H.skill = I.armor_skill_level_id
      			  LEFT JOIN armor_skills_levels AS J ON H.skill_2 = J.armor_skill_level_id
      			  LEFT JOIN armor_skills as K ON I.armor_skill_id = K.armor_skill_id
      			  LEFT JOIN armor_skills as L ON J.armor_skill_id = L.armor_skill_id
              WHERE A.rank = 'High' AND A.type = ?`
            , [this.props.type2], (tx, results) => {
              const len = results.rows.length;
              data.push({ item_id: '0' });
              for (let i = 0; i < len; i += 1) {
                data.push(results.rows.item(i));
              }
              this.setState({
                data,
                data2,
                loading: false,
              });
            },
          );
        } else if (this.props.type === 'decoration') {
          let whereCondition = '';
          if (this.props.level === 1) whereCondition = `WHERE B.name LIKE '%1%'`
          else if (this.props.level === 2) whereCondition = `WHERE B.name LIKE '%1%' OR B.name LIKE '%2%'`
          tx.executeSql(
            `SELECT
              A.item_id as item_id, B.name as name, C.name as skill_name, C.armor_skill_id as skill_id, D.level as skill_level, B.rarity as rarity
              FROM decorations AS A
              JOIN items AS B ON A.item_id = B.item_id
              LEFT JOIN armor_skills_levels AS D ON A.skill = D.armor_skill_level_id
              LEFT JOIN armor_skills AS C ON D.armor_skill_id = C.armor_skill_id
              ${whereCondition}`
            , [], (tx, results) => {
              const len = results.rows.length;
              data.push({ item_id: '0' });
              for (let i = 0; i < len; i += 1) {
                data.push(results.rows.item(i));
              }
              this.setState({
                data,
                loading: false,
              });
            },
          );
        } else if (this.props.type === 'charm') {
          tx.executeSql(
            `SELECT
              D.item_id as item_id, D.name as name, D.type as type, D.category1 as category, D.buy_price as buy_price, D.rarity as rarity,
              B.level as skill1_level,
              C.level as skill2_level,
              E.name as skill1_name, E.armor_skill_id as skill1_id,
              F.name as skill2_name, F.armor_skill_id as skill2_id
              FROM charms AS A
              JOIN items AS D ON A.item_id = D.item_id
              LEFT JOIN armor_skills_levels AS B ON A.armor_skill_1 = B.armor_skill_level_id
              LEFT JOIN armor_skills_levels AS C ON A.armor_skill_2 = C.armor_skill_level_id
              LEFT JOIN armor_skills AS E ON B.armor_skill_id = E.armor_skill_id
              LEFT JOIN armor_skills AS F ON C.armor_skill_id = F.armor_skill_id`
            , [], (tx, results) => {
              const len = results.rows.length;
              data.push({ item_id: '0' });
              for (let i = 0; i < len; i += 1) {
                data.push(results.rows.item(i));
              }
              this.setState({
                data,
                loading: false,
              });
            },
          );
        } else if (this.props.type === 'kinsect') {
          tx.executeSql(
            `SELECT A.*, B.name as name, B.rarity as rarity FROM kinsects AS A JOIN items AS B on A.item_id = B.item_id`
            , [], (tx, results) => {
              const len = results.rows.length;
              data.push({ item_id: '0' });
              for (let i = 0; i < len; i += 1) {
                data.push(results.rows.item(i));
              }
              this.setState({
                data,
                loading: false,
              });
            },
          );
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    if (this.props.type === 'armor') {
      this.props.navigator.setStyle({
        // tabBarButtonColor: '#0d0d0d',
        // tabBarSelectedButtonColor: '#ff6c33',
        // tabBarBackgroundColor: '#ffffff',
        // navigationBarColor: '#ffffff',
        topBarElevationShadowEnabled: false,
        topBarBorderColor: 'white',
        topBarBorderWidth: -1,
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'back') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderDecorations = ({ item }) => {
    if (item.item_id === '0') {
      return (
        <ListItem
          style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => {
            this.props.onPassProp(null);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          }
          }>
          <Text>
            Clear Selected
          </Text>
        </ListItem>
      );
    }
    return (
      <DecorationListItem setBuilder={true} navigator={this.props.navigator} onPassProp={this.props.onPassProp} item={item}/>
    );
  }

  renderArmor = ({ item }) => {
    if (item.item_id === '0') {
      return (
        <ListItem
          style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => {
            this.props.onPassProp(null);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          }
          }>
          <Text>
            Clear Selected
          </Text>
        </ListItem>
      );
    }
    return (
      <ArmorListItem setBuilder={true} navigator={this.props.navigator} onPassProp={this.props.onPassProp} item={item}/>
    );
  }

  renderCharms = ({ item }) => {
    if (item.item_id === '0') {
      return (
        <ListItem
          style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => {
            this.props.onPassProp(null);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          }
          }>
          <Text>
            Clear Selected
          </Text>
        </ListItem>
      );
    }
    return (
      <CharmListItem setBuilder={true} navigator={this.props.navigator} onPassProp={this.props.onPassProp} item={item}/>
    );
  }

  getWeaponList(type) {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', location: 'Default',
    }, this.okCallback, this.errorCallback);
    db.transaction((tx) => {
      let data = [];
      tx.executeSql(
        `SELECT
          weapon_sharpness.*,
          weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
          weapons.*, items.name as name, items.rarity as rarity, items.item_id
          FROM weapons
          JOIN items on weapons.item_id = items.item_id
          LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
          LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
          LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
          LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
          LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
          LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
          LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
          WHERE weapons.type = ?`
        , [type], (tx, results) => {
          const len = results.rows.length;
          data.push({ item_id: '0' });
          for (let i = 0; i < len; i += 1) {
            data.push(results.rows.item(i));
          }
          this.setState({
            data,
            weapon: type,
            loading: false,
          });
        },
      );
    });
  }

  renderKinsect = ({ item }) => {
    if (item.item_id === '0') {
      return (
        <ListItem
          style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => {
            this.props.onPassProp(null);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          }
          }>
          <Text>
            Clear Selected
          </Text>
        </ListItem>
      );
    }
    return (
      <KinsectListItem setBuilder={true} onPassProp={this.props.onPassProp} navigator={this.props.navigator} item={item} />
    );
  }

  renderWeapons = ({ item }) => {
    if (item.item_id === '0') {
      return (
        <ListItem
          style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => {
            this.props.onPassProp(null);
            this.props.navigator.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')});
            });
          }
          }>
          <Text>
            Clear Selected
          </Text>
        </ListItem>
      );
    }
    return (
      <WeaponListItem setBuilder={true} onPassProp={this.props.onPassProp} navigator={this.props.navigator} item={item} />
    );
  }

  renderWeaponSelect = ({ item }) => {
    const src = WeaponImages[item.name];
    return (
      <ListItem
        style={{ height: 60, marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
        onPress={() => {
          this.getWeaponList(item.type);
          this.setState({ loading: true });
        }}>
      <Left>
        <Image
          resizeMode="contain"
          style={{ width: 35, height: 35 }}
          source={src}
        />
      </Left>
      <Body style={{ flex: 6 }}>
        <Text style={{ fontSize: 20, color: colors.main }}>{item.name}</Text>
      </Body>
      </ListItem>
    );
  }

  searchQuery(text) {
    const db = SQLite.openDatabase({
      name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
    });
    db.transaction((tx) => {
      let data = [];
      let data2 = [];
      let whereCondition = '';
      if (this.props.type === 'decoration') {
        if (text.length < 1) {
          if (this.props.level === 1) whereCondition = `WHERE B.name LIKE '%1%'`
          else if (this.props.level === 2) whereCondition = `WHERE B.name LIKE '%1%' OR B.name LIKE '%2%'`
        } else {
          if (this.props.level === 1) whereCondition = `WHERE B.name LIKE '%1%' AND B.name LIKE '%${text}%'`
          else if (this.props.level === 2) whereCondition = `WHERE (B.name LIKE '%1%' OR B.name LIKE '%2%') AND B.name LIKE '%${text}%`
          else whereCondition = `WHERE B.name LIKE '%${text}%'`
        }
        tx.executeSql(
          `SELECT
            A.item_id as item_id, B.name as name, C.name as skill_name, C.armor_skill_id as skill_id, D.level as skill_level, B.rarity as rarity
            FROM decorations AS A
            JOIN items AS B ON A.item_id = B.item_id
            LEFT JOIN armor_skills_levels AS D ON A.skill = D.armor_skill_level_id
            LEFT JOIN armor_skills AS C ON D.armor_skill_id = C.armor_skill_id
            ${whereCondition}`
          , [], (tx, results) => {
            const len = results.rows.length;
            data.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data.push(results.rows.item(i));
            }
            this.setState({
              data,
            });
          },
        );
      } else if (this.props.type === 'charm') {
        if (text.length > 0) {
          whereCondition = `WHERE D.name LIKE '%${text}%'`;
        }
        tx.executeSql(
          `SELECT
            D.item_id as item_id, D.name as name, D.type as type, D.category1 as category, D.buy_price as buy_price, D.rarity as rarity,
            B.level as skill1_level,
            C.level as skill2_level,
            E.name as skill1_name, E.armor_skill_id as skill1_id,
            F.name as skill2_name, F.armor_skill_id as skill2_id
            FROM charms AS A
            JOIN items AS D ON A.item_id = D.item_id
            LEFT JOIN armor_skills_levels AS B ON A.armor_skill_1 = B.armor_skill_level_id
            LEFT JOIN armor_skills_levels AS C ON A.armor_skill_2 = C.armor_skill_level_id
            LEFT JOIN armor_skills AS E ON B.armor_skill_id = E.armor_skill_id
            LEFT JOIN armor_skills AS F ON C.armor_skill_id = F.armor_skill_id
            ${whereCondition}`
          , [], (tx, results) => {
            const len = results.rows.length;
            data.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data.push(results.rows.item(i));
            }
            this.setState({
              data,
            });
          },
        );
      } else if (this.props.type === 'kinsect') {
        if (text.length > 0) {
          whereCondition = `WHERE B.name LIKE '%${text}%'`;
        }
        tx.executeSql(
          `SELECT A.*, B.name as name, B.rarity as rarity FROM kinsects AS A JOIN items AS B on A.item_id = B.item_id ${whereCondition}`
          , [], (tx, results) => {
            const len = results.rows.length;
            data.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data.push(results.rows.item(i));
            }
            this.setState({
              data,
            });
          },
        );
      } else if (this.props.type === 'armor') {
        let setType = '';
        if (text.length > 0) {
          whereCondition = `AND B.name LIKE '%${text}%'`;
        }
        if (this.props.type2 === 'Head') setType = 'G.item_1';
        else if (this.props.type2 === 'Chest') setType = 'G.item_2';
        else if (this.props.type2 === 'Arm') setType = 'G.item_3';
        else if (this.props.type2 === 'Waist') setType = 'G.item_4';
        else setType = 'G.item_5';
        tx.executeSql(
          `SELECT
            A.*, B.name as name, B.rarity as rarity, B.buy_price as buy_price,
            C.level as skill1_level,
            D.level as skill2_level,
            E.name as skill1,
            F.name as skill2,
            E.armor_skill_id as skill1_id,
            F.armor_skill_id as skill2_id,
            H.pieces as pieces, H.pieces_2 as pieces_2, H.name as set_bonus_name,
            I.level as set_bonus_skill1_level,
            J.level as set_bonus_skill2_level,
            K.armor_skill_id as set_bonus_skill1_id, K.name as set_bonus_skill1,
            L.armor_skill_id as set_bonus_skill2_id, L.name as set_bonus_skill2
                  FROM armor AS A
                  JOIN items AS B ON A.item_id = B.item_id
                  LEFT JOIN armor_skills_levels AS C ON A.skill1 = C.armor_skill_level_id
                  LEFT JOIN armor_skills_levels AS D ON A.skill2 = D.armor_skill_level_id
                  LEFT JOIN armor_skills AS E ON C.armor_skill_id = E.armor_skill_id
                  LEFT JOIN armor_skills AS F ON D.armor_skill_id = F.armor_skill_id
            LEFT JOIN armor_sets AS G ON A.item_id = ${setType}
            LEFT JOIN armor_set_bonus AS H ON G.armor_set_id = H.set_id
            LEFT JOIN armor_skills_levels AS I ON H.skill = I.armor_skill_level_id
            LEFT JOIN armor_skills_levels AS J ON H.skill_2 = J.armor_skill_level_id
            LEFT JOIN armor_skills as K ON I.armor_skill_id = K.armor_skill_id
            LEFT JOIN armor_skills as L ON J.armor_skill_id = L.armor_skill_id
            WHERE A.rank = 'Low' AND A.type = ? ${whereCondition}`
          , [this.props.type2], (tx, results) => {
            const len = results.rows.length;
            data2.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data2.push(results.rows.item(i));
            }
          },
        );
        tx.executeSql(
          `SELECT
            A.*, B.name as name, B.rarity as rarity, B.buy_price as buy_price,
            C.level as skill1_level,
            D.level as skill2_level,
            E.name as skill1,
            F.name as skill2,
            E.armor_skill_id as skill1_id,
            F.armor_skill_id as skill2_id,
            H.pieces as pieces, H.pieces_2 as pieces_2, H.name as set_bonus_name,
            I.level as set_bonus_skill1_level,
            J.level as set_bonus_skill2_level,
            K.armor_skill_id as set_bonus_skill1_id, K.name as set_bonus_skill1,
            L.armor_skill_id as set_bonus_skill2_id, L.name as set_bonus_skill2
                  FROM armor AS A
                  JOIN items AS B ON A.item_id = B.item_id
                  LEFT JOIN armor_skills_levels AS C ON A.skill1 = C.armor_skill_level_id
                  LEFT JOIN armor_skills_levels AS D ON A.skill2 = D.armor_skill_level_id
                  LEFT JOIN armor_skills AS E ON C.armor_skill_id = E.armor_skill_id
                  LEFT JOIN armor_skills AS F ON D.armor_skill_id = F.armor_skill_id
            LEFT JOIN armor_sets AS G ON A.item_id = ${setType}
            LEFT JOIN armor_set_bonus AS H ON G.armor_set_id = H.set_id
            LEFT JOIN armor_skills_levels AS I ON H.skill = I.armor_skill_level_id
            LEFT JOIN armor_skills_levels AS J ON H.skill_2 = J.armor_skill_level_id
            LEFT JOIN armor_skills as K ON I.armor_skill_id = K.armor_skill_id
            LEFT JOIN armor_skills as L ON J.armor_skill_id = L.armor_skill_id
            WHERE A.rank = 'High' AND A.type = ? ${whereCondition}`
          , [this.props.type2], (tx, results) => {
            const len = results.rows.length;
            data.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data.push(results.rows.item(i));
            }
            this.setState({
              data,
              data2,
            });
          },
        );
      } else {
        if (text.length > 0) {
          whereCondition = `AND items.name LIKE '%${text}%'`;
        }
        tx.executeSql(
          `SELECT
            weapon_sharpness.*,
            weapon_bowgun_chars.*, weapon_coatings.*, weapon_kinsects.*, weapon_notes.*, weapon_phials.*, weapon_shellings.*,
            weapons.*, items.name as name, items.rarity as rarity, items.item_id
            FROM weapons
            JOIN items on weapons.item_id = items.item_id
            LEFT JOIN weapon_bowgun_chars ON weapons.item_id = weapon_bowgun_chars.item_id
            LEFT JOIN weapon_coatings ON weapons.item_id = weapon_coatings.item_id
            LEFT JOIN weapon_kinsects ON weapons.item_id = weapon_kinsects.item_id
            LEFT JOIN weapon_notes ON weapons.item_id = weapon_notes.item_id
            LEFT JOIN weapon_phials ON weapons.item_id = weapon_phials.item_id
            LEFT JOIN weapon_sharpness ON weapons.item_id = weapon_sharpness.item_id
            LEFT JOIN weapon_shellings ON weapons.item_id = weapon_shellings.item_id
            WHERE weapons.type = ? ${whereCondition}`
          , [this.state.weapon], (tx, results) => {
            const len = results.rows.length;
            data.push({ item_id: '0' });
            for (let i = 0; i < len; i += 1) {
              data.push(results.rows.item(i));
            }
            this.setState({
              data,
            });
          },
        );
      }
    });
  }

  renderHeader() {
    let style = {};
    let noShadow = false;
    if (this.props.type === 'armor') {
      style = {
        borderBottomWidth: (Platform.OS !== 'ios') ? 0 : 1,
        borderBottomColor: colors.accent,
        backgroundColor: 'white',
      };
      noShadow = true;
    } else {
      style = {
        borderBottomWidth: (Platform.OS !== 'ios') ? 2 : 1,
        borderBottomColor: colors.accent,
        backgroundColor: 'white',
      };
    }
    if (this.state.weapon === null && this.props.type === 'weapon') {
      return (
        <Header
          style={style}
          androidStatusBarColor='white'
          noShadow={noShadow}>
          <Left style={{ flex: 1, marginLeft: 0, paddingLeft: 0, borderWidth: 0 }}>
            <Button rounded transparent
              onPress={() => this.props.navigator.dismissModal({
                animationType: 'slide-down',
              })}>
              <Icon style={{ color: colors.main }} name='arrow-back' />
            </Button>
          </Left>
          <Body style={{ flex: 7, borderWidth: 0 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: colors.main }}>Select Weapon Type</Text>
          </Body>
        </Header>
      )
    }
    return (
      <Header
        style={style}
        androidStatusBarColor='white'
        noShadow={noShadow}
        searchBar rounded>
        <Left style={{ flex: 1, marginLeft: 0, paddingLeft: 0, borderWidth: 0 }}>
          <Button rounded transparent
            onPress={() => this.props.navigator.dismissModal({
              animationType: 'slide-down',
            })}>
            <Icon style={{ color: colors.main }} name='arrow-back' />
          </Button>
        </Left>
        <Body style={{ flex: 7, borderWidth: 0 }}>
          <Item>
            <Icon active name="search" />
            <Input underline={false} placeholder="Search" onChangeText={text => this.searchQuery(text)}/>
          </Item>
        </Body>
      </Header>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    if (this.props.type === 'armor') {
      return (
        <Container style={{ backgroundColor: 'white' }}>
          {this.renderHeader()}
          <Tabs
            prerenderingSiblingsNumber={3}
            scrollWithoutAnimation={false}
            tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
            initialPage={0}
            >
            <Tab
              activeTabStyle={{ backgroundColor: 'white' }}
              tabStyle={{ backgroundColor: 'white' }}
              activeTextStyle={{ color: colors.main }}
              textStyle={{ color: colors.secondary }}
              heading="HR Armor"
              >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                  <FlatList
                    initialNumToRender={24}
                    data={this.state.data}
                    keyExtractor={item => item.item_id.toString()}
                    renderItem={this.renderArmor}
                  />
                </View>
            </Tab>
            <Tab
              activeTabStyle={{ backgroundColor: 'white' }}
              tabStyle={{ backgroundColor: 'white' }}
              activeTextStyle={{ color: colors.main }}
              textStyle={{ color: colors.secondary }}
              heading="LR Armor"
              >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                  <FlatList
                    initialNumToRender={24}
                    data={this.state.data2}
                    keyExtractor={item => item.item_id.toString()}
                    renderItem={this.renderArmor}
                  />
                </View>
            </Tab>
          </Tabs>
          <AdBanner />
        </Container>
      );
    } else if (this.props.type === 'decoration') {
      return (
        <Container style={{ backgroundColor: 'white' }}>
          {this.renderHeader()}
          <FlatList
            initialNumToRender={24}
            data={this.state.data}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderDecorations}
          />
          <AdBanner />
        </Container>
      );
    } else if (this.props.type === 'charm') {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.renderHeader()}
          <FlatList
            initialNumToRender={24}
            data={this.state.data}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderCharms}
          />
          <AdBanner />
        </View>
      );
    } else if (this.props.type === 'weapon') {
      if (this.state.weapon === null) {
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.renderHeader()}
            <FlatList
              style={{ backgroundColor: 'white' }}
              initialNumToRender={14}
              data={this.state.weapons}
              keyExtractor={item => item.name.toString()}
              renderItem={this.renderWeaponSelect}
              getItemLayout={(data, index) => (
                { length: 60, offset: 60 * index, index }
              )}
            />
            <AdBanner />
          </View>
        );
      }
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.renderHeader()}
          <FlatList
            style={{ backgroundColor: 'white' }}
            initialNumToRender={14}
            data={this.state.data}
            keyExtractor={item => item.item_id.toString()}
            renderItem={this.renderWeapons}
          />
          <AdBanner />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderHeader()}
        <FlatList
          style={{ backgroundColor: 'white' }}
          initialNumToRender={14}
          data={this.state.data}
          keyExtractor={item => item.item_id.toString()}
          renderItem={this.renderKinsect}
        />
        <AdBanner />
      </View>
    );
  }
}
