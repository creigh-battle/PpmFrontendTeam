import { SET_DRAWER, SET_THEME } from "./types";

export const changeTheme = (color) => async (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: color,
  });
};

export const openDrawer = (active) => async (dispatch) => {
  dispatch({
    type: SET_DRAWER,
    payload: active
  })
}
