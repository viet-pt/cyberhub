import Axios from "axios";
import { hideLoading, showLoading } from "store/storeLoading";
import Cookies from "universal-cookie";
import { storageKey } from "utils/storageKey";
import { BACKEND_API } from "./_config";
const cookies = new Cookies();

export const BASE_URL = `${BACKEND_API}/api`;

export const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 300000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Osc-Render": "next",
  },
});

function getToken() {
  const isClient = process.browser;
  let token = "";
  if (isClient) {
    token = cookies.get(storageKey.ACCESS_TOKEN);
  }
  return token;
}

axios.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

function handleHttpError(error) {
  if (error?.response?.data) {
    return error.response.data || error;
  }
  return error;
}

function handleError(error) {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    localStorage.clear();
    cookies.remove(storageKey.ACCESS_TOKEN);
    cookies.remove(storageKey.PROFILE);
  }
}

function makeHttpRequest(
  apiCall,
  successCallBack,
  failCallBack,
  transformFunc
) {
  return new Promise(async () => {
    try {
      const response = await apiCall();
      const responseData = response.data;
      const successResponse =
        typeof transformFunc === "function"
          ? transformFunc(responseData)
          : responseData;
      successCallBack(successResponse);
    } catch (e) {
      handleError(e);
      if (typeof failCallBack === "function") {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

function makeHttpRequestWithLoading(
  apiCall,
  successCallBack,
  failCallBack,
  transformFunc
) {
  showLoading();
  return new Promise(async () => {
    try {
      const response = await apiCall();
      hideLoading();
      const responseData = response.data;
      const successResponse =
        typeof transformFunc === "function"
          ? transformFunc(responseData)
          : responseData;
      successCallBack(successResponse);
    } catch (e) {
      hideLoading();
      handleError(e);
      if (typeof failCallBack === "function") {
        failCallBack(handleHttpError(e));
      }
    }
  });
}

export async function postRequestShowLoading(
  url: string,
  data: any,
  config = {},
  successCallBack: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequestWithLoading(
    () => axios.post(url, data, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}

export function getRequestShowLoading(
  url: string,
  config = {},
  successCallBack: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequestWithLoading(
    () => axios.get(url, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}

export function getRequest(
  url: string,
  config = {},
  successCallBack: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequest(
    () => axios.get(url, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}

export function postRequest(
  url: string,
  data: any,
  config = {},
  successCallBack?: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequest(
    () => axios.post(url, data, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}

export async function postServerRequest(url: string, data: any, config = {}) {
  try {
    const responseData = await axios.post(url, data, config);
    return responseData.data;
  } catch (error) {
    handleError(error);
    console.log("error", error);
  }
}

export async function getServerRequest(url: string, config = {}) {
  try {
    const responseData = await axios.get(url, config);
    return responseData.data;
  } catch (error) {
    handleError(error);
    console.log("error", error);
  }
}

export function putRequest(
  url: string,
  data: any,
  config = {},
  successCallBack: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequestWithLoading(
    () => axios.put(url, data, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}

export function deleteRequest(
  url: string,
  config = {},
  successCallBack: Function,
  failCallBack?: Function,
  transformFunc?: Function
) {
  return makeHttpRequest(
    () => axios.delete(url, config),
    successCallBack,
    failCallBack,
    transformFunc
  );
}
