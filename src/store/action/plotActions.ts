import { PLOT_APPLY_SHEET } from "../constants/plotConstants";
import { ActionType } from "./types";

export const applySheet = (
  sheet: Record<string, Array<number | string>>
): ActionType => ({
  type: PLOT_APPLY_SHEET,
  payload: sheet,
});

export const setColumns = (columns: string[]): ActionType => ({
  type: PLOT_APPLY_SHEET,
  payload: columns,
});
