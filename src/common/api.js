import axios from "axios";
import { store } from "store/store";

const AuthApi = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Accept: "application/json",
  },
});

AuthApi.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 500) {
      console.log("Ops, ocorreu um erro, tente novamente!");
    } else if (error.response.status === 404) {
      console.log("Ops, não encontrado!");
    } else if (error.response.status === 400) {
      console.log("Ops, ocorreu um erro, tente novamente!");
    } else {
      throw error.response;
    }
  }
);

const Api = axios.create({
  baseURL: "http://localhost:8080/", // TODO: 1. AJUSTAR BASE URL
  headers: {
    Accept: "application/json",
  },
});

Api.interceptors.request.use(async (config) => {
  const auth = store.getState().auth;
  config.headers.Authorization = `Bearer ${auth.data?.access_token}`;
  return config;
});

Api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 500) {
      console.log("Ops, ocorreu um erro, tente novamente!");
    } else if (error.response.status === 404) {
      console.log("Ops, não encontrado!");
    } else {
      throw error.response;
    }
  }
);

export { Api, AuthApi };
