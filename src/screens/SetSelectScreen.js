import React, { PureComponent } from 'react';
import { Platform, FlatList, ActivityIndicator, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { ListItem, Text, Left, Right, Body, Button, Icon, View, SwipeRow, Container } from 'native-base';
import Modal from 'react-native-modal';
import AdBanner from '../components/AdBanner';
import { MiscImages } from '../assets/';


// Styles
import colors from '../styles/colors';

export default class SetSelectScreen extends PureComponent {
  static navigatorStyle = {
    topBarElevationShadowEnabled: Platform.OS !== 'ios',
    topBarBorderColor: colors.accent,
    topBarBorderWidth: 17,
  };

  static navigatorButtons = {
    rightButtons: [
      // {
      //   title: 'Sort', // for a textual button, provide the button title (label)
      //   id: 'Sort', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      //   disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
      //   disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
      //   showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
      //   buttonColor: colors.accent, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
      //   buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
      //   buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      // },
      {
        // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
        icon: Platform.OS === 'ios' ? MiscImages['plus'] : MiscImages['plus'],
        id: 'options', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sets: [],
      modalVisible: false,
      editModalVisible: false,
      deleteModalVisible: false,
      setName: '',
      index: 0,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    try {
      // Get value to see if the data has been created yet.
      let value = await AsyncStorage.getItem('@sets').then(data => JSON.parse(data));
      if (value === null) {
        try {
          // If data is null create new set array.
          AsyncStorage.setItem('@sets', JSON.stringify([]))
            .then(() => {
              AsyncStorage.getItem('@sets').then(data => JSON.parse(data))
                .then((jsonData) => {
                  console.log(jsonData);
                  this.setState({ sets: jsonData, loading: false })
                  // AsyncStorage.removeItem('@sets');
                });
            });
        } catch (error) {

        }
      } else {
        // If set data exist; place into state.
        this.setState({ sets: value, loading: false });
        console.log(this.state);
      }
    } catch (error) {

    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id === 'options') { // this is the same id field from the static navigatorButtons definition
        this.setState({ modalVisible: true });
      }
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'slide-horizontal',
      });
    }
  }

  renderListItems(data) {
    let { item, index } = data;
    return (
      <SwipeRow
        style={{ height: 50, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button onPress={() => this.toggleEditModal(item, index)}>
            <Icon active name="create" />
          </Button>
        }
        body={
          <TouchableOpacity
            style={{ flex: 1, borderWidth: 0, paddingLeft: 18, paddingRight: 18 }}
            onPress={() => this.props.navigator.push({
              screen: 'SetBuilderScreen',
              passProps: {
                index,
              },
              animationType: 'slide-horizontal',
              title: item.setName,
            })}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 15.5 }}>{item.setName}</Text>
            </View>
          </TouchableOpacity>
        }
        right={
          <Button danger onPress={() => this.toggleDeleteModal(item, index)}>
            <Icon active name="trash" />
          </Button>
        }
      />
    );
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <ActivityIndicator size="large" color={colors.main}/>
        </View>
      );
    } else if (this.state.sets.length === 0 ) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: 'white' }}>
          <Text style={{ fontSize: 15.5, color: colors.main, textAlign: 'center' }}>No Sets Created Yet</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          initialNumToRender={8}
          data={this.state.sets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderListItems.bind(this)}
        />
      </View>
    );
  }

  toggleEditModal(item, index) {
    this.setState({ index, setName: item.setName, editModalVisible: true });
  }

  toggleDeleteModal(item, index) {
    this.setState({ index, setName: item.setName, deleteModalVisible: true });
  }

  setModalVisible(bool) {
    this.setState({ modalVisible: bool });
  }

  setEditModalVisible(bool) {
    this.setState({ editModalVisible: bool });
  }

  setDeleteModalVisible(bool) {
    this.setState({ deleteModalVisible: bool });
  }

  async confirmDelete() {
    AsyncStorage.getItem('@sets')
      .then(data => JSON.parse(data))
      .then((jsonData) => {
        let sets = jsonData;
        sets.splice(this.state.index, 1);
        AsyncStorage.setItem('@sets', JSON.stringify(sets)).then(() => {
          this.setState({
            sets,
            deleteModalVisible: false,
            editModalVisible: false,
            modalVisible: false,
            setName: '',
            index: 0,
          });
        });
      });
  }

  async confirmEdit() {
    AsyncStorage.getItem('@sets')
      .then(data => JSON.parse(data))
      .then((jsonData) => {
        let sets = jsonData;
        sets[this.state.index].setName = this.state.setName;
        AsyncStorage.setItem('@sets', JSON.stringify(sets)).then(() => {
          this.setState({
            sets,
            deleteModalVisible: false,
            editModalVisible: false,
            modalVisible: false,
            setName: '',
            index: 0,
          });
        });
      });
  }

  async createSet() {
    if (this.state.setName.length < 1) return;
    AsyncStorage.getItem('@sets')
      .then(data => JSON.parse(data))
      .then((jsonData) => {
        let sets = jsonData;
        sets.push({
          setName: this.state.setName,
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
        AsyncStorage.setItem('@sets', JSON.stringify(sets)).then(() => {
          this.setState({
            sets,
            deleteModalVisible: false,
            editModalVisible: false,
            modalVisible: false,
            setName: '',
            index: 0,
          });
        });
      });
  }

  cancelSet() {
    this.setState({
      setName: '',
      modalVisible: false,
    });
  }

  cancelEdit() {
    this.setState({
      setName: '',
      editModalVisible: false,
    });
  }

  cancelDelete() {
    this.setState({
      setName: '',
      deleteModalVisible: false,
    });
  }


  renderDeleteModal() {
    return (
      <Modal
        animationType="fade"
        // useNativeDriver
        backdropColor={colors.main}
        backdropOpacity={0.7}
        avoidKeyboard
        isVisible={this.state.deleteModalVisible}
        onRequestClose={() => {
          this.setDeleteModalVisible(!this.state.deleteModalVisible);
        }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderColor: colors.accent }}>
              <Text style={{ fontSize: 18, color: colors.main }}>{`Delete ${this.state.setName}?`}</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', borderWidth: 0, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.secondary, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.cancelDelete();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Cancel`}</Text>
              </Button>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.accent, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.confirmDelete();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Confirm`}</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderCreateSetModal() {
    return (
      <Modal
        animationType="slide"
        // useNativeDriver
        backdropColor={colors.main}
        backdropOpacity={0.7}
        avoidKeyboard
        isVisible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.accent }}>
              <Text style={{ fontSize: 18, color: colors.main }}>Input Set Name</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', marginLeft: 15, marginRight: 15, borderWidth: 0, borderColor: 'blue' }}>
              <TextInput
                autoFocus={true}
                style={{ color: colors.main }}
                placeholder={'EX: Set #1'}
                placeholderTextColor={colors.secondary}
                onChangeText={(setName) => this.setState({setName})}
                value={this.state.setName}
              />
            </View>
            <View style={{ flex: 2, flexDirection: 'row', borderWidth: 0, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.secondary, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.cancelSet();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Cancel`}</Text>
              </Button>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.accent, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.createSet();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Confirm`}</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderRenameModal() {
    return (
      <Modal
        animationType="slide"
        useNativeDriver
        backdropColor={colors.main}
        backdropOpacity={0.7}
        avoidKeyboard
        isVisible={this.state.editModalVisible}
        onRequestClose={() => {
          this.setEditModalVisible(!this.state.editModalVisible);
        }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.accent }}>
              <Text style={{ fontSize: 18, color: colors.main }}>Edit Set Name</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', marginLeft: 15, marginRight: 15, borderWidth: 0, borderColor: 'blue' }}>
              <TextInput
                autoFocus={true}
                style={{ color: colors.main }}
                placeholder={'EX: Set #1'}
                placeholderTextColor={colors.secondary}
                onChangeText={(setName) => this.setState({setName})}
                value={this.state.setName}
              />
            </View>
            <View style={{ flex: 2, flexDirection: 'row', borderWidth: 0, borderColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.secondary, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.cancelEdit();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Cancel`}</Text>
              </Button>
              <Button
                block
                style={{ flex: 1, backgroundColor: colors.accent, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => {
                  this.confirmEdit();
                }}>
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Apply`}</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
        {this.renderCreateSetModal()}
        {this.renderRenameModal()}
        {this.renderDeleteModal()}
        {this.renderContent()}
        </View>
        <AdBanner />
      </Container>
    );
  }
}
