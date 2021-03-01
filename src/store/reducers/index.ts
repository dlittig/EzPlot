import { plotReducer, PlotState } from "./plotReducers";
export type RootReducerType = {
  plotReducer: PlotState;
};

const RootReducer = {
  plotReducer,
};

export default RootReducer;
