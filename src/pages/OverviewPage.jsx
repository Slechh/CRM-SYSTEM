import clsx from "clsx";
import { UiPanel } from "../uikit/UiPanel";
import { useOverview } from "../hooks/useOverview";
import { Outlet, useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { OverviewHeader } from "../components/overview/OverviewHeader";
import { UiButton } from "../uikit/UiButton";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";

export function OverviewPage({ className }) {
  const { id } = useParams();
  const { userInfo, userLoading, setUserInfo } = useOverview(id);
  const navigate = useNavigate();

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
        <div>
          <div className="h-full">
            <UiPanel>
              <OverviewHeader userInfo={userInfo} />
            </UiPanel>
            <div className="flex items-center">
              <UiButton
                type="small"
                size="xs"
                onClick={() => navigate("/employees")}
              >
                <Icon id="arrow-left" className="w-5 h-5 text-black" />
              </UiButton>
              <h2 className="text-xl font-bold">Go back</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col bg-bgBlock rounded-3xl p-6">
            <Outlet context={{ userInfo, setUserInfo }} />
          </div>
        </div>
      </div>
    </div>
  );
}
