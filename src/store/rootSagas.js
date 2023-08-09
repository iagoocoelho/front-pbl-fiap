import { all, takeLatest } from "redux-saga/effects";

// Fornecedores
import {
  registerSupplierRequest,
  getSupplierListRequest,
  deleteSupplierRequest,
  getSupplierByIdRequest,
  editSupplierRequest,
} from "./suppliers/sagas";
import { suppliersTypes } from "./suppliers/types";

// Clientes
import {
  registerCustomerRequest,
  getCustomerListRequest,
  deleteCustomerRequest,
  getCustomerByIdRequest,
  editCustomerRequest,
} from "./customers/sagas";
import { customersTypes } from "./customers/types";

// Material
import {
  registerMaterialRequest,
  getMaterialListRequest,
  getMaterialByIdRequest,
  editMaterialRequest,
} from "./materials/sagas";
import { materialsTypes } from "./materials/types";

export default function* rootSaga() {
  return yield all([
    // SUPPLIER
    takeLatest(
      suppliersTypes.REGISTER_SUPPLIER_REQUEST,
      registerSupplierRequest
    ),
    takeLatest(suppliersTypes.EDIT_SUPPLIER_REQUEST, editSupplierRequest),
    takeLatest(
      suppliersTypes.GET_SUPPLIER_LIST_REQUEST,
      getSupplierListRequest
    ),
    takeLatest(suppliersTypes.DELETE_SUPPLIER_REQUEST, deleteSupplierRequest),
    takeLatest(
      suppliersTypes.GET_SUPPLIER_BY_ID_REQUEST,
      getSupplierByIdRequest
    ),

    // CUSTOMER
    takeLatest(
      customersTypes.REGISTER_CUSTOMER_REQUEST,
      registerCustomerRequest
    ),
    takeLatest(customersTypes.EDIT_CUSTOMER_REQUEST, editCustomerRequest),
    takeLatest(
      customersTypes.GET_CUSTOMER_LIST_REQUEST,
      getCustomerListRequest
    ),
    takeLatest(customersTypes.DELETE_CUSTOMER_REQUEST, deleteCustomerRequest),
    takeLatest(
      customersTypes.GET_CUSTOMER_LIST_REQUEST,
      getCustomerByIdRequest
    ),

    // MATERIAL
    takeLatest(
      materialsTypes.REGISTER_MATERIAL_REQUEST,
      registerMaterialRequest
    ),
    takeLatest(materialsTypes.EDIT_MATERIAL_REQUEST, editMaterialRequest),
    takeLatest(
      materialsTypes.GET_MATERIAL_LIST_REQUEST,
      getMaterialListRequest
    ),
    takeLatest(
      materialsTypes.GET_MATERIAL_LIST_REQUEST,
      getMaterialByIdRequest
    ),
  ]);
}
