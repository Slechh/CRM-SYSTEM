export async function getAllProjects({ token }) {
  console.log(token)
  const response = await fetch(
    "http://localhost:8080/api/v1/analytics-projects/all",
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
