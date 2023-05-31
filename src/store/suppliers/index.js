import { suppliersTypes } from "./types";

const INITIAL_STATE = {
  register: {
    loading: false,
    success: false,
    error: false,
    data: {}
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case suppliersTypes.REGISTER_SUPPLIER_REQUEST:
      return {
        ...state,
        register: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case suppliersTypes.REGISTER_SUPPLIER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          data: action.payload.data,
          success: true,
          loading: false,
          error: false,
        },
      };
    case suppliersTypes.REGISTER_SUPPLIER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          data: action.payload.error,
          success: false,
          loading: false,
          error: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
