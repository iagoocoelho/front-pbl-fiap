import { call, put } from "redux-saga/effects";
import { Api } from "common/api";
import { registerSupplierSuccess, registerSupplierFailure } from "./actions";
import { showToastr } from "store/toast/actions";

export function* registerSupplierRequest(action) {
  try {
    const { data } = yield call(
      Api.post,
      "/cadastraClienteFornecedor",
      action.payload.data
    );
    yield put(registerSupplierSuccess(data));
    // yield put(
    //   showToastr({ type: "success", message: "Cadastrado com sucesso!" })
    // );
  } catch (error) {
    // yield put(showToastr({ type: "danger", message: error.data.message }));
    yield put(registerSupplierFailure(error));
  }
}
