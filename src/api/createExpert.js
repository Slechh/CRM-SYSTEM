export async function createExpert({ token, data }) {
  const response = await fetch(
    "http://localhost:8080/api/v1/experts/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        specializationId: Number(data.specializationId),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при создании эксперта");
  }

  return response.json();
}