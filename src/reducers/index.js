import { combineReducers } from 'redux';
import testReducer from './testReducer';
import favoritesReducer from './favoritesReducer';
import settingsReducer from './settingsReducer';


const rootReducer = combineReducers({
  test: testReducer,
  favorites: favoritesReducer,
  settings: settingsReducer,
});
export default rootReducer;
