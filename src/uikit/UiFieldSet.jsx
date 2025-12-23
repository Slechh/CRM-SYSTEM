import { InputUi } from "./InputUi";
export function UiFieldSet({
  children,
  title,
  isRightBtnClicked,
  register,
  editButton,
  saveButton,
  arrToRender,
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-bold">{title}</legend>
      <div className="absolute right-4 top-4 flex items-center gap-3">
        {saveButton}
        {editButton}
      </div>
      <div className="grid grid-cols-3 mt-3 gap-y-5 gap-x-10">
        {arrToRender.map((info, i) => (
          <InputUi
            type={info.type}
            isDisabled={!isRightBtnClicked}
            key={i}
            label={info.label}
            placeholder={info.placeholder}
            {...register(info.name)}
          />
        ))}
        {children}
      </div>
    </fieldset>
  );
}
