import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RepoListState } from '../Types';

const initialState: RepoListState = {
  repos: [],
  loading: false,
  error: null,
  endCursor: null,
  hasNextPage: false,
  hasPrevPage: false,
 selectedRepoId:null,
  startCursor: null
};

const ReposListSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    fetchRepositoriesRequest(state, action: PayloadAction< {isPrev : boolean,isNext:boolean}>) {
      state.loading = true;
      state.error = null;
    },
    fetchRepositoriesSuccess(state, action: PayloadAction<{ repository: RepoListState }>) {
      
      state.repos = action.payload.repository.repos;
      state.endCursor = action.payload.repository.endCursor;
      state.startCursor = action.payload.repository.startCursor;
      state.hasNextPage = action.payload.repository.hasNextPage;
      state.hasPrevPage = action.payload.repository.hasPrevPage;
      state.loading = false;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<string>) {
      //state.error = action.payload;
      state.error = "Error while displaying repositories. Kindly change the API token and try again.";
      state.loading = false;
    },
    setRepositoryId(state, action: PayloadAction<{ repoId: string }>) {
      state.selectedRepoId = action.payload.repoId;
    },
    clearRepositories(state){
      state.repos = null;
      state.endCursor = null;
      state.startCursor = null;
      state.hasNextPage = false;
      state.hasPrevPage = false;
      state.loading = false;
      state.selectedRepoId =null;
      state.error = null;
    }
  },
});

export const { fetchRepositoriesRequest, fetchRepositoriesSuccess, fetchRepositoriesFailure, setRepositoryId ,clearRepositories} = ReposListSlice.actions;
export default ReposListSlice.reducer;
