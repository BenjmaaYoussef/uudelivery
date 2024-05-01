import { getUser } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";
import Root from "./routes/root";
export const PrivateRoutes = () => {
  const user = getUser();
  return user ? <Root /> : <Navigate to="/login" />;
};
