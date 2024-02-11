import { TEST } from "../constants/actionTypes";

export const testVariable = (value) => ({
    type: TEST,
    payload: value,
  });