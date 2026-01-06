export async function deleteProjectMember({ token, idUser, idProject }) {
  const response = await fetch(
    `http://localhost:8080/api/v1/analytics-project-members/${idProject}/${idUser}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при удалении эксперта");
  }

  return response.text();
}
