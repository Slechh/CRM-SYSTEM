export async function getFiles({ token, expertId }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/files/expert/${expertId}`,
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
