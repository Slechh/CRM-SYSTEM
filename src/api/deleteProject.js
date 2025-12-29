export async function deleteProject({ token, projectId }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/analytics-projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при удалении проекта");
  }

  return response.text();
}
