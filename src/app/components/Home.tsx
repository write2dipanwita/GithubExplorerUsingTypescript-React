import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, validateToken, resetError } from "../slices/HomeSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { CONFIG } from "../config/config";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newToken, setLocalToken] = useState<string>("");

  const { isValid, error } = useSelector((state: RootState) => state.token);

  // Handle form submission, dispatching token validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(validateToken(newToken));
  };

  // Effect hook to navigate to the repository page when the token is valid
  useEffect(() => {
    if (isValid) {
      dispatch(setToken(newToken));
      navigate("/repositories");
    }
  }, [isValid, newToken, dispatch, navigate]);

  // Handle changes in the input field and reset any previous errors
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalToken(e.target.value);
    dispatch(resetError());
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded bg-light shadow-sm text-center"
          >
            <h1 className="font-weight-bold mb-4">GitHub Explorer</h1>
            <p className="mb-4">
              Enter your API token to start browsing issues of public
              repositories:
            </p>
            <div className="form-group text-left">
              <label htmlFor="apiToken" className="font-weight-bold">
                Your API Token
              </label>
              <div>
                <input
                  id="apiToken"
                  type="text"
                  className="form-control"
                  value={newToken}
                  onChange={handleInputChange}
                  placeholder="Enter your token here"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Start Browsing
            </button>
            {error && (
              <div className=" alert alert-danger  mt-3" role="alert">
                {error}
                <div>
                  <Link to={CONFIG.GeneratePersonalToken}>
                    Git Hub Documentation
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
