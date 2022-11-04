import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { projectsReducer } from './reducers/projects';

// const preloadedState = {
//   projects: {
//     1: {
//       ciw: [
//         {
//           id: 1,
//           parentId: null,
//           grandParentId: null,
//           rowName: 'Южная строительная площадка',
//           salary: 20348,
//           equipmentCosts: 1750,
//           overheads: 108.07,
//           estimatedProfit: 1209000,
//         },
//         {
//           id: 2,
//           parentId: 1,
//           grandParentId: null,
//           rowName: 'Южная строительная площадка',
//           salary: 20348,
//           equipmentCosts: 1750,
//           overheads: 108.07,
//           estimatedProfit: 1209000,
//         },
//         {
//           id: 3,
//           parentId: 1,
//           grandParentId: 2,
//           rowName: 'Южная строительная площадка',
//           salary: 20348,
//           equipmentCosts: 1750,
//           overheads: 108.07,
//           estimatedProfit: 1209000,
//         },
//         {
//           id: 4,
//           parentId: null,
//           grandParentId: null,
//           rowName: 'Folder',
//           salary: 20348,
//           equipmentCosts: 1750,
//           overheads: 108.07,
//           estimatedProfit: 1209000,
//         },
//       ],
//     },
//   },
// };

const combinedReducer = combineReducers({
  projects: projectsReducer,
});

export const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type StateType = ReturnType<typeof store.getState>;
