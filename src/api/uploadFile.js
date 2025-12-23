export async function uploadFiles({ token, file, id }) {
    console.log(id);
  const formData = new FormData();
  formData.append("file", file); 

  const response = await fetch(
    `http://localhost:8080/api/v1/files/upload/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }

  return response.json();
}
