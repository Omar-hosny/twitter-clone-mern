import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router";

interface Props {
  children: React.ReactNode;
}
const PublicRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Navigate to="/" />
  ) : (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default PublicRoute;
