// src/app/components/Test/RepoList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import RepoList from "../RepoList";
import repoListReducer from "../../slices/RepoListSlice";

// Updated mock data to include all required properties
const mockData = {
  loading: false,
  repos: [
    {
      id: "1",
      name: "Repo1",
      owner: { login: "owner1" },
      description: "A sample repository",
      stargazerCount: 10,
    },
  ],
  error: null,
  hasNextPage: false,
  hasPrevPage: false,
  endCursor: null, // Added
  startCursor: null, // Added
  selectedRepoId: null, // Added
};

// Create a mock Redux store with the preloaded state
const mockStore = configureStore({
  reducer: {
    repoList: repoListReducer,
  },
  preloadedState: {
    repoList: mockData,
  },
});

// Helper function to render component with providers
const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={mockStore}>
      <Router>{ui}</Router>
    </Provider>
  );

describe("RepoList Component", () => {
  it("renders without crashing and displays repository data", () => {
    renderWithProviders(<RepoList />);

    // Check if the component renders correctly
    expect(screen.getByText("Repo1")).toBeInTheDocument();
    expect(screen.getByText("owner1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
