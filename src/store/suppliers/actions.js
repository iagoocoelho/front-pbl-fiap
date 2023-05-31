import { action } from "typesafe-actions";
import { suppliersTypes } from "./types";

export const registerSupplierRequest = (data) =>
  action(suppliersTypes.REGISTER_SUPPLIER_REQUEST, { data });
export const registerSupplierSuccess = (data) =>
  action(suppliersTypes.REGISTER_SUPPLIER_SUCCESS, { data });
export const registerSupplierFailure = (error) =>
  action(suppliersTypes.REGISTER_SUPPLIER_FAILURE, { error });
