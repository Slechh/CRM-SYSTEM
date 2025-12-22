import { InputUi } from "./InputUi";
export function UiFieldSet({
  children,
  title,
  isRightBtnClicked,
  register,
  editButton,
  arrToRender,
}) {
  return (
    <fieldset>
      <legend className="text-2xl font-bold">{title}</legend>
      {editButton}
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
