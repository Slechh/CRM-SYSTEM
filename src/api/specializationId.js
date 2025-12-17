export async function fetchSpecializations({ token }) {
    console.log(token);
  const response = await fetch(
    "http://localhost:8080/api/v1/experts/specializations/all",
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
