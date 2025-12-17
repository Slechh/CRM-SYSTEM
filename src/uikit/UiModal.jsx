import { UiButton } from "./UiButton";
import { Icon } from "../components/Icon";
export function UiModal({ children, isModalClose, label, bgForm, bgGirl }) {
  return (
    <div className="fixed inset-0 bg-[rgba(33,85,163,0.16)] py-10 overflow-y-auto cursor-default">
      <div className="bg-bgBlock min-h-[580px] w-[585px] mx-auto rounded-3xl py-12">
        <div className="text-black flex justify-between items-center text-2xl font-bold w-full px-10">
          <h2>Add {label}</h2>
          <UiButton
            size="xs"
            type="small"
            className="text-black"
            onClick={isModalClose}
          >
            <Icon id="close" className="w-4 h-4" />
          </UiButton>
        </div>

        <div className="relative w-full mt-6 px-10">
          <img
            src={`/images/${bgForm.path}.png`}
            alt={`${bgForm.alt}`}
            className="w-full"
          />
          <img
            src={`/images/${bgGirl.path}.png`}
            alt={`${bgGirl.alt}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>

        {children}
      </div>
    </div>
  );
}

UiModal.Header = function UiModalHeader({ children }) {
  return <div className="w-full px-10">{children}</div>;
};

UiModal.Body = function UiModalBody({ children }) {
  return <div className="w-full px-10 flex flex-col">{children}</div>;
};
