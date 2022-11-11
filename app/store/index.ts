import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { projectsReducer } from './reducers/projects';

const combinedReducer = combineReducers({
  projects: projectsReducer,
});

export const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type StateType = ReturnType<typeof store.getState>;
