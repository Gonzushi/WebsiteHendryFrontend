import { Outlet } from "react-router-dom";

export default function PortfolioLayout() {
  return (
    <>
      <div>Halo</div>

      <main className="">
        <Outlet />
      </main>
    </>
  );
}
