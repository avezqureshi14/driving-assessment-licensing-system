import {combineReducers} from 'redux'
import questions from './questions';
import auth from './auth';
import testRed from './test';
const rootReducer = combineReducers({
 questions,
 auth,
 testRed
});

export default rootReducer;
