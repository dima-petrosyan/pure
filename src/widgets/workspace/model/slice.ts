import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
  title: "",
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    createWorkspace: (action) => {},
  },
});

export const { createWorkspace } = workspaceSlice.actions;
