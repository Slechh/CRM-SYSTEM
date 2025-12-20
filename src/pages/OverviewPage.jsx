import clsx from "clsx";
import { UiPanel } from "../uikit/UiPanel";
import { useOverview } from "../hooks/useOverview";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { OverviewHeader } from "../components/overview/OverviewHeader";
import { OverviewMainInfo } from "../components/overview/OverviewMainInfo";

export function OverviewPage({ className }) {
  const { id } = useParams();
  const { userInfo, userLoading } = useOverview(id);

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
            <OverviewMainInfo userInfo={userInfo} />
          </UiPanel>
        </div>
      </div>
    </div>
  );
}
