export async function fetchOverviewExpert({ token, id }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/experts/${id}/overview`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки специализаций");
  }

  return response.json();
}
