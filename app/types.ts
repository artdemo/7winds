export type MenuItemData = {
  label: string;
  value: string;
  title: string;
};

export interface CIW {
  id: number;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  total: number;
  supportCosts: number;
}
export interface CIWCreateRequest extends CIW {
  parentId: number | null;
}
export interface CIWData extends CIWCreateRequest {
  grandParentId: number | null;
}

export type CIWToRender = Pick<
  CIW,
  'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'
>;

export type CIWUpdateRequest = Omit<CIW, 'total' | 'id'>;

export type MenuItemsProps = {
  label: string;
  values: MenuValues;
  title: string;
};

export type MenuValues = 'ciw';
