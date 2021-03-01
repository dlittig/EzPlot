type SetCategoriesType = {
  type: string;
  payload: string[];
};

type ApplySheetType = {
  type: string;
  payload: Record<string, (string | number)[]>;
};

export type ActionType = SetCategoriesType | ApplySheetType;
