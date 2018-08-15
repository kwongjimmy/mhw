import { combineReducers } from 'redux';
import testReducer from './testReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  test: testReducer,
  favorites: favoritesReducer,
});
export default rootReducer;
