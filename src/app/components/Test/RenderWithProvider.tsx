import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import RepoList from "../RepoList";
import repoListReducer from "../../slices/RepoListSlice";
import { store } from "../../store";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

export default renderWithProviders;
