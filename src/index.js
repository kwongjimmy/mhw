import { Navigation } from 'react-native-navigation';
import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/store';
import { iconsMap, iconsLoaded } from './assets/app-icons';
import colors from './styles/colors';

import MonsterScreen from './screens/MonsterScreen';
import EquipArmorScreen from './screens/EquipArmorScreen';
import QuestScreen from './screens/QuestScreen';
import WeaponSelectScreen from './screens/WeaponSelectScreen';
import WeaponSelectedScreen from './screens/WeaponSelectedScreen';
import MiscScreen from './screens/MiscScreen';
import ItemScreen from './screens/ItemScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SearchScreen from './screens/SearchScreen';
import CharmScreen from './screens/CharmScreen';
import SkillScreen from './screens/SkillScreen';
import MapScreen from './screens/MapScreen';
import DecorationScreen from './screens/DecorationScreen';
import AboutScreen from './screens/AboutScreen';
import CombinationScreen from './screens/CombinationScreen';
import ToolScreen from './screens/ToolScreen';
import EndemicScreen from './screens/EndemicScreen';
import SetBuilderScreen from './screens/SetBuilderScreen';
import SetBuilderSelect from './screens/SetBuilderSelect';
import SetSelectScreen from './screens/SetSelectScreen';


import MonsterInfoScreen from './screens/MonsterInfoScreen';
import EquipInfoScreen from './screens/EquipInfoScreen';
import WeaponInfoScreen from './screens/WeaponInfoScreen';
import EquipArmorSetScreen from './screens/EquipArmorSetScreen';

import TabInfoScreen from './screens/TabInfoScreen';
import TablessInfoScreen from './screens/TablessInfoScreen';

const store = configureStore();

const Provider1 = ({ store, children }) => {
  console.log(store.getState().settings.theme.iosStatusBar);
  if (Platform.OS === 'ios') {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle = {store.getState().settings.theme.iosStatusBar} />
          {children}
        </View>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </Provider>
  );
};

export default function startApp() {
  Navigation.registerComponent('MonsterScreen', () => MonsterScreen, store, Provider1);
  Navigation.registerComponent('EquipArmorScreen', () => EquipArmorScreen, store, Provider1);
  Navigation.registerComponent('QuestScreen', () => QuestScreen, store, Provider1);
  Navigation.registerComponent('WeaponSelectScreen', () => WeaponSelectScreen, store, Provider1);
  Navigation.registerComponent('MiscScreen', () => MiscScreen, store, Provider1);
  Navigation.registerComponent('ItemScreen', () => ItemScreen, store, Provider1);
  Navigation.registerComponent('FavoritesScreen', () => FavoritesScreen, store, Provider1);
  Navigation.registerComponent('SearchScreen', () => SearchScreen, store, Provider1);
  Navigation.registerComponent('CharmScreen', () => CharmScreen, store, Provider1);
  Navigation.registerComponent('SkillScreen', () => SkillScreen, store, Provider1);
  Navigation.registerComponent('MapScreen', () => MapScreen, store, Provider1);
  Navigation.registerComponent('DecorationScreen', () => DecorationScreen, store, Provider1);
  Navigation.registerComponent('AboutScreen', () => AboutScreen, store, Provider1);
  Navigation.registerComponent('CombinationScreen', () => CombinationScreen, store, Provider1);
  Navigation.registerComponent('ToolScreen', () => ToolScreen, store, Provider1);
  Navigation.registerComponent('EndemicScreen', () => EndemicScreen, store, Provider1);
  Navigation.registerComponent('SetBuilderScreen', () => SetBuilderScreen, store, Provider1);
  Navigation.registerComponent('SetBuilderSelect', () => SetBuilderSelect, store, Provider1);
  Navigation.registerComponent('SetSelectScreen', () => SetSelectScreen, store, Provider1);
  Navigation.registerComponent('SetSelectScreen', () => SetSelectScreen, store, Provider1);
  Navigation.registerComponent('WeaponSelectedScreen', () => WeaponSelectedScreen, store, Provider1);
  Navigation.registerComponent('MonsterInfoScreen', () => MonsterInfoScreen, store, Provider1);
  Navigation.registerComponent('TabInfoScreen', () => TabInfoScreen, store, Provider1);
  Navigation.registerComponent('TablessInfoScreen', () => TablessInfoScreen, store, Provider1);
  Navigation.registerComponent('EquipInfoScreen', () => EquipInfoScreen, store, Provider1);
  Navigation.registerComponent('WeaponInfoScreen', () => WeaponInfoScreen, store, Provider1);
  Navigation.registerComponent('EquipArmorSetScreen', () => EquipArmorSetScreen, store, Provider1);


  // DELETE to prevent vector icon error ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
  persistStore(store, null, () => {
    console.log(store.getState().settings.theme);
    const {
      accent,
      background,
      statusbar,
      secondary,
      mainText,
      main,
    } = store.getState().settings.theme;
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Monsters',
          screen: 'MonsterScreen',
          icon: require('./assets/images/monsters/MHW-Rathalos_TabIcon.png'),
          selectedIcon: require('./assets/images/monsters/MHW-Rathalos_TabIcon.png'),
          title: 'Monsters',
        },
        {
          label: 'Armor',
          screen: 'EquipArmorScreen',
          icon: require('./assets/images/armor/body.png'),
          selectedIcon: require('./assets/images/armor/body.png'),
          title: 'Armor',
        },
        {
          label: 'Weapons',
          screen: 'WeaponSelectScreen',
          icon: require('./assets/images/weapons/Great_Sword_Icon_White.png'),
          selectedIcon: require('./assets/images/weapons/Great_Sword_Icon_White.png'),
          title: 'Weapons',
        },
        {
          label: 'Search',
          screen: 'SearchScreen',
          icon: iconsMap['ios-search--active'],
          title: 'Search',
        },
        {
          label: 'More',
          screen: 'MiscScreen',
          icon: iconsMap['ios-menu--active'],
          title: 'More',
        },
      ],
      animationType: 'fade',
      portraitOnlyMode: true,
      appStyle: {
        // tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
        tabFontSize: 10,
        selectedTabFontSize: 11,
        statusBarColor: background,
        statusBarTextColorScheme: statusbar,
        navBarHeight: 40,
        navBarButtonColor: main,
        topBarElevationShadowEnabled: false,
        tabBarBackgroundColor: background,
        tabBarHidden: false, // make the tab bar hidden
        forceTitlesDisplay: true,
        navBarHideOnScroll: false,
        tabBarButtonColor: secondary, // change the color of the tab icons and text (also unselected)
        tabBarSelectedButtonColor: accent, // change the color of the selected tab icon and text (only selected)
        navBarTextColor: mainText, // change the text color of the title (remembered across pushes)
        navBarTextFontSize: 18, // change the font size of the title
        navBarBackgroundColor: background,
      },
      tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
        tabBarHidden: false, // make the tab bar hidden
        tabBarTranslucent: false, // change the translucent of the tab bar to false
        tabBarHideShadow: false, // iOS only. Remove default tab bar top shadow (hairline)
        navBarBackgroundColor: background,
        tabBarButtonColor: secondary, // change the color of the tab icons and text (also unselected)
        tabBarSelectedButtonColor: accent, // change the color of the selected tab icon and text (only selected)
        tabBarLabelColor: secondary, // iOS only. change the color of tab text
        tabBarSelectedLabelColor: accent, // iOS only. change the color of the selected tab text
        tabBarBackgroundColor: background, // change the background color of the tab bar
      },
    });
  });
}
