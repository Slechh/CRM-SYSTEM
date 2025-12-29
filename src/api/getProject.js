export async function getProject({ token, id }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/analytics-projects/${id}`,
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
