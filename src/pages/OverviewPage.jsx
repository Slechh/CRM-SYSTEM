import clsx from "clsx";
import { UiPanel } from "../uikit/UiPanel";
import { useOverview } from "../hooks/useOverview";
import { Outlet, useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { OverviewHeader } from "../components/overview/OverviewHeader";
import { OverviewMainInfo } from "../components/overview/OverviewMainInfo";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UiFieldSet } from "../uikit/UiFieldSet";

export function OverviewPage({ className }) {
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const { id } = useParams();
  const { userInfo, userLoading, setUserInfo } = useOverview(id);

  const buttons = [
    { id: "overview", name: "Overview" },
    { id: "cv", name: "CV" },
    { id: "attachment", name: "Attachment" },
  ];

  if (userLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className={clsx("flex flex-col pb-7 h-full", className)}>
      <h1 className="font-bold text-4xl">Employee overview</h1>
      <div className="flex mt-7 gap-8">
        <div className="h-full">
          <UiPanel>
            <OverviewHeader userInfo={userInfo} />
            <OverviewMainInfo
              userInfo={userInfo}
              isBtnClicked={isBtnClicked}
              handleBtnClick={() => setIsBtnClicked((prev) => !prev)}
            />
          </UiPanel>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-center">
            <div className="flex w-[455px] bg-overviewSwitcher p-1 rounded-2xl gap-1">
              {buttons.map((value) => {
                return (
                  <NavLink
                    key={value.id}
                    to={value.id === "overview" ? "" : value.id}
                    end={value.id === "overview"}
                    className={({ isActive }) =>
                      clsx(
                        "flex flex-1 items-center justify-center rounded-2xl py-2 transition-all duration-300",
                        isActive && "bg-bgNavBlock text-bgApp font-bold"
                      )
                    }
                  >
                    {value.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col bg-bgBlock rounded-3xl p-6 mt-6">
            <Outlet context={{ userInfo, setUserInfo }} />
          </div>
        </div>
      </div>
    </div>
  );
}
