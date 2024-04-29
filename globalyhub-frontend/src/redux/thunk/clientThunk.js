import { createAsyncThunk } from "@reduxjs/toolkit";
import { doDelete, doGet,  doPost, doPut } from "../../utils/axios";

export const getClient = createAsyncThunk("getClient", async () => {
  try {
    const response = await doGet(`/clients`);
    return response;
  } catch (error) {
    throw error;
  }
});

export const getClientById = createAsyncThunk("getClientById", async (id) => {
  try {
    const response = await doGet(`/clients/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
});

export const insertClient = createAsyncThunk(
  "insertClient",
  async ({ data, callback }) => {
  
    try {
      const response = await doPost(`/clients`, data)
      callback && callback();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const editClient = createAsyncThunk(
  "editClient",
  async ({ data, callback, id }) => {
    try {
      const response = await doPut(`/clients/${id}`, data);
      callback && callback();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteClient = createAsyncThunk(
  "deleteClient",
  async ({ id, callback }) => {
    try {
      await doDelete(`/clients/${id}`);
      callback && callback();
      return id;
    } catch (error) {
      throw error;
    }
  }
);
