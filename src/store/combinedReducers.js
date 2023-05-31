import { combineReducers } from 'redux';
import suppliers from './suppliers';
import toast from './toast';

const appReducer = combineReducers({
  suppliers,
  toast,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;