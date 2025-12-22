export async function updateExpert({ token, expertData, expertId }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/experts/${expertId}/overview`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expertData),
    }
  );
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }

  return response.json();
}
