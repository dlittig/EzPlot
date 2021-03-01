import { PLOT_APPLY_SHEET, PLOT_SET_COLUMNS } from "../constants/plotConstants";
import { PlotActionType } from "./actionTypes";

export type PlotState = {
  sheet: Record<string, Array<number | string>>;
  selectedColumns: string[];
};

const initialState: PlotState = {
  sheet: {},
  selectedColumns: [],
};

export const plotReducer = (
  state = initialState,
  action: PlotActionType
): PlotState => {
  let newState: PlotState | null = null;
  let sheet;
  let columns;

  switch (action.type) {
    case PLOT_APPLY_SHEET:
      sheet = action.payload;
      newState = { ...state, sheet };

      return newState;
    case PLOT_SET_COLUMNS:
      columns = action.payload;
      newState = { ...state, selectedColumns: columns };

      return newState;
    default:
      return state;
  }
};
