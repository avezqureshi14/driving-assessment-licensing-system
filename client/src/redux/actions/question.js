import * as api from "../api";
import { FETCH_ALL } from "../constants/actionTypes";

export const getQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuestions();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
