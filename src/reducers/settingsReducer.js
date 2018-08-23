import _ from 'lodash';
import {
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from '../actions/types';


const darkTheme = {
  accent: '#ff6666',
  main: 'white',
  secondary: '#8e8e8e',
  secondaryDark: '#5e5e5e',
  divider: '#F8F8F8',
  border: '#141414',
  background: 'black',
  iosStatusBar: 'light-content',
  statusbar: 'light',
  mainText: 'white',
  listItemHeader: 'black',
  listItem: '#111111',
  red: '#ff6666',
  blue: '#3232ff',
  teal: '#009999',
  yellow: '#ffff7f',
  purple: '#bf7fbf',
  backdrop: '#3f3f3f',
};

const lightTheme = {
  accent: '#ff6666',
  main: '#3f3f3f',
  secondary: '#8e8e8e',
  secondaryDark: '#5e5e5e',
  divider: '#F8F8F8',
  border: '#e9e9e9',
  background: 'white',
  iosStatusBar: 'dark-content',
  statusbar: 'dark',
  mainText: '#3f3f3f',
  listItemHeader: '#F8F8F8',
  listItem: 'white',
  red: '#ff6666',
  blue: '#3232ff',
  teal: '#009999',
  yellow: '#ffff7f',
  purple: '#bf7fbf',
  backdrop: '#3f3f3f',
};

const INITIAL_STATE = {
  theme: lightTheme,
  themeStatus: 'light',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DARK_THEME: {
      return { ...state, theme: darkTheme, themeStatus: 'dark' };
    }
    case SET_LIGHT_THEME: {
      return { ...state, theme: lightTheme, themeStatus: 'light' };
    }
    default:
      return state;
  }
};
