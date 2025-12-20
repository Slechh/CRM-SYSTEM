import { OVERVIEW_MAIN_INFO } from "../../constants/overviewInputs";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { InputUi } from "../../uikit/InputUi";
import { UiButton } from "../../uikit/UiButton";
import { Icon } from "../Icon";

export function OverviewMainInfo({ userInfo, isBtnClicked, handleBtnClick }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (userInfo) {
      console.log(Object.keys(userInfo));
      Object.keys(userInfo).forEach((key) => {
        setValue(key, userInfo[key] ? userInfo[key] : "-");
      });
    }
  }, [userInfo, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="w-full h-px bg-bgLine"></div>
      <div className="mt-7 px-6">
        <h2 className="font-bold text-lg mb-3">Main Info</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-[38px]">
          <div className="relative">
            <UiButton
              size="xs"
              type="small"
              className="absolute right-0 top-[-50px]"
              onClick={handleBtnClick}
            >
              <Icon
                id={isBtnClicked ? "save" : "edit"}
                className="w-6 h-6"
              ></Icon>
            </UiButton>
            {OVERVIEW_MAIN_INFO.map((info, i) => (
              <InputUi
                isDisabled={!isBtnClicked}
                key={i}
                label={info.label}
                placeholder={info.placeholder}
                className={i !== 0 ? "mt-5" : ""}
                {...register(info.name)}
                isdis
              />
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
