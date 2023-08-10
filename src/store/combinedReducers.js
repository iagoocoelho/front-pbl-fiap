import { combineReducers } from 'redux';
import suppliers from './suppliers';
import customers from './customers';
import materials from './materials';
import products from './products';
import toast from './toast';

const appReducer = combineReducers({
  suppliers,
  customers,
  materials,
  products,
  toast,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;