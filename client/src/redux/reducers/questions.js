import { FETCH_ALL } from "../constants/actionTypes";

export default (questions = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
      break;
    default:
      return questions;
  }
};
