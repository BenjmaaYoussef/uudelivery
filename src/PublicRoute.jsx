import { getUser } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";
import Root from "./routes/root";
export const PublicRoute = () => {
  const user = getUser();
  return user ? <Navigate to="/" /> : <Outlet />;
};
