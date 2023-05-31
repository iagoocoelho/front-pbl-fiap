import { action } from "typesafe-actions";
import { suppliersTypes } from "./types";

export const registerSupplierRequest = (data) =>
  action(suppliersTypes.REGISTER_SUPPLIER_REQUEST, { data });
export const registerSupplierSuccess = (data) =>
  action(suppliersTypes.REGISTER_SUPPLIER_SUCCESS, { data });
export const registerSupplierFailure = (error) =>
  action(suppliersTypes.REGISTER_SUPPLIER_FAILURE, { error });

export const getSupplierListRequest = () =>
  action(suppliersTypes.GET_SUPPLIER_LIST_REQUEST);
export const getSupplierListSuccess = (data) =>
  action(suppliersTypes.GET_SUPPLIER_LIST_SUCCESS, { data });
export const getSupplierListFailure = (error) =>
  action(suppliersTypes.GET_SUPPLIER_LIST_FAILURE, { error });
export const getSupplierListClean = () =>
  action(suppliersTypes.GET_SUPPLIER_BY_ID_CLEAN);

export const getSupplierByIdRequest = (id) =>
  action(suppliersTypes.GET_SUPPLIER_BY_ID_REQUEST, { id });
// export const getSupplierListSuccess = (data) =>
//   action(suppliersTypes.GET_SUPPLIER_LIST_SUCCESS, { data });
// export const getSupplierListFailure = (error) =>
//   action(suppliersTypes.GET_SUPPLIER_LIST_FAILURE, { error });

export const deleteSupplierRequest = (id) =>
  action(suppliersTypes.DELETE_SUPPLIER_REQUEST, { id });
