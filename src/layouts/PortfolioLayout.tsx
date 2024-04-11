import { Outlet } from "react-router-dom";

export default function PortfolioLayout() {
  return (
    <>
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
