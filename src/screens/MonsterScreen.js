import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { Text, Container, Tab, Tabs, Icon, Button } from 'native-base';
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import MonsterList from '../components/MonsterList';
import AdBanner from '../components/AdBanner';
import { MiscImages } from '../assets/';
import { setDarkTheme, setLightTheme } from '../actions/settingsAction';

// Styles
import colors from '../styles/colors';

class MonsterScreen extends PureComponent {
  // static navigatorButtons = {
  //   rightButtons: [
  //     // {
  //     //   title: 'Sort', // for a textual button, provide the button title (label)
  //     //   id: 'Sort', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  //     //   disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
  //     //   disableIconTint: false, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
  //     //   showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
  //     //   buttonColor: colors.accent, // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
  //     //   buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
  //     //   buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
  //     // },
  //     {
  //       // icon: require('../assets/images/misc/ItemIcon007.png'), // for icon button, provide the local image asset name
  //       icon: Platform.OS === 'ios' ? MiscImages['ios-more'] : MiscImages['android-more'],
  //       id: 'options', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
  //     },
  //   ],
  // };

  constructor(props) {
    super(props);
    this.state = {
      allMonsters: [],
      smallMonsters: [],
      largeMonsters: [],
      loading: true,
      data: [],
      modalVisible: false,
    };
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  // onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
  //   if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
  //     if (event.id === 'options') { // this is the same id field from the static navigatorButtons definition
  //       this.setState({ modalVisible: true });
  //     }
  //   }
  // }

  okCallback(msg) {
    console.log(`okCallback: ${msg}`);
    setTimeout(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
      });
      db.transaction((tx) => {
        const allMonsters = [];
        const smallMonsters = [];
        const largeMonsters = [];
        tx.executeSql('SELECT * FROM monster ORDER BY monster_name', [], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
            // this.setState({record: row});
          }
          // this.setState({ allMonsters });
          // db.close();
        });
        tx.executeSql('SELECT * FROM monster WHERE size=? ORDER BY monster_name', ['Small'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            smallMonsters.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster WHERE size=? ORDER BY monster_name', ['Large'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            largeMonsters.push(row);
          }
          this.setState({
            data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false,
          });
          if (Platform.OS === 'ios') SplashScreen.hide();
        });
      });
    }, 150);
  }

  errorCallback(msg) {
    console.log(`okCallback: ${msg}`);
    setTimeout(() => {
      const db = SQLite.openDatabase({
        name: 'mhworld.db', createFromLocation: '~mhworld.db', location: 'Default',
      });
      db.transaction((tx) => {
        const allMonsters = [];
        const smallMonsters = [];
        const largeMonsters = [];
        tx.executeSql('SELECT * FROM monster ORDER BY monster_name', [], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            allMonsters.push(row);
            // this.setState({record: row});
          }
          // this.setState({ allMonsters });
          // db.close();
        });
        tx.executeSql('SELECT * FROM monster WHERE size=? ORDER BY monster_name', ['Small'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            smallMonsters.push(row);
          }
        });
        tx.executeSql('SELECT * FROM monster WHERE size=? ORDER BY monster_name', ['Large'], (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          const len = results.rows.length;
          for (let i = 0; i < len; i += 1) {
            const row = results.rows.item(i);
            largeMonsters.push(row);
          }
          this.setState({
            data: allMonsters, allMonsters, smallMonsters, largeMonsters, loading: false,
          });
          if (Platform.OS === 'ios') SplashScreen.hide();
        });
      });
    }, 150);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    // db.close();
  }

  okCallback2(msg) {
    console.log(msg);
  }
  errorCallback2(msg) {
    console.log(msg);
  }

  componentWillMount() {
    // this.props.navigator.setStyle({
      // statusBarColor: 'black',
      // statusBarTextColorScheme: 'light',
      // navBarTextColor: 'white',
      // navBarBackgroundColor: 'black',
      // tabBarButtonColor: 'light-grey',
      // tabBarBackgroundColor: 'black',
    // });
    if (Platform.OS === 'ios') {
      // DELETE FROM IOS
      SQLite.deleteDatabase(
        { name: 'mhworld.db', location: 'Default' },
        this.okCallback.bind(this), this.errorCallback.bind(this),
      );
    } else {
      // DELETE FROM ANDROID
      SQLite.deleteDatabase(
        { name: 'mhworld.db', location: '~mhworld.db' },
        this.okCallback.bind(this), this.errorCallback.bind(this),
      );
    }
  }

  renderContent(screen) {
    const { accent, background, border, divider, main, mainText, secondary, secondaryDark } = this.props.theme;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'stretch', backgroundColor: background }}>
          <ActivityIndicator size="large" color={main}/>
        </View>
      );
    }
    if (screen === 'all') {
      return (
        <View style={{ flex: 1 }}>
          <MonsterList theme={this.props.theme} navigator={this.props.navigator} monsters={this.state.allMonsters} type={'all'}/>
        </View>
      );
    } else if (screen === 'large') {
      return (
        <View style={{ flex: 1 }}>
          <MonsterList theme={this.props.theme} navigator={this.props.navigator} monsters={this.state.largeMonsters} type={'large'}/>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MonsterList theme={this.props.theme} navigator={this.props.navigator} monsters={this.state.smallMonsters} type={'small'}/>
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setNavSettings() {
    this.props.navigator.setStyle({
      navBarButtonColor: this.props.theme.main,
      navBarTextColor: this.props.theme.main,
      navBarBackgroundColor: this.props.theme.background,
      statusBarTextColorScheme: this.props.theme.statusbar,
      statusBarColor: this.props.theme.background,
      tabBarBackgroundColor: this.props.theme.background,
    });
  }

  render() {
    this.setNavSettings();
    const { accent, background, border, divider, main, mainText, secondary, secondaryDark } = this.props.theme;
    return (
      <View style={{ flex: 1 }}>
         {/* <Modal
           style={{
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
              alignItems: undefined,
              justifyContent: undefined,
              backgroundColor: colors.background,
            }}
           animationType='slide'
           useNativeDriver
           backdropColor = {'white'}
           backdropOpacity = {1}
           isVisible={this.state.modalVisible}
           onRequestClose={() => {
             this.setModalVisible(!this.state.modalVisible);
           }}>
             <View style={{ flex: 1.25, borderBottomWidth: 0.33, borderColor: '#ddd', flexDirection: 'row' }}>
                 <Button
                   transparent
                   style={{ flex: 1 }}
                   onPress={() => this.setModalVisible(!this.state.modalVisible)}
                   >
                   <Icon ios='ios-close' android="md-close" style={{ fontSize: 25, color: colors.main }} />
                 </Button>
                 <View style={{ flex: 2.5 }} />
                 <Button style={{ flex: 1 }} transparent>
                   <Text style={{ flex: 1, fontSize: 15.5, color: colors.main, texAlign: 'right' }}>{`Clear`}</Text>
                 </Button>
             </View>
             <View style={{ flex: 14 }}>
               <Text>Hello World!</Text>
             </View>
             <View style={{
               flex: 2.5,
               borderTopWidth: 0.33,
               borderColor: '#ddd',
               justifyContent: 'center',
             }}>
              <Button
                block
                style={{ backgroundColor: colors.accent, alignItems: 'center', shadowOpacity: 0, elevation: 0, marginLeft: 15, marginRight: 15 }}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                <Text style={{ fontSize: 15.5, color: 'white' }}>{`Apply`}</Text>
              </Button>
             </View>
         </Modal> */}
        <Container style={{ backgroundColor: background }}>
          <Tabs
            prerenderingSiblingsNumber={3}
            scrollWithoutAnimation={false}
            tabBarUnderlineStyle={{ backgroundColor: accent, height: 3 }}
            initialPage={0}>
           <Tab
             activeTabStyle={{ backgroundColor: background }}
             tabStyle={{ backgroundColor: background }}
             activeTextStyle={{ color: main }}
             textStyle={{ color: secondary }}
             heading="All"
             >
             {this.renderContent('all')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: background }}
             tabStyle={{ backgroundColor: background }}
             activeTextStyle={{ color: main }}
             textStyle={{ color: secondary }}
             heading="Large"
             >
             {this.renderContent('large')}
           </Tab>
           <Tab
             activeTabStyle={{ backgroundColor: background }}
             tabStyle={{ backgroundColor: background }}
             activeTextStyle={{ color: main }}
             textStyle={{ color: secondary }}
             heading="Small"
             >
             {this.renderContent('small')}
           </Tab>
         </Tabs>
         <AdBanner />
       </Container>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state.settings
};

export default connect(mapStateToProps, { setDarkTheme, setLightTheme })(MonsterScreen);
