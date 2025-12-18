export async function fetchDeleteExpert({ token, id }) {
  const response = await fetch(`http://localhost:8080/api/v1/experts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при удалении эксперта");
  }

  return response.text();
}
