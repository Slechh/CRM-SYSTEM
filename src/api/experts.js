export async function fetchExperts({ token, filters = {} }) {
  const response = await fetch("http://localhost:8080/api/v1/experts/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(filters),
  });
  console.log();

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }

  return response.json();
}
