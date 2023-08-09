import { combineReducers } from 'redux';
import suppliers from './suppliers';
import customers from './customers';
import materials from './materials';
import toast from './toast';

const appReducer = combineReducers({
  suppliers,
  customers,
  materials,
  toast,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;