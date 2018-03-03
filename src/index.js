import { Navigation } from 'react-native-navigation';

import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';

import MonsterScreen from './screens/MonsterScreen';
import EquipArmorScreen from './screens/EquipArmorScreen';
import QuestScreen from './screens/QuestScreen';
import WeaponSelectScreen from './screens/WeaponSelectScreen';
import WeaponScreen from './screens/WeaponScreen';
import MiscScreen from './screens/MiscScreen';
import ItemScreen from './screens/ItemScreen';
import SearchScreen from './screens/SearchScreen';
import CharmScreen from './screens/CharmScreen';
import SkillScreen from './screens/SkillScreen';
import MapScreen from './screens/MapScreen';

import MonsterInfoScreen from './screens/MonsterInfoScreen';
import TabInfoScreen from './screens/TabInfoScreen';
import TablessInfoScreen from './screens/TablessInfoScreen';

// async function prepareIcons() {
//   const icons = await Promise.all([
//     Icon.getImageSource('ios-home', 30),
//     Icon.getImageSource('ios-search', 30),
//     Icon.getImageSource('ios-add-circle', 60),
//     Icon.getImageSource('ios-heart', 30),
//     Icon.getImageSource('ios-person', 30),
//   ]);
//   const [home, explore, create, notifications, profile] = icons;
//   return { home, explore, create, notifications, profile };
// }

// and then
// async function startApp() {
//   // const icons = await prepareIcons();
//
//   Navigation.registerComponent('Screen1', () => Screen1);
//   Navigation.registerComponent('Screen2', () => Screen2);
//   Navigation.registerComponent('Screen3', () => Screen3);
//   Navigation.registerComponent('Screen4', () => Screen4);
//
//   Navigation.registerComponent('MonsterScreen', () => MonsterScreen);
//   Navigation.registerComponent('EquipArmorScreen', () => EquipArmorScreen);
//   Navigation.registerComponent('QuestScreen', () => QuestScreen);
//   Navigation.registerComponent('WeaponSelectScreen', () => WeaponSelectScreen);
//   Navigation.registerComponent('MiscScreen', () => MiscScreen);
//   Navigation.registerComponent('ItemScreen', () => ItemScreen);
//   Navigation.registerComponent('SearchScreen', () => SearchScreen);
//   Navigation.registerComponent('CharmScreen', () => CharmScreen);
//   Navigation.registerComponent('SkillScreen', () => SkillScreen);
//   Navigation.registerComponent('MapScreen', () => MapScreen);
//
//
//   Navigation.registerComponent('WeaponScreen', () => WeaponScreen);
//   Navigation.registerComponent('MonsterInfoScreen', () => MonsterInfoScreen);
//   Navigation.registerComponent('TabInfoScreen', () => TabInfoScreen);
//   Navigation.registerComponent('TablessInfoScreen', () => TablessInfoScreen);
//
//   Navigation.startTabBasedApp({
//     tabs: [
//       // {
//       //   label: 'One',
//       //   screen: 'Screen1',
//       //   icon: require('./images/icon1.png'),
//       //   selectedIcon: require('./images/icon1_selected.png'),
//       //   title: 'Screen One'
//       // },
//       // {
//       //   label: 'Two',
//       //   screen: 'Screen2',
//       //   icon: require('./images/icon2.png'),
//       //   selectedIcon: require('./images/icon2_selected.png'),
//       //   title: 'Screen Two'
//       // },
//       {
//         label: 'Monsters',
//         screen: 'MonsterScreen',
//         icon: require('./assets/images/monsters/MHW-Great_Jagras_Icon.png'),
//         selectedIcon: require('./assets/images/monsters/MHW-Great_Jagras_Icon.png'),
//         title: 'Monsters',
//       },
//       {
//         label: 'Armor',
//         screen: 'EquipArmorScreen',
//         icon: require('./assets/images/armor/body.png'),
//         selectedIcon: require('./assets/images/armor/body.png'),
//         title: 'Armor',
//       },
//       {
//         label: 'Weapons',
//         screen: 'WeaponSelectScreen',
//         icon: require('./assets/images/weapons/Great_Sword_Icon_White.png'),
//         selectedIcon: require('./assets/images/weapons/Great_Sword_Icon_White.png'),
//         title: 'Weapons',
//       },
//       {
//         label: 'SearchScreen',
//         screen: 'SearchScreen',
//         icon: require('./images/icon2.png'),
//         selectedIcon: require('./images/icon2_selected.png'),
//         title: 'Search',
//       },
//       {
//         label: 'Misc',
//         screen: 'MiscScreen',
//         icon: require('./images/icon2.png'),
//         selectedIcon: require('./images/icon2_selected.png'),
//         title: 'Misc',
//       },
//     ],
//     appStyle: {
//       // tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
//       tabFontSize: 10,
//       selectedTabFontSize: 11,
//       statusBarColor: 'white',
//       statusBarTextColorScheme: 'dark',
//       navBarHeight: 40,
//       topBarElevationShadowEnabled: false,
//       navBarBackgroundColor: 'white',
//       tabBarHidden: false, // make the tab bar hidden
//       tabBarButtonColor: '#8e8e8e', // change the color of the tab icons and text (also unselected)
//       tabBarSelectedButtonColor: 'red', // change the color of the selected tab icon and text (only selected)
//       tabBarBackgroundColor: 'white', // change the background color of the tab bar
//       tabBarTranslucent: false, // change the translucent of the tab bar to false
//       // tabBarTextFontFamily: 'Avenir-Medium', //change the tab font family
//       tabBarLabelColor: '#8e8e8e', // iOS only. change the color of tab text
//       tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
//       // forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
//       tabBarHideShadow: false, // iOS only. Remove default tab bar top shadow (hairline)
//     },
//     // tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
//     //   tabBarHidden: false, // make the tab bar hidden
//     //   tabBarButtonColor: '#5e5e5e', // change the color of the tab icons and text (also unselected)
//     //   tabBarSelectedButtonColor: 'red', // change the color of the selected tab icon and text (only selected)
//     //   tabBarBackgroundColor: 'white', // change the background color of the tab bar
//     //   tabBarTranslucent: false, // change the translucent of the tab bar to false
//     //   // tabBarTextFontFamily: 'Avenir-Medium', //change the tab font family
//     //   tabBarLabelColor: '#5e5e5e', // iOS only. change the color of tab text
//     //   tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
//     //   // forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
//     //   tabBarHideShadow: true, // iOS only. Remove default tab bar top shadow (hairline)
//     // }
//   });
// }

// // start the app
// export default startApp();

export default () => {
  Navigation.registerComponent('Screen1', () => Screen1);
  Navigation.registerComponent('Screen2', () => Screen2);
  Navigation.registerComponent('Screen3', () => Screen3);
  Navigation.registerComponent('Screen4', () => Screen4);

  Navigation.registerComponent('MonsterScreen', () => MonsterScreen);
  Navigation.registerComponent('EquipArmorScreen', () => EquipArmorScreen);
  Navigation.registerComponent('QuestScreen', () => QuestScreen);
  Navigation.registerComponent('WeaponSelectScreen', () => WeaponSelectScreen);
  Navigation.registerComponent('MiscScreen', () => MiscScreen);
  Navigation.registerComponent('ItemScreen', () => ItemScreen);
  Navigation.registerComponent('SearchScreen', () => SearchScreen);
  Navigation.registerComponent('CharmScreen', () => CharmScreen);
  Navigation.registerComponent('SkillScreen', () => SkillScreen);
  Navigation.registerComponent('MapScreen', () => MapScreen);


  Navigation.registerComponent('WeaponScreen', () => WeaponScreen);
  Navigation.registerComponent('MonsterInfoScreen', () => MonsterInfoScreen);
  Navigation.registerComponent('TabInfoScreen', () => TabInfoScreen);
  Navigation.registerComponent('TablessInfoScreen', () => TablessInfoScreen);

  Navigation.startTabBasedApp({
    tabs: [
      // {
      //   label: 'One',
      //   screen: 'Screen1',
      //   icon: require('./images/icon1.png'),
      //   selectedIcon: require('./images/icon1_selected.png'),
      //   title: 'Screen One'
      // },
      // {
      //   label: 'Two',
      //   screen: 'Screen2',
      //   icon: require('./images/icon2.png'),
      //   selectedIcon: require('./images/icon2_selected.png'),
      //   title: 'Screen Two'
      // },
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
        label: 'SearchScreen',
        screen: 'SearchScreen',
        icon: require('./images/icon2.png'),
        selectedIcon: require('./images/icon2_selected.png'),
        title: 'Search',
      },
      {
        label: 'Misc',
        screen: 'MiscScreen',
        icon: require('./images/icon2.png'),
        selectedIcon: require('./images/icon2_selected.png'),
        title: 'Misc',
      },
    ],
    appStyle: {
      // tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
      tabFontSize: 10,
      selectedTabFontSize: 11,
      statusBarColor: 'white',
      statusBarTextColorScheme: 'dark',
      navBarHeight: 40,
      topBarElevationShadowEnabled: false,
      navBarBackgroundColor: 'white',
      tabBarHidden: false, // make the tab bar hidden
      tabBarButtonColor: '#8e8e8e', // change the color of the tab icons and text (also unselected)
      tabBarSelectedButtonColor: 'red', // change the color of the selected tab icon and text (only selected)
      tabBarBackgroundColor: 'white', // change the background color of the tab bar
      tabBarTranslucent: false, // change the translucent of the tab bar to false
      // tabBarTextFontFamily: 'Avenir-Medium', //change the tab font family
      tabBarLabelColor: '#8e8e8e', // iOS only. change the color of tab text
      tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
      // forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
      tabBarHideShadow: false, // iOS only. Remove default tab bar top shadow (hairline)
    },
    tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
      tabBarHidden: false, // make the tab bar hidden
      tabBarButtonColor: '#5e5e5e', // change the color of the tab icons and text (also unselected)
      tabBarSelectedButtonColor: 'red', // change the color of the selected tab icon and text (only selected)
      tabBarBackgroundColor: 'white', // change the background color of the tab bar
      tabBarTranslucent: false, // change the translucent of the tab bar to false
      // tabBarTextFontFamily: 'Avenir-Medium', //change the tab font family
      tabBarLabelColor: '#5e5e5e', // iOS only. change the color of tab text
      tabBarSelectedLabelColor: 'red', // iOS only. change the color of the selected tab text
      // forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
      tabBarHideShadow: false, // iOS only. Remove default tab bar top shadow (hairline)
      navBarHeight: 10,

    }
  });
};
