import { all, takeLatest } from "redux-saga/effects";

// Fornecedores
import { registerSupplierRequest } from "./suppliers/sagas";
import { suppliersTypes } from "./suppliers/types";

export default function* rootSaga() {
  return yield all([
    takeLatest(
      suppliersTypes.REGISTER_SUPPLIER_REQUEST,
      registerSupplierRequest
    ),
  ]);
}
