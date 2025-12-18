import { UiButton } from "./UiButton";
import { Icon } from "../components/Icon";
import { useEffect } from "react";

export function UiDeleteModal({
  label,
  handleCloseModal,
  userName,
  onDelete,
}) {
  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseModal]);

  return (
    <div className="fixed inset-0 bg-[rgba(33,85,163,0.16)] overflow-y-auto cursor-default flex items-center justify-center">
      <div className="w-[350px] bg-bgBlock p-8 rounded-3xl flex flex-col gap-4 relative">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-bold text-xl">Delete {label}</h2>
          <p>
            Are you sure you want to delete this {label.toLowerCase()}? (
            {userName})
          </p>
        </div>
        <div className="flex gap-5">
          <UiButton
            size="md"
            type="cancel"
            onClick={handleCloseModal}
          >
            Cancel
          </UiButton>
          <UiButton
            size="md"
            type="big"
            onClick={async () => {
              await onDelete();
              handleCloseModal();
            }}
          >
            Delete
          </UiButton>
        </div>
        <button className="absolute top-7 right-7" onClick={handleCloseModal}>
          <Icon id="close" className="w-3 h-3"></Icon>
        </button>
      </div>
    </div>
  );
}
