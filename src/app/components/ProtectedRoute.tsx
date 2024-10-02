import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router-dom";

interface props {
  redirectPath: string;
}
const ProtectedRoute: React.FC<props> = ({ redirectPath }) => {
  const isAut = useSelector((state: RootState) => state.auth);
  console.log(isAut);
  return isAut ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
