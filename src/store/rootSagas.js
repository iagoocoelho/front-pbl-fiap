import { all, takeLatest } from "redux-saga/effects";

// Fornecedores
import {
  registerSupplierRequest,
  getSupplierListRequest,
  deleteSupplierRequest,
  getSupplierByIdRequest,
  editSupplierRequest
} from "./suppliers/sagas";
import { suppliersTypes } from "./suppliers/types";

export default function* rootSaga() {
  return yield all([
    takeLatest(
      suppliersTypes.REGISTER_SUPPLIER_REQUEST,
      registerSupplierRequest
    ),
    takeLatest(
      suppliersTypes.EDIT_SUPPLIER_REQUEST,
      editSupplierRequest
    ),
    takeLatest(
      suppliersTypes.GET_SUPPLIER_LIST_REQUEST,
      getSupplierListRequest
    ),
    takeLatest(suppliersTypes.DELETE_SUPPLIER_REQUEST, deleteSupplierRequest),
    takeLatest(
      suppliersTypes.GET_SUPPLIER_BY_ID_REQUEST,
      getSupplierByIdRequest
    ),
  ]);
}
