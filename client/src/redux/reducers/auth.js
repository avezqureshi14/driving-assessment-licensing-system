// Import the actionTypes
import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };

    case actionType.FETCH_USER:
      return action.payload;

    case actionType.UPDATE_USER:
      // Update both Redux store and local storage
      const updatedState = {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };

      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

      return updatedState;

    default:
      return state;
  }
};

export default authReducer;
