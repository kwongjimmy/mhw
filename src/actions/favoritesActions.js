import {
  ADD_WEAPON,
  REMOVE_WEAPON,
  ADD_ARMOR,
  REMOVE_ARMOR,
  REORDER_WEAPON,
  REORDER_ARMOR,
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

export const saveWeaponOrder = order => (dispatch, getState) => {
  const { weapons } = getState().favorites;
  let newWeaponArray = [];
  for (let i = 0; i < weapons.length; i += 1) {
    newWeaponArray[i] = weapons[order[i]];
    if (i === weapons.length - 1) {
      console.log(newWeaponArray);
      dispatch({
        type: REORDER_WEAPON,
        payload: { currentWeaponOrder: newWeaponArray },
      });
    }
  }
};

export const setWeaponOrder = order => (dispatch, getState) => {
  dispatch({
    type: REORDER_WEAPON,
    payload: { currentWeaponOrder: order },
  });
};
