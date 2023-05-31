import { call, put } from "redux-saga/effects";
import { Api } from "common/api";
import {
  registerSupplierSuccess,
  registerSupplierFailure,
  getSupplierListSuccess,
  getSupplierListFailure,
  getSupplierByIdSuccess,
  getSupplierByIdFailure,
  editSupplierSuccess,
  editSupplierFailure,
} from "./actions";
import { showToastr } from "store/toast/actions";

export function* registerSupplierRequest(action) {
  try {
    const { data } = yield call(
      Api.post,
      "/cliente-fornecedor",
      action.payload.data
    );
    yield put(registerSupplierSuccess(data));
    yield put(
      showToastr({ type: "success", message: "Cadastrado feito com sucesso!" })
    );
  } catch (error) {
    yield put(
      showToastr({ type: "danger", message: "Falha ao cadastrar o fornecedor" })
    );
    yield put(registerSupplierFailure());
  }
}

export function* editSupplierRequest(action) {
  try {
    const { data } = yield call(
      Api.put,
      "/cliente-fornecedor",
      action.payload.data
    );
    yield put(editSupplierSuccess(data));
    yield put(
      showToastr({ type: "success", message: "Editado feito com sucesso!" })
    );
  } catch (error) {
    yield put(
      showToastr({ type: "danger", message: "Falha ao editar o fornecedor" })
    );
    yield put(editSupplierFailure());
  }
}

export function* getSupplierByIdRequest(action) {
  try {
    const { data } = yield call(
      Api.get,
      `/cliente-fornecedor/${action.payload.id}`
    );

    yield put(getSupplierByIdSuccess(data));
  } catch (error) {
    yield put(getSupplierByIdFailure(error));
  }
}

export function* getSupplierListRequest() {
  try {
    const { data } = yield call(Api.get, "/cliente-fornecedor/all");

    yield put(getSupplierListSuccess(data));
  } catch (error) {
    yield put(getSupplierListFailure(error));
  }
}

export function* deleteSupplierRequest(action) {
  debugger
  try {
    const { data } = yield call(
      Api.delete,
      `/cliente-fornecedor/${action.payload.id}`,
      action.payload.id
    );

    yield put(
      showToastr({
        type: "success",
        message: "Fornecedor deletado com sucesso!",
      })
    );

    return Promise.resolve(data);
  } catch (error) {
    yield put(
      showToastr({
        type: "danger",
        message: "Falha ao deletar o fornecedor",
      })
    );
    return Promise.reject("Falha ao deletar");
  }
}
