import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useProjects } from "../hooks/useProjects";
import { AnalyticsSelect } from "../components/analytics/AnalyticsSelect";
import { Spinner } from "../components/Spinner";
import { getProjectMembers } from "../api/getProjectMembers";
import { AnalyticsTypeSelect } from "../components/analytics/AnakyticsTypeSelect";

const ROLE_COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];

export function AnalyticsPage() {
  const { projects, projectsLoading } = useProjects();

  const [selectedProject, setSelectedProject] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [chartType, setChartType] = useState("bar");

  const actualSelectedProject = useMemo(
    () => selectedProject ?? projects[0] ?? null,
    [selectedProject, projects]
  );

  useEffect(() => {
    if (!actualSelectedProject?.id) return;

    let cancelled = false;

    async function loadProjectMembers() {
      setMembersLoading(true);
      try {
        const token = sessionStorage.getItem("authToken");
        const data = await getProjectMembers({
          token,
          id: actualSelectedProject.id,
        });

        if (!cancelled) {
          setProjectMembers(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load project members:", err);
          setProjectMembers([]);
        }
      } finally {
        if (!cancelled) {
          setMembersLoading(false);
        }
      }
    }

    loadProjectMembers();

    return () => {
      cancelled = true;
    };
  }, [actualSelectedProject?.id]);

  useEffect(() => {
    if (projectMembers.length === 0) {
      setChartData([]);
      setRoles([]);
      return;
    }

    const roleCount = projectMembers.reduce((acc, member) => {
      const role = member.role || "No role";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    if (chartType === "bar" || chartType === "horizontalBar") {
      const dataPoint = { name: "Роли" };
      Object.entries(roleCount).forEach(([role, count]) => {
        dataPoint[role] = count;
      });
      setChartData([dataPoint]);
    } else {
      const pieData = Object.entries(roleCount).map(([role, count]) => ({
        name: role,
        value: count,
      }));
      setChartData(pieData);
    }

    setRoles(Object.keys(roleCount));
  }, [projectMembers, chartType]);

  if (projectsLoading) {
    return <Spinner className="h-screen" />;
  }

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-400">
          Add projects to view analytics
        </div>
      </div>
    );
  }

  const renderChart = () => {
    if (!membersLoading && projectMembers.length === 0) {
      return (
        <div className="flex items-center justify-center w-full h-[300px]">
          <div className="text-xl text-gray-400">
            No employees on this project
          </div>
        </div>
      );
    }

    if (chartType === "bar") {
      return (
        <BarChart width={500} height={300} data={chartData} barSize={100}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            position={{ x: 500, y: 0 }}
          />
          <Legend />
          {roles.map((role, index) => (
            <Bar
              key={role}
              dataKey={role}
              fill={ROLE_COLORS[index % ROLE_COLORS.length]}
            />
          ))}
        </BarChart>
      );
    }

    if (chartType === "horizontalBar") {
      return (
        <BarChart
          width={500}
          height={300}
          data={chartData}
          layout="vertical"
          barSize={40}
        >
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={100} />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            position={{ x: 500, y: 0 }}
          />
          <Legend />
          {roles.map((role, index) => (
            <Bar
              key={role}
              dataKey={role}
              fill={ROLE_COLORS[index % ROLE_COLORS.length]}
            />
          ))}
        </BarChart>
      );
    }

    return (
      <div className="w-[500px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value, entry) => `${value} (${entry.payload.value})`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="flex-1 mt-7">
      <h1 className="text-4xl font-bold">Analytics</h1>

      <div className="flex justify-between bg-bgBlock rounded-3xl mt-5 p-6">
        {renderChart()}

        <div className="flex flex-col gap-3">
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              {actualSelectedProject && (
                <div className="text-xl font-bold ml-1.5">Выбран проект:</div>
              )}
              <AnalyticsSelect
                projects={projects}
                selected={actualSelectedProject}
                onSelect={setSelectedProject}
              />
            </div>
            {!membersLoading && projectMembers.length === 0 ? (
              ""
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold ml-1.5">Тип графика:</div>
                <AnalyticsTypeSelect
                  selected={chartType}
                  onSelect={setChartType}
                />
              </div>
            )}
          </div>

          {membersLoading && (
            <div className="text-sm text-gray-400">Загрузка проекта…</div>
          )}
        </div>
      </div>
    </div>
  );
}
