import { Outlet } from "react-router";

export const Main = () => {
  return (
    <main className="bg-background-root flex-1 overflow-y-auto p-4">
      <Outlet />
    </main>
  );
};
