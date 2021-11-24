import { SET_THEME } from "./types";

export const changeTheme = (color) => async (dispatch) => {
  dispatch({
    type: SET_THEME,
    payload: color,
  });
};
