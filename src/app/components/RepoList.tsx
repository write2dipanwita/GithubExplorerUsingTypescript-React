import React, { useEffect, useRef } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  clearRepositories,
  fetchRepositoriesRequest,
  setRepositoryId,
} from "../slices/RepoListSlice";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../slices/HomeSlice";
import { Repository } from "../Types";
import { clearRepositoryDetails } from "../slices/RepositoryDetailsSlice";

const RepoList = () => {
  const dispatch = useDispatch();
  const {
    repos,
    loading,
    error,
    endCursor,
    startCursor,
    hasNextPage,
    hasPrevPage,
  } = useSelector((state: RootState) => state.repoList);

  // To prevent fetching data multiple times
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  // Fetch repository list
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchRepositoriesRequest({ isPrev: false, isNext: false }));
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Function to fetch the next page of repositories if available
  const fetchNextPage = () => {
    if (hasNextPage && endCursor) {
      dispatch(fetchRepositoriesRequest({ isNext: true, isPrev: false }));
    }
  };

  // Function to fetch the previous page of repositories if available
  const fetchPreviousPage = () => {
    if (hasPrevPage && startCursor) {
      dispatch(fetchRepositoriesRequest({ isPrev: true, isNext: false }));
    }
  };
  // On change API token clear data and navigating to the home page
  const handleChangeAPIToken = () => {
    batch(() => {
      dispatch(clearToken());
      dispatch(clearRepositories());
      dispatch(clearRepositoryDetails());
    });
    navigate("/");
  };

  // Function to fetch repository details when the "Details" button is clicked
  const fetchRepoDetails = (repoItem: Repository) => {
    dispatch(setRepositoryId({ repoId: repoItem.id }));
    navigate(`/${repoItem.owner.login}/${repoItem.name}`);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="container mt-4">
        {/* Bootstrap loading spinner */}
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-50"
            style={{ zIndex: 10 }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error ? (
          <div className="alert alert-danger text-center">
            Error: {error} <br />
            <button
              className="btn btn-danger mt-3"
              onClick={handleChangeAPIToken}
            >
              Change API Token
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Repositories List</h1>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleChangeAPIToken}
              >
                Change API Token
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Repository Name</th>
                    <th>Owner</th>
                    <th>Stargazer Count</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {repos?.map((repo) => (
                    <tr key={repo.id}>
                      <td>{repo.name}</td>
                      <td>{repo.owner.login}</td>
                      <td>{repo.stargazerCount}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => fetchRepoDetails(repo)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between mt-1 mb-4">
              <button
                className="btn btn-secondary"
                onClick={fetchPreviousPage}
                disabled={!hasPrevPage}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={fetchNextPage}
                disabled={!hasNextPage}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default RepoList;
