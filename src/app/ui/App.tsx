import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";

/**
 * Root layout: persistent header + routed page content via `<Outlet />`.
 * This is the `element` on the root (parent) route, so every child route
 * renders inside the header.
 */
export const App = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};
