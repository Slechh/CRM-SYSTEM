import { OVERVIEW_MAIN_INFO } from "../../constants/overviewInputs";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { InputUi } from "../../uikit/InputUi";
export function OverviewMainInfo({ userInfo }) {
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
    // console.log(data);
  };

  return (
    <>
      <div className="w-full h-px bg-bgLine"></div>
      <div className="mt-7 px-6">
        <h2 className="font-bold text-lg mb-3">Main Info</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-[38px]">
          {OVERVIEW_MAIN_INFO.map((info, i) => (
            <InputUi
              key={i}
              label={info.label}
              placeholder={info.placeholder}
              className={i !== 0 ? "mt-5" : ""}
              
              {...register(info.name)}
            />
          ))}
        </form>
      </div>
    </>
  );
}
