import { combineReducers } from 'redux';
import suppliers from './suppliers';
import customers from './customers';
import toast from './toast';

const appReducer = combineReducers({
  suppliers,
  customers,
  toast,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;