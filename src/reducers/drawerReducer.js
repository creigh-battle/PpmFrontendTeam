import { SET_DRAWER } from "../actions/types";

const initialState = {
  active: false
};


export default function (state = initialState, action) {
    switch (action.type) {
      case SET_DRAWER:
        return {
          ...state,
          active: action.payload,
        };
  
      default:
        return state;
    }
  }