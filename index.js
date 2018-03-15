// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('MHWDB', () => App);

__STRESS_TEST__ = false;
// import App from './src/app';
import { Platform } from 'react-native';
import { Navigation, NativeEventsReceiver } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import { iconsMap, iconsLoaded } from './src/assets/app-icons';
import startApp from './src/index';

if (Platform.OS === 'ios') {
  firebase.admob().initialize('ca-app-pub-9661316023859369~8631787158');
  iconsLoaded.then(() => {
    startApp();
  });
} else {
  Navigation.isAppLaunched()
    .then((appLaunched) => {
      firebase.admob().initialize('ca-app-pub-9661316023859369~7718150996');
      if (appLaunched) {
        iconsLoaded.then(() => {
          startApp();
        });
      }
      new NativeEventsReceiver().appLaunched(startApp);
    });
}
