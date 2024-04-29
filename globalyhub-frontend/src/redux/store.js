import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slice/clientSlice";


const store = configureStore({
  reducer: {
    clientState: clientReducer,


  },
});

export default store;
