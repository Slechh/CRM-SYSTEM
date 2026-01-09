import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardWorkload } from "../components/dashboard/DashboardWorkload";
import { useExperts } from "../hooks/useExperts";
import { Spinner } from "../components/Spinner";
import { DashboardNearestEvents } from "../components/dashboard/DashboardNearestEvents";
import { DashboardProjects } from "../components/dashboard/DashboardProjects";
export function DashboardPage() {
  const { users, loading } = useExperts();

  if (loading) {
    return <Spinner className="h-screen" />;
  }
  return (
    <div className="flex-1 flex-col mt-7">
      <DashboardHeader />
      <div className="flex mt-7 flex-col gap-5">
        <div className="flex gap-[40px]">
          <DashboardWorkload users={users} />
          <DashboardNearestEvents />
        </div>
        <div className="flex gap-[40px]">
          <DashboardProjects />
        </div>
      </div>
    </div>
  );
}
