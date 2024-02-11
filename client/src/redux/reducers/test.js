// testRed.js
import { TEST } from "../constants/actionTypes";



const testRed = (state = true, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  }
};

export default testRed;
