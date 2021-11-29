import axios from "axios";
import setJwtToken from "../security_utils/setJwtToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
<<<<<<< HEAD
    await axios.post(
      "https://still-springs-98597.herokuapp.com/api/users/register",
      newUser
    );
=======
    await axios.post("http://52.149.156.107:8383/api/users/register", newUser, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
>>>>>>> 99d2e745e7180edf099b0ad6422afff5216267d2
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    console.log("im trying");
    const res = await axios.post(
<<<<<<< HEAD
      "https://still-springs-98597.herokuapp.com/api/users/login",
      LoginRequest
=======
      "http://52.149.156.107:8383/api/users/login",
      LoginRequest,
      {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
>>>>>>> 99d2e745e7180edf099b0ad6422afff5216267d2
    );

    // extract token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in header
    setJwtToken(token);

    // decode token on react
    const decoded = jwt_decode(token);

    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
