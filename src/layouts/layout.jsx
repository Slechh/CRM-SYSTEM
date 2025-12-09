import { Outlet, NavLink } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout() {
  return (
    <div className="flex h-screen pl-5 pr-10 pt-5 pb-8 gap-x-[30px] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-[200px] bg-[#222] text-white p-5">
        <NavLink to="/dashboard" className="text-white block mb-2">
          Dashboard
        </NavLink>
        <NavLink to="/employees" className="text-white block">
          Employees
        </NavLink>
      </aside>

      {/* Правая часть: Header + Main */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 bg-bgApp overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}