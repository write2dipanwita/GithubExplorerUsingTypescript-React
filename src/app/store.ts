import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createEpicMiddleware,EpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';
import tokenReducer from './slices/HomeSlice';
import reposListReducer from './slices/RepoListSlice';
import repoDetailsReducer from './slices/RepositoryDetailsSlice';
import authReducer from './slices/AuthSlice';
import { composeWithDevTools } from 'redux-devtools-extension'; 

const epicMiddleware: EpicMiddleware<any, any, any> = createEpicMiddleware(); 


export const store = configureStore({
  reducer: {
    token: tokenReducer,
    repoList : reposListReducer,
    repositoryDetails: repoDetailsReducer,
    auth :authReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,   
    }).concat(epicMiddleware as Middleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

