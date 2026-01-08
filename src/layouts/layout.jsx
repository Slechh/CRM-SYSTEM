import { Outlet, NavLink } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sideBar";
import { NAVITEMS } from "../constants/navItems";
import {
  activeLinkChecker,
  renderNavLinkContent,
} from "../helpers/NavLinkHelper";
import { useAuth } from "../hooks/useAuth";

export function Layout() {
  const { user } = useAuth();
  const userRole = sessionStorage.getItem("userRole");
  const pagesWithoutAnalytics = NAVITEMS.filter(
    (pages) => pages.to !== "/analytics" && pages.to !== "/projects"
  );
  console.log(pagesWithoutAnalytics);
  const pagesToRender = userRole === "CEO" ? NAVITEMS : pagesWithoutAnalytics;

  return (
    <div className="flex items-start h-screen p-5 pr-10 gap-x-[30px] overflow-x-hidden">
      <div className="h-full">
        <Sidebar>
          {pagesToRender.map((item) => (
            <NavLink
              to={item.to}
              key={item.to}
              className={({ isActive }) => activeLinkChecker(isActive)}
            >
              {({ isActive }) => renderNavLinkContent(isActive, item)}
            </NavLink>
          ))}
        </Sidebar>
      </div>
      <div className="flex-1 flex flex-col">
        <Header currentUser={user} />
        <main className="flex-1 bg-bgApp">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
