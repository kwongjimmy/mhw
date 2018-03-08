// import { AppRegistry } from 'react-native';
// import App from './App';
//
// AppRegistry.registerComponent('MHW', () => App);

__STRESS_TEST__ = false;
// import App from './src/app';
import { iconsMap, iconsLoaded } from './src/assets/app-icons';
import registerApp from './src/index';

iconsLoaded.then(() => {
  registerApp();
});
