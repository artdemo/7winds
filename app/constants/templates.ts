import { CIWData } from "../types";

export const rowTemplate: CIWData = {
  id: -1,
  parentId: null,
  grandParentId: null,
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,
  total: 0,
};

export const options = [
  { name: 'First name', value: 1 },
  { name: 'Second name', value: 2 },
  { name: 'Third name', value: 3 },
];

export const menuItems = [
  { label: 'По проекту', value: 'placeholder', title: 'По проекту' },
  { label: 'Объекты', value: 'placeholder', title: 'Объекты' },
  { label: 'РД', value: 'placeholder', title: 'РД' },
  { label: 'МТО', value: 'placeholder', title: 'МТО' },
  { label: 'СМР', value: 'ciw', title: 'Строительно-монтажные работы' },
  { label: 'График', value: 'placeholder', title: 'График' },
  { label: 'МиМ', value: 'placeholder', title: 'МиМ' },
  { label: 'Рабочие', value: 'placeholder', title: 'Рабочие' },
  { label: 'Капвложения', value: 'placeholder', title: 'Капвложения' },
  { label: 'Бюджет', value: 'placeholder', title: 'Бюджет' },
  { label: 'Финансирование', value: 'placeholder', title: 'Финансирование' },
  { label: 'Панорамы', value: 'placeholder', title: 'Панорамы' },
  { label: 'Камеры', value: 'placeholder', title: 'Камеры' },
  { label: 'Поручения', value: 'placeholder', title: 'Поручения' },
  { label: 'Контрагенты', value: 'placeholder', title: 'Контрагенты' },
];
