import { useState, useEffect } from "react";
import { Icon } from "../../components/Icon";
import { useOutletContext } from "react-router-dom";
import { uploadFiles } from "../../api/uploadFile";
import { getFiles } from "../../api/getFile";
import { fetchDeleteExpert } from "../../api/deleteFile";
import { useAuth } from "../../hooks/useAuth";
import { Toast } from "../../components/Toast";

export function AttachmentTab() {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toast, setToast] = useState(null);
  const { userInfo } = useOutletContext();
  const { hasRole } = useAuth();
  const userId = userInfo?.expertId; // Добавлена проверка
  const token = sessionStorage.getItem("authToken");

  const canManageAttachments = hasRole(["CEO", "RECRUITER"]);

  useEffect(() => {
    // Добавлена проверка перед запросом
    if (!userId || !token) {
      setIsLoading(false);
      return;
    }

    const fetchExistingFiles = async () => {
      setIsLoading(true);
      try {
        const files = await getFiles({ token, expertId: userId });
        console.log(files);
        const serverPreviews = files.map((file) => ({
          isLocal: false,
          fileName: file.fileName,
          fileId: file.id,
          fileUrl: file.fileUrl,
        }));
        setPreviews(serverPreviews);
      } catch (error) {
        console.error("Ошибка при получении файлов:", error);
        setToast({
          message: "Failed to load files",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingFiles();
  }, [token, userId]);

  const handleChange = async (e) => {
    if (!userId) {
      setToast({ message: "User ID not found", type: "error" });
      return;
    }

    const files = Array.from(e.target.files);
    if (!files.length) return;

    const localPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      isLocal: true,
      file,
    }));

    setPreviews((prev) => [...prev, ...localPreviews]);

    try {
      for (let file of files) {
        await uploadFiles({ token, file, id: userId });
      }
      console.log("Файлы успешно загружены");

      const updatedFiles = await getFiles({ token, expertId: userId });
      const serverPreviews = updatedFiles.map((file) => ({
        isLocal: false,
        fileName: file.fileName,
        fileId: file.id,
        fileUrl: file.fileUrl,
      }));
      setPreviews(serverPreviews);

      setToast({
        message:
          files.length > 1
            ? "Files uploaded successfully!"
            : "File uploaded successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      setToast({
        message: error.message || "Failed to upload files",
        type: "error",
      });
    }
  };

  const handleDelete = async (fileId, index) => {
    try {
      await fetchDeleteExpert({ token, fileId });
      setPreviews((prev) => prev.filter((_, i) => i !== index));
      console.log("Файл успешно удален");

      setToast({ message: "File deleted successfully!", type: "success" });
    } catch (error) {
      console.error("Ошибка при удалении файла:", error);
      setToast({
        message: error.message || "Failed to delete file",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold">Attachment</h2>
        </div>
        <ul className="grid grid-cols-4 gap-7 mt-5">
          {[...Array(8)].map((_, index) => (
            <li key={index}>
              <div className="h-[150px] w-full bg-gray-200 animate-pulse rounded-2xl"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Добавлена проверка на отсутствие userInfo
  if (!userInfo || !userId) {
    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold">Attachment</h2>
        </div>
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-xl text-gray-400">
            User information not available
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-bold">Attachment</h2>
        </div>

        {previews.length === 0 && !canManageAttachments ? (
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-xl text-gray-400">No images yet</p>
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-7 mt-5">
            {previews.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.isLocal ? (
                  <img
                    src={item.url}
                    alt="Preview"
                    className="h-[180px] w-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="h-[180px] w-full flex items-center justify-center bg-bgApp text-white rounded-2xl">
                    <span className="font-bold text-black">
                      {item.fileName.slice(0, 20) || "File"}
                    </span>
                  </div>
                )}

                {hoveredIndex === index &&
                  !item.isLocal &&
                  canManageAttachments && (
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleDelete(item.fileId, index)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all"
                        title="Delete"
                      >
                        <Icon id="close" className="w-4 h-4" />
                      </button>
                    </div>
                  )}
              </li>
            ))}

            {canManageAttachments && (
              <li>
                <div className="h-[180px] w-full">
                  <label className="flex flex-col h-full items-center justify-center cursor-pointer px-4 py-2 bg-bgApp text-white rounded-2xl hover:bg-opacity-80 transition-all">
                    <Icon id="plus" className="w-[65px] text-bgSvg" />
                    <span className="text-black">Add Attachment</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                      multiple
                    />
                  </label>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
