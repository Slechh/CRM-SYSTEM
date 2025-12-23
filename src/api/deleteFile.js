export async function fetchDeleteExpert({ token, fileId }) {
  const response = await fetch(`http://localhost:8080/api/v1/files/${fileId}`, {
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
