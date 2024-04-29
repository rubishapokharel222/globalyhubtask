import axios from "axios";
import { API_BASE_URL } from "./config";
import { errorToast } from "./toastify";
import { handleApiError } from "./helper";
let is401ToastDisplayed = false;
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  timeout: 30000,

});

instance.interceptors.request.use(
  function (request) {
       const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
      request.headers['X-CSRF-TOKEN'] = csrfToken.content;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(null, async (error) => {
  const { status } = error.response;
  if ([404, 409, 400, 500].includes(status)) {
    throw error;
  } else if (status === 401 && !is401ToastDisplayed) {
    is401ToastDisplayed = true;
    errorToast("Token Expired. Please Login to Continue");
    setTimeout(() => {
      localStorage.removeItem("persist:curry_heaven_admin");
      window.location.href = "/";
    }, 2000);
  }
  throw error;
});
export const doGet = async (url, config) => {
  try {
    const response = await instance.get(url, config);

    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPost = async (url, data, config) => {
  try {
    const response = await instance.post(url, data, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPut = async (url, data, config) => {
  try {
    const response = await instance.put(url, data, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);

    throw error;
  }
};

export const doPatch = async (url, data, config) => {
  try {
    const response = await instance.patch(url, data, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);

    throw error;
  }
};

export const doDelete = async (url, config) => {
  try {
    const response = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
