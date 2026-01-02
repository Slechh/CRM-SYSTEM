export async function addEmployeeToProject({ token, data }) {
  console.log(token);
  const response = await fetch(
    "http://localhost:8080/api/v1/analytics-project-members",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
}
