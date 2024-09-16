import { Epic, ofType } from "redux-observable";
import { validateToken, validateTokenFailure, validateTokenSuccess } from "../slices/HomeSlice";
import { catchError, from, switchMap, of, map } from "rxjs";
import { validateTokenQuery } from "../graphql/validate_token_query";
import { RootState } from '../store';
import { Action } from 'redux';
import { apiClient } from "../utils/apiClient";

const ValidateTokenEpic: Epic<Action, Action, RootState> = (action$:any) => {
  return action$.pipe(
    ofType(validateToken.type),
    switchMap((action: { payload: string }) => {
      const token: string = action.payload;

      return from(apiClient(token, validateTokenQuery)).pipe(
        map((result) => {
          const isValid = result?.viewer; 
          
          if (isValid) {
            // Dispatch success action with the token
            return validateTokenSuccess({ token });
          } else {
            return validateTokenFailure("Invalid token");
          }
        
        }),
        catchError((error) => {
          // Dispatch failure action with the error message
          return of(validateTokenFailure(error.message));
        })
      );
    })
  );
};

export default ValidateTokenEpic;
