import axios from "axios";
import { errorToast, successToast } from "./toastify";

export const handleApiError = (error) => {
  if (axios.isCancel(error)) return;
  if (error.response?.data?.message) {
    return errorToast(error.response.data.message);
  } else if (
    error.response?.data?.errors &&
    error.response.data.errors.length > 0
  ) {
    const errorMessage = error.response.data.errors[0].message;
    return errorToast(errorMessage);
  }
  return errorToast("Something went wrong");
};