import { combineReducers, createStore } from "redux";

import reducers, { RootReducerType } from "./reducers";

const combinedReducer = combineReducers(reducers);

const initialState: RootReducerType = {
  plotReducer: { sheet: {} },
};

const store = createStore(combinedReducer, initialState);

export { store };
