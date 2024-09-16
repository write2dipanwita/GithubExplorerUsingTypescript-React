import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  clearRepositoryDetails,
  fetchRepositoryDetailsFailure,
  fetchRepositoryDetailsRequest,
} from "../slices/RepositoryDetailsSlice";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../slices/HomeSlice";
import { format } from "date-fns";
import { clearRepositories } from "../slices/RepoListSlice";
const RepoDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { repo, issues, loading, error, hasNextPage, hasPrevPage } =
    useSelector((state: RootState) => state.repositoryDetails);

  const { selectedRepoId } = useSelector((state: RootState) => state.repoList);

  // On change API token clear data and navigating to the home page
  const handleChangeAPIToken = () => {
    batch(() => {
      dispatch(clearToken());
      dispatch(clearRepositories());
      dispatch(clearRepositoryDetails());
    });
    navigate("/");
  };
  // Fetch the next page of repository issues
  const fetchNextPage = () => {
    if (hasNextPage) {
      dispatch(fetchRepositoryDetailsRequest({ isNext: true, isPrev: false }));
    }
  };
  // Fetch the previous page of repository issues
  const fetchPreviousPage = () => {
    if (hasPrevPage) {
      dispatch(fetchRepositoryDetailsRequest({ isPrev: true, isNext: false }));
    }
  };
  // Fetch the details of the selected repository when selectedRepoId changes
  useEffect(() => {
    dispatch(
      fetchRepositoryDetailsRequest({
        isPrev: false,
        isNext: false,
      })
    );
  }, [selectedRepoId, dispatch]);

  return (
    <div className="container my-4">
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
            <h1 className="mb-0">Repositories Details</h1>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChangeAPIToken}
            >
              Change API Token
            </button>
          </div>

          {repo && (
            <div className="mb-4">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">{repo.name}</h2>
                </div>
                <div className="card-body">
                  <p className="card-text">{repo.description}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="h4 mb-3">Issues</h2>
            {issues.length === 0 ? (
              <p className="text-muted">No issues available</p>
            ) : (
              <ul className="list-group">
                {issues.map((issue) => (
                  <li
                    key={issue.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <strong>{issue.title}</strong>
                    <span className="text-muted">
                      {format(new Date(issue.createdAt), "MMM d, yyyy h:mm a")}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="d-flex justify-content-between mt-4">
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
          </div>
        </>
      )}
    </div>
  );
};

export default RepoDetails;
