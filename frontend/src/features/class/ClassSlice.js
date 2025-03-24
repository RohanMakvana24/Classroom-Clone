import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

// ~~ Create Class AsyncThunk ~~
export const createNewClass = createAsyncThunk(
  "create/class",
  async (classData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/create-class`,
        classData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ~ Delete Class AsyncThunk ~ //
export const deleteClass = createAsyncThunk("delete/class" , async(classId , {rejectWithValue} )=> {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/class/delete-class/${classId}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// ~~ Create Slice ~~
var classSlice = createSlice({
  name: "class",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    // ~ Create Class Rudecers ~
    builder.addCase(createNewClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewClass.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createNewClass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ~~~~~~~~~~~~ 👀 ~~~~~~~~~~~~ //

    // ~ Delete Class Rudecers ~
    builder.addCase(deleteClass.pending , (state)=>{
      state.loading = true;
    });
    builder.addCase(deleteClass.fulfilled , (state)=>{
      state.loading = false;
    });
    builder.addCase(deleteClass.rejected , (state , action) =>{
      state.loading = false;
      state.error = action.payload
    })
  },
});

export default classSlice = classSlice.reducer;
