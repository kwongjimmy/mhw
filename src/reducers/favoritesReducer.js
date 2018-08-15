import _ from 'lodash';
import {
  ADD_WEAPON,
  REMOVE_WEAPON,
  ADD_ARMOR,
  REMOVE_ARMOR,
} from '../actions/types';

const INITIAL_STATE = {
  weapons: [],
  armor: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ADD_WEAPON:
    //   return {
    //     ...state,
    //     weapons: {
    //       ...state.weapons,
    //       [action.payload.weaponID]: action.payload.info,
    //     },
    //   };
    case ADD_WEAPON:
      return {
        ...state,
        weapons: [
          ...state.weapons,
          action.payload,
        ],
      };
    case ADD_ARMOR:
      return {
        ...state,
        armor: [
          ...state.armor,
          action.payload,
        ],
      };
    // case REMOVE_WEAPON: {
    //   const newState = state;
    //   delete newState.weapons[action.payload.weaponID];
    //   return {
    //     ...newState,
    //   };
    // }
    case REMOVE_WEAPON: {
      let weaponArray = state.weapons;
      weaponArray = _.remove(weaponArray, obj => obj.weaponID !== action.payload.weaponID);
      // const newState = state;
      // delete newState.weapons[action.payload.weaponID];
      return {
        ...state, weapons: weaponArray,
      };
    }
    case REMOVE_ARMOR: {
      let armorArray = state.armor;
      armorArray = _.remove(armorArray, obj => obj.armorID !== action.payload.armorID);
      // const newState = state;
      // delete newState.armor[action.payload.armorID];
      return {
        ...state, armor: armorArray,
      };
    }
    default:
      return state;
  }
};
