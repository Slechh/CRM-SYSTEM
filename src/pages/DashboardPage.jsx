import { useState, useEffect } from "react";

export function DashboardPage() {

}
//   const [formData, setFormData] = useState({
//     projectName: "",
//     description: "",
//     clientName: "",
//     status: "ACTIVE",
//     startDate: "",
//     endDate: "",
//     budgetUsd: "",
//     // createdByUserId: 2, // ID пользователя Valera Krutoi
//   });
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setResult(null);

//     try {
//       const dataToSend = {
//         ...formData,
//         budgetUsd: formData.budgetUsd ? parseInt(formData.budgetUsd) : null,
//       };

//       console.log("📤 Отправляем:", dataToSend);

//       const response = await fetch("http://localhost:8080/analytics-projects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(dataToSend),
//       });

//       console.log("📥 Статус:", response.status);

//       if (response.ok) {
//         const project = await response.json();
//         console.log("✅ Проект создан:", project);
//         setResult({
//           success: true,
//           message: `✅ Успех! Проект создан с ID: ${project.id}`,
//           data: project,
//         });
//       } else {
//         const errorText = await response.text();
//         console.error("❌ Ошибка:", errorText);
//         setResult({
//           success: false,
//           message: `❌ Ошибка ${response.status}: ${errorText}`,
//         });
//       }
//     } catch (error) {
//       console.error("❌ Сетевая ошибка:", error);
//       setResult({
//         success: false,
//         message: `❌ Ошибка соединения: ${error.message}`,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-3xl font-bold mb-2">🧪 Тест создания проекта</h1>
//         <p className="text-gray-600 mb-6">
//           Проверим, работает ли создание аналитического проекта
//         </p>

//         <div className="space-y-4">
//           {/* Название проекта */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Название проекта *
//             </label>
//             <input
//               type="text"
//               value={formData.projectName}
//               onChange={(e) =>
//                 setFormData({ ...formData, projectName: e.target.value })
//               }
//               placeholder="Например: CRM для банка"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Описание */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">Описание</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               placeholder="Краткое описание проекта..."
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Клиент */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Название клиента
//             </label>
//             <input
//               type="text"
//               value={formData.clientName}
//               onChange={(e) =>
//                 setFormData({ ...formData, clientName: e.target.value })
//               }
//               placeholder="Например: ПриватБанк"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Даты */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Дата начала
//               </label>
//               <input
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) =>
//                   setFormData({ ...formData, startDate: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Дата окончания
//               </label>
//               <input
//                 type="date"
//                 value={formData.endDate}
//                 onChange={(e) =>
//                   setFormData({ ...formData, endDate: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Бюджет */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Бюджет (USD)
//             </label>
//             <input
//               type="number"
//               value={formData.budgetUsd}
//               onChange={(e) =>
//                 setFormData({ ...formData, budgetUsd: e.target.value })
//               }
//               placeholder="Например: 50000"
//               max="2147483647"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Максимум: 2,147,483,647 (ограничение int)
//             </p>
//           </div>

//           {/* ID пользователя (скрыт) */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <p className="text-sm">
//               <span className="font-semibold">Создатель:</span> Valera Krutoi
//               (ID: {formData.createdByUserId})
//             </p>
//             <p className="text-xs text-gray-600 mt-1">
//               Проект будет создан от имени этого пользователя
//             </p>
//           </div>

//           {/* Кнопка */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !formData.projectName}
//             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md"
//           >
//             {loading ? "⏳ Создаём проект..." : "🚀 Создать проект"}
//           </button>
//         </div>

//         {/* Результат */}
//         {result && (
//           <div className="mt-6">
//             <div
//               className={`p-4 rounded-lg border-2 ${
//                 result.success
//                   ? "bg-green-50 border-green-400"
//                   : "bg-red-50 border-red-400"
//               }`}
//             >
//               <p
//                 className={`font-semibold ${
//                   result.success ? "text-green-800" : "text-red-800"
//                 }`}
//               >
//                 {result.message}
//               </p>
//             </div>

//             {result.data && (
//               <div className="mt-4 bg-gray-100 rounded-lg p-4">
//                 <h3 className="font-semibold mb-2">📦 Данные проекта:</h3>
//                 <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
//                   {JSON.stringify(result.data, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Инструкция */}
//         <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
//           <h4 className="font-semibold text-sm mb-2">💡 Что проверяем:</h4>
//           <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
//             <li>Создание проекта от имени пользователя с ID=2</li>
//             <li>Все обязательные поля заполнены корректно</li>
//             <li>Бюджет не превышает максимум для int</li>
//             <li>Сервер возвращает созданный проект с ID</li>
//           </ul>
//         </div>

//         {/* Консоль */}
//         <div className="mt-4 text-xs text-gray-500 text-center">
//           Открой консоль браузера (F12) чтобы видеть детали запросов
//         </div>
//       </div>
//     </div>
//   );
// }
// {
//   const [formData, setFormData] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     role: "MANAGER",
//     status: "ACTIVE",
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [createdUser, setCreatedUser] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await fetch("http://localhost:8080/system-users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const user = await response.json();
//         setCreatedUser(user);
//         setMessage({
//           type: "success",
//           text: `✅ Пользователь создан! ID: ${user.id}`,
//         });

//         // Очистить форму
//         setFormData({
//           email: "",
//           firstname: "",
//           lastname: "",
//           role: "MANAGER",
//           status: "ACTIVE",
//         });
//       } else {
//         const errorText = await response.text();
//         console.error("Ошибка от сервера:", errorText);
//         setMessage({ type: "error", text: `❌ Ошибка: ${errorText}` });
//       }
//     } catch (error) {
//       console.error("Ошибка соединения:", error);
//       setMessage({ type: "error", text: "❌ Ошибка соединения с сервером" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">
//         👤 Создание системного пользователя
//       </h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Email *</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             placeholder="admin@example.com"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Имя *</label>
//           <input
//             type="text"
//             value={formData.firstname}
//             onChange={(e) =>
//               setFormData({ ...formData, firstname: e.target.value })
//             }
//             placeholder="Иван"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Фамилия *</label>
//           <input
//             type="text"
//             value={formData.lastname}
//             onChange={(e) =>
//               setFormData({ ...formData, lastname: e.target.value })
//             }
//             placeholder="Петров"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Роль (optional)
//           </label>
//           <select
//             value={formData.role}
//             onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Не указана</option>
//             <option value="ADMIN">Администратор</option>
//             <option value="MANAGER">Менеджер</option>
//             <option value="ANALYST">Аналитик</option>
//             <option value="USER">Пользователь</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Статус (optional)
//           </label>
//           <select
//             value={formData.status}
//             onChange={(e) =>
//               setFormData({ ...formData, status: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Не указан</option>
//             <option value="ACTIVE">Активный</option>
//             <option value="INACTIVE">Неактивный</option>
//             <option value="PENDING">Ожидает</option>
//           </select>
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={
//             loading ||
//             !formData.email ||
//             !formData.firstname ||
//             !formData.lastname
//           }
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? "Создание..." : "🚀 Создать пользователя"}
//         </button>
//       </div>

//       {message && (
//         <div
//           className={`mt-4 p-4 rounded-md ${
//             message.type === "success"
//               ? "bg-green-100 border border-green-400 text-green-700"
//               : "bg-red-100 border border-red-400 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       {createdUser && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-md">
//           <h3 className="text-lg font-semibold mb-2">
//             ✅ Созданный пользователь:
//           </h3>
//           <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
//             {JSON.stringify(createdUser, null, 2)}
//           </pre>
//           <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded">
//             <p className="text-sm font-medium">
//               💡 Запомни ID: <span className="font-bold">{createdUser.id}</span>
//             </p>
//             <p className="text-xs text-gray-600 mt-1">
//               Используй этот ID при создании проектов!
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
//         <h4 className="font-semibold text-sm mb-2">ℹ️ Инструкция:</h4>
//         <ol className="text-sm space-y-1 list-decimal list-inside">
//           <li>Создай системного пользователя здесь</li>
//           <li>Запомни его ID (будет показан после создания)</li>
//           <li>Используй этот ID при создании проектов</li>
//         </ol>
//       </div>
//     </div>
//   );
// }
