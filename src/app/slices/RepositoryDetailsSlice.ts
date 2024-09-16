import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepoDetailsState } from '../Types';

const initialState: RepoDetailsState = {
  repo: {
    id: '',
    name: '',
    owner: { login: '' },
    description: '',
    stargazerCount: 0
  },
  loading: false,
  error: null,
  issues: [],
  hasNextPage: false,
  endCursor: null,
  hasPrevPage: false,
  startCursor:null
};

const RepoDetailsSlice = createSlice({
  name: 'repositoryDetails',
  initialState,
  reducers: {
    fetchRepositoryDetailsRequest(state, action: PayloadAction<{isPrev : boolean,isNext:boolean }>) {
      state.loading = true;
      state.error = null;
    },
    fetchRepositoryDetailsSuccess(
      state,
      action: PayloadAction<{ repository: RepoDetailsState}>
    ) {
      state.repo = action.payload.repository.repo;
      state.issues = action.payload.repository.issues;
      state.hasNextPage = action.payload.repository.hasNextPage;
      state.endCursor = action.payload.repository.endCursor;
      state.hasPrevPage = action.payload.repository.hasPrevPage;
      state.startCursor = action.payload.repository.startCursor;
      state.loading = false;
      state.error = null;
    },
    fetchRepositoryDetailsFailure(state, action: PayloadAction<string>) {
      //state.error = action.payload;
      state.error = "Error while displaying repository details. Kindly change the API token and try again.";
      state.loading = false;
    },
    clearRepositoryDetails(state){
      state.repo =null;
      state.issues =[];
      state.loading=false;
      state.error=null
      state.hasNextPage=false;
      state.endCursor=null;
      state.hasPrevPage=false;
      state.startCursor=null;
    }
  },
});

export const {
  fetchRepositoryDetailsRequest,
  fetchRepositoryDetailsSuccess,
  fetchRepositoryDetailsFailure,
  clearRepositoryDetails
} = RepoDetailsSlice.actions;

export default RepoDetailsSlice.reducer;
