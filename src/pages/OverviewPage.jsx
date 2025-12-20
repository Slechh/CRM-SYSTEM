import clsx from "clsx";
import { UiPanel } from "../uikit/UiPanel";
import { useOverview } from "../hooks/useOverview";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { OverviewHeader } from "../components/overview/OverviewHeader";
import { OverviewMainInfo } from "../components/overview/OverviewMainInfo";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { OVERVIEW_PROFESSIONAL_INFO } from "../constants/overviewInputs";
import { InputUi } from "../uikit/InputUi";
import { UiButton } from "../uikit/UiButton";
import { Icon } from "../components/Icon";

export function OverviewPage({ className }) {
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [isRightBtnClickd, setIsRightBtnClicked] = useState();

  console.log(isBtnClicked);
  const { id } = useParams();
  const { userInfo, userLoading } = useOverview(id);
  const [activeButton, setActiveButton] = useState("overview");
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    if (userInfo) {
      console.log(Object.keys(userInfo));
      Object.keys(userInfo).forEach((key) => {
        setValue(key, userInfo[key] ? userInfo[key] : "-");
      });
    }
  }, [userInfo, setValue]);
  console.log(userInfo);
  // <NavLink to={`/overview/${user.id}`} className="no-underline"></NavLink>
  const buttons = [
    { id: "overview", name: "Overview" },
    { id: "cv", name: "CV" },
    { id: "attachment", name: "Attachment" },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className={clsx("flex flex-col pb-7 h-full", className)}>
      <h1 className="font-bold text-4xl">Employee overview</h1>
      <div className="flex mt-7 gap-8">
        <div className="h-full">
          <UiPanel>
            <OverviewHeader userInfo={userInfo} />
            <OverviewMainInfo
              userInfo={userInfo}
              isBtnClicked={isBtnClicked}
              handleBtnClick={() => setIsBtnClicked((prev) => !prev)}
            />
          </UiPanel>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-center">
            <div className="flex w-[455px] bg-overviewSwitcher p-1 rounded-2xl gap-1">
              {buttons.map((value) => {
                return (
                  <button
                    key={value.id}
                    onClick={() => setActiveButton(value.id)}
                    className={clsx(
                      "flex flex-1 items-center justify-center rounded-2xl py-2 transition-all duration-300",
                      activeButton === value.id
                        ? "bg-bgNavBlock text-bgApp font-bold"
                        : ""
                    )}
                  >
                    {value.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-1 flex-col bg-bgBlock rounded-3xl p-6 mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <fieldset>
                  <legend className="text-2xl font-bold">
                    Professional Information
                  </legend>
                  <div className="absolute right-0 top-0">
                    <button
                      className="flex items-center gap-1 text-bgNavBlock"
                      onClick={() => setIsRightBtnClicked((prev) => !prev)}
                    >
                      {isRightBtnClickd ? (
                        <Icon id="close" className="w-5 h-5 text-red-500" />
                      ) : (
                        <>
                          <Icon id="edit" className="w-6 h-6" />
                          Edit overview
                        </>
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 mt-3 gap-y-5 gap-x-10">
                    {OVERVIEW_PROFESSIONAL_INFO.map((info, i) => (
                      <InputUi
                        isDisabled={!isRightBtnClickd}
                        key={i}
                        label={info.label}
                        placeholder={info.placeholder}
                        {...register(info.name)}
                      />
                    ))}
                    <div className="flex flex-col">
                      <label className="text-sm text-navText font-bold">
                        Interviewed
                      </label>
                      <div className="flex justify-between flex-1">
                        <div className="flex gap-2 items-center">
                          <label>Yes</label>
                          <input
                            disabled={!isRightBtnClickd}
                            type="radio"
                            value="yes"
                            {...register("interviewed")}
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label>No</label>
                          <input
                            disabled={!isRightBtnClickd}
                            type="radio"
                            value="no"
                            {...register("interviewed")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm text-navText font-bold">
                        Status
                      </label>
                      <div className="flex justify-between  flex-1">
                        <div className="flex gap-2 items-center">
                          <label>CREATED</label>
                          <input
                            disabled={!isRightBtnClickd}
                            type="radio"
                            value="CREATED"
                            {...register("status")}
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label>READY</label>
                          <input
                            disabled={!isRightBtnClickd}
                            type="radio"
                            value="READY"
                            {...register("status")}
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label>DECLINED</label>
                          <input
                            disabled={!isRightBtnClickd}
                            type="radio"
                            value="DECLINED"
                            {...register("status")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              {isRightBtnClickd && (
                <button
                  onClick={() => setIsRightBtnClicked((prev) => !prev)}
                  type="submit"
                  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
