import {SET_THEME } from "../actions/types";

const initialState = {
  color: "light",

};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        color: action.payload,
      };

    default:
      return state;
  }
}




