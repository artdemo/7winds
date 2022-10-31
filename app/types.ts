export type Option = {
  name: string;
  id: number;
};

export type MenuItemData = {
  label: string;
  value: string;
  title: string;
};

export type CIWData = {
  id: number;
  folderId: number | null;
  subFolderId: number | null;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
};
