export async function createProject({ token, data }) {
  console.log({ ...data, budgetUsd: Number(data.budgetUsd) });
  const response = await fetch(
    "http://localhost:8080/api/v1/analytics-projects",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        budgetUsd: Number(data.budgetUsd),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при создании проекта");
  }

  return response.json();
}
