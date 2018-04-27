import React, { PureComponent } from 'react';
import { View, ScrollView, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { Text, ListItem, Left, Right, Body, Container, Tabs, Tab, Button } from 'native-base';
import { WeaponImages, ArmorImages, ElementStatusImages } from '../assets';
import WeaponListItem from '../components/WeaponListItem';
import KinsectListItem from '../components/KinsectListItem';
import CharmListItem from '../components/CharmListItem';
import DecorationListItem from '../components/DecorationListItem';
import ArmorListItem from '../components/ArmorListItem';
import AdBanner from '../components/AdBanner';
import Modal from 'react-native-modal';

// Styles
import colors from '../styles/colors';

export default class SetBuilderScreen extends PureComponent {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Clear', // for a textual button, provide the button title (label)
        id: 'Clear', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'never', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: colors.main, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      sets: [],
      setName: '',
      equipment: {
        weapon: null,
        helm: null,
        chest: null,
        arms: null,
        waist: null,
        legs: null,
        charm: null,
        kinsect: null,
      },
      h_slot1: null,
      h_slot2: null,
      h_slot3: null,
      c_slot1: null,
      c_slot2: null,
      c_slot3: null,
      a_slot1: null,
      a_slot2: null,
      a_slot3: null,
      w_slot1: null,
      w_slot2: null,
      w_slot3: null,
      l_slot1: null,
      l_slot2: null,
      l_slot3: null,
      wep_slot1: null,
      wep_slot2: null,
      wep_slot3: null,
      defense: 0,
      fire: 0,
      water: 0,
      thunder: 0,
      ice: 0,
      dragon: 0,
      skills: {},
      setBonus: {},
      loading: true,
      clearModal: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    AsyncStorage.getItem('@sets')
      .then(data => JSON.parse(data))
      .then((jsonData) => {
        let sets = jsonData;
        let currentSet = sets[this.props.index];
        this.setState({
          sets,
          setName: currentSet.setName,
          equipment: currentSet.equipment,
          h_slot1: currentSet.h_slot1,
          h_slot2: currentSet.h_slot2,
          h_slot3: currentSet.h_slot3,
          c_slot1: currentSet.c_slot1,
          c_slot2: currentSet.c_slot2,
          c_slot3: currentSet.c_slot3,
          a_slot1: currentSet.a_slot1,
          a_slot2: currentSet.a_slot2,
          a_slot3: currentSet.a_slot3,
          w_slot1: currentSet.w_slot1,
          w_slot2: currentSet.w_slot2,
          w_slot3: currentSet.w_slot3,
          l_slot1: currentSet.l_slot1,
          l_slot2: currentSet.l_slot2,
          l_slot3: currentSet.l_slot3,
          wep_slot1: currentSet.wep_slot1,
          wep_slot2: currentSet.wep_slot2,
          wep_slot3: currentSet.wep_slot3,
          defense: currentSet.defense,
          fire: currentSet.fire,
          water: currentSet.water,
          thunder: currentSet.thunder,
          ice: currentSet.ice,
          dragon: currentSet.dragon,
          skills: currentSet.skills,
          setBonus: currentSet.setBonus,
          loading: false,
        });
      });
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'Clear') { // this is the same id field from the static navigatorButtons definition
        this.setState({
          clearModal: true,
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

  cancelClear() {
    this.setState({
      clearModal: false,
    });
  }

  confirmClear() {
    this.setState({
      clearModal: false,
      equipment: {
        weapon: null,
        helm: null,
        chest: null,
        arms: null,
        waist: null,
        legs: null,
        charm: null,
        kinsect: null,
      },
      h_slot1: null,
      h_slot2: null,
      h_slot3: null,
      c_slot1: null,
      c_slot2: null,
      c_slot3: null,
      a_slot1: null,
      a_slot2: null,
      a_slot3: null,
      w_slot1: null,
      w_slot2: null,
      w_slot3: null,
      l_slot1: null,
      l_slot2: null,
      l_slot3: null,
      wep_slot1: null,
      wep_slot2: null,
      wep_slot3: null,
      defense: 0,
      fire: 0,
      water: 0,
      thunder: 0,
      ice: 0,
      dragon: 0,
      skills: {},
      setBonus: {},
    });
  }

  renderClearModal() {
    return (
      <Modal
        animationType="fade"
        // useNativeDriver
        backdropColor={colors.main}
        backdropOpacity={0.7}
        avoidKeyboard
        isVisible={this.state.clearModal}
        onRequestClose={() => {
          this.setState({ clearModal: false });
        }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderColor: colors.accent }}>
              <Text style={{ fontSize: 18, color: colors.main }}>{`Clear all equipments?`}</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', borderWidth: 0, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.secondary, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.cancelClear();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Cancel`}</Text>
              </Button>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.accent, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.confirmClear();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Confirm`}</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderHelmDecoration(slotNum) {
    if (this.state.equipment.helm === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.helm.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.helm.slot1,
                onPassProp: data =>
                  this.setState({
                    h_slot1: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.h_slot1, this.state.equipment.helm.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.helm.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.helm.slot2,
                onPassProp: data =>
                  this.setState({
                    h_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.h_slot2, this.state.equipment.helm.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.helm.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.helm.slot3,
                onPassProp: data =>
                  this.setState({
                    h_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.h_slot3, this.state.equipment.helm.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderHelm() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Helm',
            passProps: {
              type: 'armor',
              type2: 'Head',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: data,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  h_slot1: null,
                  h_slot2: null,
                  h_slot3: null,
                }),
              },
            })}>
            {this.renderEquipment(this.state.equipment.helm, 'Helm')}
            {/* <Text>{this.state.equipment.helm.name}</Text> */}
        </ListItem>
        {this.renderHelmDecoration(1)}
        {this.renderHelmDecoration(2)}
        {this.renderHelmDecoration(3)}
      </View>
    );
  }

  renderChestDecoration(slotNum) {
    if (this.state.equipment.chest === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.chest.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.chest.slot1,
                onPassProp: data =>
                  this.setState({
                    c_slot1: data,
                  }),
                },
              })}>
            {this.renderDecoration(this.state.c_slot1, this.state.equipment.chest.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.chest.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.chest.slot2,
                onPassProp: data =>
                  this.setState({
                    c_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.c_slot2, this.state.equipment.chest.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.chest.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.chest.slot3,
                onPassProp: data =>
                  this.setState({
                    c_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.c_slot3, this.state.equipment.chest.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderChest() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Chest',
            passProps: {
              type: 'armor',
              type2: 'Chest',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: data,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  c_slot1: null,
                  c_slot2: null,
                  c_slot3: null,
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.chest, 'Chest')}
        </ListItem>
        {this.renderChestDecoration(1)}
        {this.renderChestDecoration(2)}
        {this.renderChestDecoration(3)}
      </View>
    );
  }

  renderArmsDecoration(slotNum) {
    if (this.state.equipment.arms === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.arms.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.arms.slot1,
                onPassProp: data =>
                  this.setState({
                    a_slot1: data,
                  }),
                },
              })}>
            {this.renderDecoration(this.state.a_slot1, this.state.equipment.arms.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.arms.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.arms.slot2,
                onPassProp: data =>
                  this.setState({
                    a_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.a_slot2, this.state.equipment.arms.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.arms.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.arms.slot3,
                onPassProp: data =>
                  this.setState({
                    a_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.a_slot3, this.state.equipment.arms.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderArms() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Arms',
            passProps: {
              type: 'armor',
              type2: 'Arm',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: data,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  a_slot1: null,
                  a_slot2: null,
                  a_slot3: null,
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.arms, 'Arms')}
        </ListItem>
        {this.renderArmsDecoration(1)}
        {this.renderArmsDecoration(2)}
        {this.renderArmsDecoration(3)}
      </View>
    );
  }

  renderWaistDecoration(slotNum) {
    if (this.state.equipment.waist === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.waist.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.waist.slot1,
                onPassProp: data =>
                  this.setState({
                    w_slot1: data,
                  }),
                },
              })}>
            {this.renderDecoration(this.state.w_slot1, this.state.equipment.waist.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.waist.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.waist.slot2,
                onPassProp: data =>
                  this.setState({
                    w_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.w_slot2, this.state.equipment.waist.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.waist.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.waist.slot3,
                onPassProp: data =>
                  this.setState({
                    w_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.w_slot3, this.state.equipment.waist.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderWaist() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Waist',
            passProps: {
              type: 'armor',
              type2: 'Waist',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: data,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  w_slot1: null,
                  w_slot2: null,
                  w_slot3: null,
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.waist, 'Waist')}
        </ListItem>
        {this.renderWaistDecoration(1)}
        {this.renderWaistDecoration(2)}
        {this.renderWaistDecoration(3)}
      </View>
    );
  }

  renderLegsDecoration(slotNum) {
    if (this.state.equipment.legs === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.legs.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.legs.slot1,
                onPassProp: data =>
                  this.setState({
                    l_slot1: data,
                  }),
                },
              })}>
            {this.renderDecoration(this.state.l_slot1, this.state.equipment.legs.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.legs.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.legs.slot2,
                onPassProp: data =>
                  this.setState({
                    l_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.l_slot2, this.state.equipment.legs.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.legs.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.legs.slot3,
                onPassProp: data =>
                  this.setState({
                    l_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.l_slot3, this.state.equipment.legs.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderLegs() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Legs',
            passProps: {
              type: 'armor',
              type2: 'Legs',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: data,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  l_slot1: null,
                  l_slot2: null,
                  l_slot3: null,
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.legs, 'Legs')}
        </ListItem>
        {this.renderLegsDecoration(1)}
        {this.renderLegsDecoration(2)}
        {this.renderLegsDecoration(3)}
      </View>
    );
  }

  renderWeaponDecoration(slotNum) {
    if (this.state.equipment.weapon === null) return null;
    if (slotNum === 1) {
      if (this.state.equipment.weapon.slot1 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.weapon.slot1,
                onPassProp: data =>
                  this.setState({
                    wep_slot1: data,
                  }),
                },
              })}>
            {this.renderDecoration(this.state.wep_slot1, this.state.equipment.weapon.slot1)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 2) {
      if (this.state.equipment.weapon.slot2 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.weapon.slot2,
                onPassProp: data =>
                  this.setState({
                    wep_slot2: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.wep_slot2, this.state.equipment.weapon.slot2)}
          </ListItem>
        );
      }
      return null;
    } else if (slotNum === 3) {
      if (this.state.equipment.weapon.slot3 > 0) {
        return (
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
            onPress={() => this.props.navigator.showModal({
              screen: 'SetBuilderSelect',
              title: 'Select Decoration',
              passProps: {
                type: 'decoration',
                level: this.state.equipment.weapon.slot3,
                onPassProp: data =>
                  this.setState({
                    wep_slot3: data,
                  }),
                },
              })}>
              {this.renderDecoration(this.state.wep_slot3, this.state.equipment.weapon.slot3)}
          </ListItem>
        );
      }
      return null;
    }
    return null;
  }

  renderKinsectItem(item) {
    if (this.state.equipment.kinsect !== null) {
      return (
        <KinsectListItem setSelected={true} item={item} navigator={this.props.navigator} />
      );
    }
    return (
      <Text>{`Kinsect`}</Text>
    );
  }

  renderKinsect() {
    if (this.state.equipment.weapon === null) return null;
    if (this.state.equipment.weapon.type === 'insect_glaive') {
      return (
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 36, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Kinsect',
            passProps: {
              type: 'kinsect',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: data,
                  },
                }),
              },
            })}>
            {this.renderKinsectItem(this.state.equipment.kinsect)}
        </ListItem>
      );
    }
    return null;
  }

  renderWeapon() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Weapon',
            passProps: {
              type: 'weapon',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: data,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: this.state.equipment.charm,
                    kinsect: this.state.equipment.kinsect,
                  },
                  wep_slot1: null,
                  wep_slot2: null,
                  wep_slot3: null,
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.weapon, 'Weapon')}
        </ListItem>
        {this.renderKinsect()}
        {this.renderWeaponDecoration(1)}
        {this.renderWeaponDecoration(2)}
        {this.renderWeaponDecoration(3)}
      </View>
    );
  }

  renderCharm() {
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          style={{ marginLeft: 0, marginRight: 0, paddingRight: 18, paddingLeft: 18 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'SetBuilderSelect',
            title: 'Select Charm',
            passProps: {
              type: 'charm',
              onPassProp: data =>
                this.setState({
                  equipment: {
                    weapon: this.state.equipment.weapon,
                    helm: this.state.equipment.helm,
                    chest: this.state.equipment.chest,
                    arms: this.state.equipment.arms,
                    waist: this.state.equipment.waist,
                    legs: this.state.equipment.legs,
                    charm: data,
                    kinsect: this.state.equipment.kinsect,
                  },
                }),
              },
            })}>
          {this.renderEquipment(this.state.equipment.charm, 'Charm')}
        </ListItem>
      </View>
    );
  }

  renderDecoration(item, level) {
    if (item !== null) {
      return (
        <View style={{ flex: 1 }}>
          <DecorationListItem setSelected={true} navigator={this.props.navigator} item={item} />
        </View>
      );
    }
    return (
      <Text>{`Decoration Slot Level ${level}`}</Text>
    );
  }

  renderEquipment(item, defaultName) {
    if (item !== null) {
      if (defaultName === 'Weapon') {
        return (
          <View style={{ flex: 1 }}>
            <WeaponListItem setSelected={true} navigator={this.props.navigator} item={item} />
          </View>
        );
      } else if (defaultName === 'Charm') {
        return (
          <View style={{ flex: 1 }}>
            <CharmListItem setSelected={true} navigator={this.props.navigator} item={item} />
          </View>
        );
      }
      return (
        // <Text>{item.name}</Text>
        <View style={{ flex: 1 }}>
          <ArmorListItem setSelected={true} navigator={this.props.navigator} item={item} />
        </View>
      );
    }
    return (
      <Text>{defaultName}</Text>
    );
  }

  renderDefense() {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Defense']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Fire']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Water']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Thunder']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Ice']}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ flex: 1, height: 20, width: 20, alignSelf: 'center' }}
              source={ElementStatusImages['Dragon']}
            />
          </View>
        </ListItem>
        <ListItem style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.defense}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.fire}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.water}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.thunder}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.ice}</Text>
          <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, textAlign: 'center' }}>{this.state.dragon}</Text>
        </ListItem>
      </View>
    );
  }

  calculateDefense() {
    let defense = 0;
    let fire = 0;
    let water = 0;
    let thunder = 0;
    let ice = 0;
    let dragon = 0;
    let {
      weapon, helm, chest, arms, waist, legs,
    } = this.state.equipment;
    if (weapon !== null) {
      defense += weapon.defense;
    }
    if (helm !== null) {
      defense += helm.min_def;
      fire += helm.fire;
      water += helm.water;
      thunder += helm.thunder;
      ice += helm.ice;
      dragon += helm.dragon;
    }
    if (chest !== null) {
      defense += chest.min_def;
      fire += chest.fire;
      water += chest.water;
      thunder += chest.thunder;
      ice += chest.ice;
      dragon += chest.dragon;
    }
    if (arms !== null) {
      defense += arms.min_def;
      fire += arms.fire;
      water += arms.water;
      thunder += arms.thunder;
      ice += arms.ice;
      dragon += arms.dragon;
    }
    if (waist !== null) {
      defense += waist.min_def;
      fire += waist.fire;
      water += waist.water;
      thunder += waist.thunder;
      ice += waist.ice;
      dragon += waist.dragon;
    }
    if (legs !== null) {
      defense += legs.min_def;
      fire += legs.fire;
      water += legs.water;
      thunder += legs.thunder;
      ice += legs.ice;
      dragon += legs.dragon;
    }
    this.setState({
      defense, fire, water, thunder, ice, dragon,
    });
  }

  calculateSkills() {
    let skills = {};
    let setBonus = {};
    let {
      wep_slot1, wep_slot2, wep_slot3,
      h_slot1, h_slot2, h_slot3,
      c_slot1, c_slot2, c_slot3,
      a_slot1, a_slot2, a_slot3,
      w_slot1, w_slot2, w_slot3,
      l_slot1, l_slot2, l_slot3,
    } = this.state;
    let {
      helm, chest, arms, waist, legs, charm
    } = this.state.equipment;

    if (charm !== null) {
      if (charm.skill1_id !== null) {
        if (typeof (skills[charm.skill1_id]) === 'undefined') skills[charm.skill1_id] = { skill_id: charm.skill1_id, name: charm.skill1_name, level: 0 }
        skills[charm.skill1_id].level += charm.skill1_level;
        if (charm.skill2_id !== null) {
          if (typeof (skills[charm.skill2_id]) === 'undefined') skills[charm.skill2_id] = { skill_id: charm.skill2_id, name: charm.skill2_name, level: 0 }
          skills[charm.skill2_id].level += charm.skill2_level;
        }
      }
    }

    if (helm !== null) {
      if (helm.skill1_id !== null) {
        if (typeof (skills[helm.skill1_id]) === 'undefined') skills[helm.skill1_id] = { skill_id: helm.skill1_id, name: helm.skill1, level: 0 }
        skills[helm.skill1_id].level += helm.skill1_level;
        if (helm.skill2_id !== null) {
          if (typeof (skills[helm.skill2_id]) === 'undefined') skills[helm.skill2_id] = { skill_id: helm.skill2_id, name: helm.skill2, level: 0 }
          skills[helm.skill2_id].level += helm.skill2_level;
        }
        if (helm.set_bonus_name !== null) {
          if (typeof (setBonus[helm.set_bonus_name]) === 'undefined') {
            setBonus[helm.set_bonus_name] = {
              set_bonus_skill1_id: helm.set_bonus_skill1_id,
              set_bonus_skill2_id: helm.set_bonus_skill2_id,
              set_bonus_skill1: helm.set_bonus_skill1,
              set_bonus_skill2: helm.set_bonus_skill2,
              name: helm.set_bonus_name,
              pieces: 0,
              set_pieces: helm.pieces,
              set_pieces2: helm.pieces_2,
            };
          }
          setBonus[helm.set_bonus_name].pieces += 1;
        }
      }
    }

    if (chest !== null) {
      if (chest.skill1_id !== null) {
        if (typeof (skills[chest.skill1_id]) === 'undefined') skills[chest.skill1_id] = { skill_id: chest.skill1_id, name: chest.skill1, level: 0 }
        skills[chest.skill1_id].level += chest.skill1_level;
        if (chest.skill2_id !== null) {
          if (typeof (skills[chest.skill2_id]) === 'undefined') skills[chest.skill2_id] = { skill_id: chest.skill2_id, name: chest.skill2, level: 0 }
          skills[chest.skill2_id].level += chest.skill2_level;
        }
        if (chest.set_bonus_name !== null) {
          if (typeof (setBonus[chest.set_bonus_name]) === 'undefined') {
            setBonus[chest.set_bonus_name] = {
              set_bonus_skill1_id: chest.set_bonus_skill1_id,
              set_bonus_skill2_id: chest.set_bonus_skill2_id,
              set_bonus_skill1: chest.set_bonus_skill1,
              set_bonus_skill2: chest.set_bonus_skill2,
              name: chest.set_bonus_name,
              pieces: 0,
              set_pieces: chest.pieces,
              set_pieces2: chest.pieces_2,
            };
          }
          setBonus[chest.set_bonus_name].pieces += 1;
        }
      }
    }

    if (arms !== null) {
      if (arms.skill1_id !== null) {
        if (typeof (skills[arms.skill1_id]) === 'undefined') skills[arms.skill1_id] = { skill_id: arms.skill1_id, name: arms.skill1, level: 0 }
        skills[arms.skill1_id].level += arms.skill1_level;
        if (arms.skill2_id !== null) {
          if (typeof (skills[arms.skill2_id]) === 'undefined') skills[arms.skill2_id] = { skill_id: arms.skill2_id, name: arms.skill2, level: 0 }
          skills[arms.skill2_id].level += arms.skill2_level;
        }
      }
      if (arms.set_bonus_name !== null) {
        if (typeof (setBonus[arms.set_bonus_name]) === 'undefined') {
          setBonus[arms.set_bonus_name] = {
            set_bonus_skill1_id: arms.set_bonus_skill1_id,
            set_bonus_skill2_id: arms.set_bonus_skill2_id,
            set_bonus_skill1: arms.set_bonus_skill1,
            set_bonus_skill2: arms.set_bonus_skill2,
            name: arms.set_bonus_name,
            pieces: 0,
            set_pieces: arms.pieces,
            set_pieces2: arms.pieces_2,
          };
        }
        setBonus[arms.set_bonus_name].pieces += 1;
      }
    }

    if (waist !== null) {
      if (waist.skill1_id !== null) {
        if (typeof (skills[waist.skill1_id]) === 'undefined') skills[waist.skill1_id] = { skill_id: waist.skill1_id, name: waist.skill1, level: 0 }
        skills[waist.skill1_id].level += waist.skill1_level;
        if (waist.skill2_id !== null) {
          if (typeof (skills[waist.skill2_id]) === 'undefined') skills[waist.skill2_id] = { skill_id: waist.skill2_id, name: waist.skill2, level: 0 }
          skills[waist.skill2_id].level += waist.skill2_level;
        }
        if (waist.set_bonus_name !== null) {
          if (typeof (setBonus[waist.set_bonus_name]) === 'undefined') {
            setBonus[waist.set_bonus_name] = {
              set_bonus_skill1_id: waist.set_bonus_skill1_id,
              set_bonus_skill2_id: waist.set_bonus_skill2_id,
              set_bonus_skill1: waist.set_bonus_skill1,
              set_bonus_skill2: waist.set_bonus_skill2,
              name: waist.set_bonus_name,
              pieces: 0,
              set_pieces: waist.pieces,
              set_pieces2: waist.pieces_2,
            };
          }
          setBonus[waist.set_bonus_name].pieces += 1;
        }
      }
    }

    if (legs !== null) {
      if (legs.skill1_id !== null) {
        if (typeof (skills[legs.skill1_id]) === 'undefined') skills[legs.skill1_id] = { skill_id: legs.skill1_id, name: legs.skill1, level: 0 }
        skills[legs.skill1_id].level += legs.skill1_level;
        if (legs.skill2_id !== null) {
          if (typeof (skills[legs.skill2_id]) === 'undefined') skills[legs.skill2_id] = { skill_id: legs.skill2_id, name: legs.skill2, level: 0 }
          skills[legs.skill2_id].level += legs.skill2_level;
        }
        if (legs.set_bonus_name !== null) {
          if (typeof (setBonus[legs.set_bonus_name]) === 'undefined') {
            setBonus[legs.set_bonus_name] = {
              set_bonus_skill1_id: legs.set_bonus_skill1_id,
              set_bonus_skill2_id: legs.set_bonus_skill2_id,
              set_bonus_skill1: legs.set_bonus_skill1,
              set_bonus_skill2: legs.set_bonus_skill2,
              name: legs.set_bonus_name,
              pieces: 0,
              set_pieces: legs.pieces,
              set_pieces2: legs.pieces_2,
            };
          }
          setBonus[legs.set_bonus_name].pieces += 1;
        }
      }
    }

    if (wep_slot1 !== null) {
      if (typeof (skills[wep_slot1.skill_id]) === 'undefined') skills[wep_slot1.skill_id] = { skill_id: wep_slot1.skill_id, name: wep_slot1.skill_name, level: 0 };
      skills[wep_slot1.skill_id].level += wep_slot1.skill_level;
      if (wep_slot2 !== null) {
        if (typeof (skills[wep_slot2.skill_id]) === 'undefined') skills[wep_slot2.skill_id] = { skill_id: wep_slot2.skill_id, name: wep_slot2.skill_name, level: 0 };
        skills[wep_slot2.skill_id].level += wep_slot2.skill_level;
        if (wep_slot3 !== null) {
          if (typeof (skills[wep_slot3.skill_id]) === 'undefined') skills[wep_slot3.skill_id] = { skill_id: wep_slot3.skill_id, name: wep_slot3.skill_name, level: 0 };
          skills[wep_slot3.skill_id].level += wep_slot3.skill_level;
        }
      }
    }

    if (h_slot1 !== null) {
      if (typeof (skills[h_slot1.skill_id]) === 'undefined') skills[h_slot1.skill_id] = { skill_id: h_slot1.skill_id, name: h_slot1.skill_name, level: 0 };
      skills[h_slot1.skill_id].level += h_slot1.skill_level;
      if (h_slot2 !== null) {
        if (typeof (skills[h_slot2.skill_id]) === 'undefined') skills[h_slot2.skill_id] = { skill_id: h_slot2.skill_id, name: h_slot2.skill_name, level: 0 };
        skills[h_slot2.skill_id].level += h_slot2.skill_level;
        if (h_slot3 !== null) {
          if (typeof (skills[h_slot3.skill_id]) === 'undefined') skills[h_slot3.skill_id] = { skill_id: h_slot3.skill_id, name: h_slot3.skill_name, level: 0 };
          skills[h_slot3.skill_id].level += h_slot3.skill_level;
        }
      }
    }

    if (c_slot1 !== null) {
      if (typeof (skills[c_slot1.skill_id]) === 'undefined') skills[c_slot1.skill_id] = { skill_id: c_slot1.skill_id, name: c_slot1.skill_name, level: 0 };
      skills[c_slot1.skill_id].level += c_slot1.skill_level;
      if (c_slot2 !== null) {
        if (typeof (skills[c_slot2.skill_id]) === 'undefined') skills[c_slot2.skill_id] = { skill_id: c_slot2.skill_id, name: c_slot2.skill_name, level: 0 };
        skills[c_slot2.skill_id].level += c_slot2.skill_level;
        if (c_slot3 !== null) {
          if (typeof (skills[c_slot3.skill_id]) === 'undefined') skills[c_slot3.skill_id] = { skill_id: c_slot3.skill_id, name: c_slot3.skill_name, level: 0 };
          skills[c_slot3.skill_id].level += c_slot3.skill_level;
        }
      }
    }

    if (a_slot1 !== null) {
      if (typeof (skills[a_slot1.skill_id]) === 'undefined') skills[a_slot1.skill_id] = { skill_id: a_slot1.skill_id, name: a_slot1.skill_name, level: 0 };
      skills[a_slot1.skill_id].level += a_slot1.skill_level;
      if (a_slot2 !== null) {
        if (typeof (skills[a_slot2.skill_id]) === 'undefined') skills[a_slot2.skill_id] = { skill_id: a_slot2.skill_id, name: a_slot2.skill_name, level: 0 };
        skills[a_slot2.skill_id].level += a_slot2.skill_level;
        if (a_slot3 !== null) {
          if (typeof (skills[a_slot3.skill_id]) === 'undefined') skills[a_slot3.skill_id] = { skill_id: a_slot3.skill_id, name: a_slot3.skill_name, level: 0 };
          skills[a_slot3.skill_id].level += a_slot3.skill_level;
        }
      }
    }

    if (w_slot1 !== null) {
      if (typeof (skills[w_slot1.skill_id]) === 'undefined') skills[w_slot1.skill_id] = { skill_id: w_slot1.skill_id, name: w_slot1.skill_name, level: 0 };
      skills[w_slot1.skill_id].level += w_slot1.skill_level;
      if (w_slot2 !== null) {
        if (typeof (skills[w_slot2.skill_id]) === 'undefined') skills[w_slot2.skill_id] = { skill_id: w_slot2.skill_id, name: w_slot2.skill_name, level: 0 };
        skills[w_slot2.skill_id].level += w_slot2.skill_level;
        if (w_slot3 !== null) {
          if (typeof (skills[w_slot3.skill_id]) === 'undefined') skills[w_slot3.skill_id] = { skill_id: w_slot3.skill_id, name: w_slot3.skill_name, level: 0 };
          skills[w_slot3.skill_id].level += w_slot3.skill_level;
        }
      }
    }

    if (l_slot1 !== null) {
      if (typeof (skills[l_slot1.skill_id]) === 'undefined') skills[l_slot1.skill_id] = { skill_id: l_slot1.skill_id, name: l_slot1.skill_name, level: 0 };
      skills[l_slot1.skill_id].level += l_slot1.skill_level;
      if (l_slot2 !== null) {
        if (typeof (skills[l_slot2.skill_id]) === 'undefined') skills[l_slot2.skill_id] = { skill_id: l_slot2.skill_id, name: l_slot2.skill_name, level: 0 };
        skills[l_slot2.skill_id].level += l_slot2.skill_level;
        if (l_slot3 !== null) {
          if (typeof (skills[l_slot3.skill_id]) === 'undefined') skills[l_slot3.skill_id] = { skill_id: l_slot3.skill_id, name: l_slot3.skill_name, level: 0 };
          skills[l_slot3.skill_id].level += l_slot3.skill_level;
        }
      }
    }
    this.setState({ skills, setBonus });
  }

  calculateStats() {
    this.calculateSkills();
    this.calculateDefense();
  }

  renderSkills() {
    const { skills } = this.state;
    // Object.keys(skills).forEach((key) => {
    //   return (
    //     <Text>hi</Text>
    //   );
    // });
    const array = Object.keys(skills);
    return (
      <View>
        <ListItem
          style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
          <Left>
            <Text style={{ fontSize: 15.5 }}>Skills</Text>
          </Left>
        </ListItem>
        {array.map((key) => {
          return (
            <ListItem
              key={key}
              style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
              onPress={() => this.props.navigator.push({
              screen: 'TabInfoScreen',
              passProps: {
                armor_skill_id: skills[key].skill_id,
                type: 'skill',
              },
              animationType: 'slide-horizontal',
              title: skills[key].name,
            })}>
            <Left>
              <Text style={{ fontSize: 15.5 }}>{skills[key].name}</Text>
            </Left>
            <Right>
              <Text style={{ fontSize: 15.5 }}>{`+${skills[key].level}`}</Text>
            </Right>
            </ListItem>
          );
        })}
      </View>
    );
  }

  renderSetBonus() {
    const { setBonus } = this.state;
    // Object.keys(skills).forEach((key) => {
    //   return (
    //     <Text>hi</Text>
    //   );
    // });
    const array = Object.keys(setBonus);
    if (array.length > 0) {
      return (
        <View>
          <ListItem
            style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }} itemDivider>
            <Left>
              <Text style={{ fontSize: 15.5 }}>Set Bonus</Text>
            </Left>
          </ListItem>
          {array.map((key) => {
            let setBonus2 = null;
            if (setBonus[key].set_bonus_skill2 !== null) {
              setBonus2 =
                <ListItem
                  style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
                  onPress={() => this.props.navigator.push({
                  screen: 'TabInfoScreen',
                  passProps: {
                    armor_skill_id: setBonus[key].set_bonus_skill2_id,
                    type: 'skill',
                  },
                  animationType: 'slide-horizontal',
                  title: setBonus[key].set_bonus_skill2,
                })}
                >
                <Left>
                  <Text style={{ fontSize: 15.5 }}>{setBonus[key].set_bonus_skill2}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 11 }}>{`(${setBonus[key].set_pieces2}) Set`}</Text>
                </Right>
              </ListItem>;
            }
            return (
              <View key={key}>
                <ListItem
                  style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18, backgroundColor: '#F8F8F8' }}
                //   onPress={() => this.props.navigator.push({
                //   screen: 'TabInfoScreen',
                //   passProps: {
                //     armor_skill_id: setBonus[key].skill_id,
                //     type: 'skill',
                //   },
                //   animationType: 'slide-horizontal',
                //   title: setBonus[key].name,
                // })}
                >
                <Left>
                  <Text style={{ fontSize: 15.5 }}>{setBonus[key].name}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 11 }}>{`${setBonus[key].pieces} Equipped`}</Text>
                </Right>
                </ListItem>
                <ListItem
                  style={{ marginLeft: 0, paddingLeft: 18, marginRight: 0, paddingRight: 18 }}
                  onPress={() => this.props.navigator.push({
                  screen: 'TabInfoScreen',
                  passProps: {
                    armor_skill_id: setBonus[key].set_bonus_skill1_id,
                    type: 'skill',
                  },
                  animationType: 'slide-horizontal',
                  title: setBonus[key].set_bonus_skill1,
                })}
                >
                <Left>
                  <Text style={{ fontSize: 15.5 }}>{setBonus[key].set_bonus_skill1}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 11 }}>{`(${setBonus[key].set_pieces}) Set`}</Text>
                </Right>
                </ListItem>
                {setBonus2}
              </View>
            );
          })}
        </View>
      );
    }
    return null;
  }

  renderStats() {
    return (
      <View>
        {this.renderDefense()}
        {this.renderSkills()}
        {this.renderSetBonus()}
      </View>
    );
  }

  async saveSet() {
    // this.calculateStats();
    let { sets } = this.state;
    if (sets.length > 0) {
      sets[this.props.index] = {
        setName: this.state.setName,
        equipment: this.state.equipment,
        h_slot1: this.state.h_slot1,
        h_slot2: this.state.h_slot2,
        h_slot3: this.state.h_slot3,
        c_slot1: this.state.c_slot1,
        c_slot2: this.state.c_slot2,
        c_slot3: this.state.c_slot3,
        a_slot1: this.state.a_slot1,
        a_slot2: this.state.a_slot2,
        a_slot3: this.state.a_slot3,
        w_slot1: this.state.w_slot1,
        w_slot2: this.state.w_slot2,
        w_slot3: this.state.w_slot3,
        l_slot1: this.state.l_slot1,
        l_slot2: this.state.l_slot2,
        l_slot3: this.state.l_slot3,
        wep_slot1: this.state.wep_slot1,
        wep_slot2: this.state.wep_slot2,
        wep_slot3: this.state.wep_slot3,
        defense: this.state.defense,
        fire: this.state.fire,
        water: this.state.water,
        thunder: this.state.thunder,
        ice: this.state.ice,
        dragon: this.state.dragon,
        skills: this.state.skills,
        setBonus: this.state.setBonus,
      };
      AsyncStorage.setItem('@sets', JSON.stringify(sets));
    }
  }

  render() {
    this.saveSet();
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    }
    return (
      <Container>
        {this.renderClearModal()}
        <Tabs
          prerenderingSiblingsNumber={3}
          scrollWithoutAnimation={false}
          tabBarUnderlineStyle={{ backgroundColor: colors.accent, height: 3 }}
          initialPage={0}
          onChangeTab={(ref) => { if (ref.i === 1) this.calculateStats(); }}
          >
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Equipment"
            >
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              {this.renderWeapon()}
              {this.renderCharm()}
              {this.renderHelm()}
              {this.renderChest()}
              {this.renderArms()}
              {this.renderWaist()}
              {this.renderLegs()}
            </ScrollView>
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'white' }}
            tabStyle={{ backgroundColor: 'white' }}
            activeTextStyle={{ color: colors.main }}
            textStyle={{ color: colors.secondary }}
            heading="Stats"
            >
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              {this.renderStats()}
            </ScrollView>
          </Tab>
        </Tabs>
        <AdBanner />
      </Container>
    );
  }
}
