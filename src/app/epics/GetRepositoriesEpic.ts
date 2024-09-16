import { Epic,ofType } from "redux-observable";
import { catchError, from, map, of, switchMap } from "rxjs";
import { RootState } from '../store';
import { Action } from 'redux';
import { fetchRepositoriesFailure, fetchRepositoriesRequest, fetchRepositoriesSuccess } from "../slices/RepoListSlice";
import { getRepositoryListQuery } from "../graphql/get_repository_list_query";
import { CONFIG } from "../config/config";
import { apiClient } from "../utils/apiClient";


const GetRepositoriesEpic: Epic<Action, Action, RootState> = (action$:any, state$) => {
  return action$.pipe(
    // Listen for the `fetchRepositoriesRequest` action type to trigger this epic
    ofType(fetchRepositoriesRequest.type),
    // Perform switchMap to handle side effects (API call) and switch to a new observable
    switchMap((action: { payload:  {isPrev:boolean ,isNext:boolean} }) => {
      const state = state$.value as RootState;
      const token = state.token.token?.token; 
      const isPrev = action.payload.isPrev;
      const isNext = action.payload.isNext;
      
      // Define variables to store pagination details
      const variables:any = {  };
      
      if(!isPrev && !isNext)
      {
        variables.first = CONFIG.PerPageListingCount;
      }
      else if (isPrev && !isNext) {
        variables.last = CONFIG.PerPageListingCount;
        variables.beforeCursor=state.repoList.startCursor;
      }
      else {
        variables.first = CONFIG.PerPageListingCount;
        variables.afterCursor=state.repoList.endCursor;
      }
    
      // Perform the API call to fetch repositories using the GraphQL query and variables
      return from(apiClient(token || "", getRepositoryListQuery,variables)).pipe(
        map((result) => {
          const { edges, pageInfo } = result.search;
          const repoListToDisplay= edges.map((edge: any) => edge.node);
          const sortedList =  repoListToDisplay.sort((a: { stargazerCount: number; }, b: { stargazerCount: number; }) => b.stargazerCount - a.stargazerCount);
          // Dispatch the success action with the sorted repositories and pagination info
          return (fetchRepositoriesSuccess({  repository: {
            repos: sortedList,
            hasNextPage:pageInfo.hasNextPage,
            endCursor: pageInfo.endCursor,
            hasPrevPage:pageInfo.hasPreviousPage,
            startCursor:pageInfo.startCursor,
            loading: false,
            error: null,
            selectedRepoId: null
          }, 
          }));
        }),
        catchError((error) => {
          return of(fetchRepositoriesFailure(error.message));
        })
      );
    })
  );
};


export default GetRepositoriesEpic;
