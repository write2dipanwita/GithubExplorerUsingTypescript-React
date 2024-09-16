import { combineEpics } from 'redux-observable';
import ValidateTokenEpic from './epics/ValidateTokenEpic';
import GetRepositoriesEpic from './epics/GetRepositoriesEpic';
import fetchRepositoryDetailsEpic from './epics/GetRepositoryDetailsEpic';

export const rootEpic = combineEpics(
    ValidateTokenEpic,GetRepositoriesEpic,fetchRepositoryDetailsEpic
  
);
