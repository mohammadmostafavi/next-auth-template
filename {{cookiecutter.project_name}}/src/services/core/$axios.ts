import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import getConfig from "next/config";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const BASE_URL =
  getConfig()?.publicRuntimeConfig?.BASE_URL || "http://localhost:9000";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error PURE]`, error);
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const $axios = (() => {
  
  const headers = {
    "Content-Type": "application/json",
  };
  

  return axios.create({
    baseURL: BASE_URL,
    headers,
    timeout: 10000 * 50,
  });
})();

setupInterceptorsTo(axios);
export default $axios;
