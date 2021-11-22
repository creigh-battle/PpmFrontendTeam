import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post(
      "https://still-springs-98597.herokuapp.com/api/project",
      project
    );
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get(
    "https://still-springs-98597.herokuapp.com/api/project/all"
  );
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://still-springs-98597.herokuapp.com/api/project/${id}`
    );
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it"
    )
  ) {
    await axios.delete(
      `https://still-springs-98597.herokuapp.com/api/project/${id}`
    );
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
