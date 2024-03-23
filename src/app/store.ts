import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import { workspaceSlice } from "widgets/workspace/model";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [workspaceSlice.name]: workspaceSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
