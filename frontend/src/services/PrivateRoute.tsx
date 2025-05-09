import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";
interface Props {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/sign-in" />;
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
