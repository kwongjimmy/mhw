import {
  ADD_WEAPON,
  REMOVE_WEAPON,
  ADD_ARMOR,
  REMOVE_ARMOR,
} from './types';

export const addWeapon = state => (dispatch, getState) => {
  dispatch({
    type: ADD_WEAPON,
    payload: { weaponID: state.weaponID, info: state.info, type: state.type },
  });
};

export const removeWeapon = state => (dispatch, getState) => {
  dispatch({
    type: REMOVE_WEAPON,
    payload: { weaponID: state.weaponID },
  });
};

export const addArmor = state => (dispatch, getState) => {
  dispatch({
    type: ADD_ARMOR,
    payload: { armorID: state.armorID, info: state.info },
  });
};

export const removeArmor = state => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ARMOR,
    payload: { armorID: state.armorID },
  });
};
