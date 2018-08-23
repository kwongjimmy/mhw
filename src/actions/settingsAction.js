import {
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from './types';

export const setDarkTheme = () => (dispatch, getState) => {
  dispatch({
    type: SET_DARK_THEME,
    payload: {},
  });
};

export const setLightTheme = () => (dispatch, getState) => {
  dispatch({
    type: SET_LIGHT_THEME,
    payload: {},
  });
};
