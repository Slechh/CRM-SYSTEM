import { Outlet, NavLink } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sideBar";
import { NAVITEMS } from "../constants/navItems";
import {
  activeLinkChecker,
  renderNavLinkContent,
} from "../helpers/NavLinkHelper";

export function Layout() {
  return (
    <div className="flex h-screen p-5 pr-10 gap-x-[30px] overflow-x-hidden">
      <Sidebar>
        {NAVITEMS.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({ isActive }) => activeLinkChecker(isActive)}
          >
            {({ isActive }) => renderNavLinkContent(isActive, item)}
          </NavLink>
        ))}
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-bgApp">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// export function Layout() {
//   return (
//     <div className="flex h-screen p-5">
//       <Sidebar>
//         {NAVITEMS.map((item) => (
//           <NavLink
//             to={item.to}
//             key={item.to}
//             className={({ isActive }) => activeLinkChecker(isActive)}
//           >
//             {({ isActive }) => renderNavLinkContent(isActive, item)}
//           </NavLink>
//         ))}
//       </Sidebar>

//       <div className="flex-1 flex flex-col min-w-0 ml-[30px] mr-5">
//         {" "}
//         {/* margin вместо gap */}
//         <Header />
//         <main className="flex-1 bg-bgApp">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
