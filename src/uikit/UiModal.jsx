export function UiModal({ children }) {
  return (
    <div className="fixed inset-0 bg-[rgba(33,85,163,0.16)] py-10 overflow-y-auto cursor-default">
      <div className="bg-bgBlock min-h-[580px] w-[585px] mx-auto rounded-3xl py-12">
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
