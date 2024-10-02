import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "./RenderWithProvider";
import RepoDetails from "../RepoDetails";

describe("RepoDetails", () => {
  it("Render repodetails", () => {
    renderWithProviders(<RepoDetails />);
    expect(screen.getByText("Repositories Details")).toBeInTheDocument();
  });
});
