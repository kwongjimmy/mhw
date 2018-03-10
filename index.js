// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('MHW', () => App);

__STRESS_TEST__ = false;
// import App from './src/app';
import { Platform } from 'react-native';
import { Navigation, NativeEventsReceiver } from 'react-native-navigation';
import { iconsMap, iconsLoaded } from './src/assets/app-icons';
import startApp from './src/index';

if (Platform.OS === 'ios') {
  iconsLoaded.then(() => {
    startApp();
  });
} else {
  Navigation.isAppLaunched()
    .then((appLaunched) => {
      if (appLaunched) {
        iconsLoaded.then(() => {
          startApp();
        });
      }
      new NativeEventsReceiver().appLaunched(startApp);
    });
}
