
export interface GraphQLVariables {
  [key: string]: any;
}
interface Token {
token:string;
}

interface Owner {
  login: string;
}
export interface Repository{
  id: string;
  name: string;
  owner : Owner;
  description : string;
  stargazerCount : number;

}
interface Issues  {
  id: string;
  title: string;
  createdAt: string;
  totalCount:number;
}

export interface TokenState {
    token:Token |null;
    isValid : boolean;
    error:string|null;
}

export interface RepoListState {
    repos: Repository[] | null;
    loading: boolean;
    error: string | null;
    hasNextPage:boolean;
    endCursor:string|null;
    hasPrevPage:boolean;
    startCursor:string|null;
    selectedRepoId : string |null;
}

export interface RepoDetailsState {
  repo : Repository|null;
  issues : Issues[];
  loading:boolean;
  error:string|null;
  hasNextPage:boolean;
  endCursor:string|null;
  hasPrevPage:boolean;
  startCursor:string|null;
}