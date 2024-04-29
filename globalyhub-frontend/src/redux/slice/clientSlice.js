import { createSlice } from "@reduxjs/toolkit";
import { deleteClient, editClient, getClient, getClientById, insertClient } from "../thunk/clientThunk";
const initialState = {
  data: [],
  dataById:[],
  loading: false,
  error: null,

};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetDataById:(state)=>{
      state.dataById=[]
    }
  },
  extraReducers: (builder) => {
    builder
      //!Fetch
      .addCase(getClient.pending, (state) => {
        state.loading = true;
        state.error = null;
     
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload;
     
        state.error = null;
      
      })
      .addCase(getClient.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch clients data";
        
      })
      .addCase(getClientById.pending, (state) => {
        state.loading = true;
        state.error = null;
     
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.loading = false;

        state.dataById = action.payload;
     
        state.error = null;
      
      })
      .addCase(getClientById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch clients data";
        
      })
      .addCase(insertClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [action.payload, ...state.data];
        state.error = null;
      })
      .addCase(insertClient.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to insert client data";
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;

        state.data = state.data.filter((i) => i._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteClient.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete client data";
      })
      //!Edit
      .addCase(editClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((i) =>
          i._id === action.payload._id ? { ...i, ...action.payload } : i
        );
        state.error = null;
      })

      .addCase(editClient.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to edit client data";
      });
  },
});

export const { resetDataById } = clientSlice.actions;
export default clientSlice.reducer;
