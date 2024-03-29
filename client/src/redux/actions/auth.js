import { AUTH, FETCH_USER, UPDATE_USER } from "../constants/actionTypes";
import * as api from "../api/index.js";
export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    // window.location.reload(); //  the page after logout
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    
    dispatch({ type: AUTH, data });
    // window.location.reload(); // Reload the page after logout
  } catch (error) {
    console.log(error);
  }
};


export const getUserById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = (id, updatedblog) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, updatedblog);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};


