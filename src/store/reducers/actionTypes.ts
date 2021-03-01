import { PLOT_APPLY_SHEET, PLOT_SET_COLUMNS } from "../constants/plotConstants";

type PlotApplySheetAction = {
  type: typeof PLOT_APPLY_SHEET;
  payload: Record<string, Array<number | string>>;
};

type PlotSetCategories = {
  type: typeof PLOT_SET_COLUMNS;
  payload: string[];
};
export type PlotActionType = PlotApplySheetAction | PlotSetCategories;
