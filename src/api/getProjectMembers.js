export async function getProjectMembers({ token, id }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/analytics-project-members/project/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки проектов");
  }

  return response.json();
}
