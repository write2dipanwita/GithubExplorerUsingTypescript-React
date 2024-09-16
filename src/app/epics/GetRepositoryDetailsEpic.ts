import { Epic, ofType } from 'redux-observable';
import { of, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  fetchRepositoryDetailsRequest,
  fetchRepositoryDetailsSuccess,
  fetchRepositoryDetailsFailure,
} from '../slices/RepositoryDetailsSlice';
import { getRepositoryDetails } from '../graphql/fetch_repository_details_query';
import { RootState } from '../store';
import { Action } from 'redux';
import { CONFIG } from '../config/config';
import { apiClient } from '../utils/apiClient';

const GetRepositoryDetailsEpic: Epic<Action, Action, RootState> = (action$:any, state$) => {
  return action$.pipe(
    // Listen for the `fetchRepositoryDetailsRequest` action type
    ofType(fetchRepositoryDetailsRequest.type),
    // Perform switchMap to handle side effects (API call) and switch to a new observable
    switchMap((action: { payload:  {isPrev:boolean ,isNext:boolean} }) => {

      const state = state$.value as RootState;
      const repoId = state.repoList.selectedRepoId;
      const token = state.token.token?.token; 
      const isPrev = action.payload.isPrev;
      const isNext = action.payload.isNext;
      
       // Define variables to store pagination details
      const variables:any = { repoId };
      
      if(!isPrev && !isNext)
      {
        variables.first = CONFIG.PerPageListingCount;
      }
      else if (isPrev && !isNext) {
        variables.last = CONFIG.PerPageListingCount;
        variables.beforeCursor=state.repositoryDetails.startCursor;
      }
      else {
        variables.first = CONFIG.PerPageListingCount;
        variables.afterCursor=state.repositoryDetails.endCursor;
      }

      // Perform the API call to fetch repository details (with pagination info)
      return from(apiClient(token || "", getRepositoryDetails,variables)).pipe(
        map((result) => {
          const data = result.node;
          
          if (!data) {
            throw new Error("Repository data is missing in the response");
          }
          return (fetchRepositoryDetailsSuccess({
            
            repository: {
              issues: data.issues.edges.map((edge: any) => edge.node),
              hasNextPage: data.issues.pageInfo.hasNextPage,
              endCursor: data.issues.pageInfo.endCursor,
              hasPrevPage:data.issues.pageInfo.hasPreviousPage,
              startCursor:data.issues.pageInfo.startCursor,
              loading: false,
              error: null,
              repo: {
                name: data.name,
                id: data.id,
                owner: {
                  login: data.owner.login
                },
                description: data.description,
                stargazerCount: 0
              }
            },          
          }));
        }),
        // Handle any errors that occur during the API call
        catchError((error) => {
          return of(fetchRepositoryDetailsFailure(error.message));
        })
      );
    })
  );
};

export default GetRepositoryDetailsEpic;
