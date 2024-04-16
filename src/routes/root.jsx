import Header from "@/ui/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function Root() {
  return (
    <>
      <Header window={window} />
      <Outlet />
      <Toaster />
    </>
  );
}
