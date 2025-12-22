import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { UiFieldSet } from "../../uikit/UiFieldSet";
import { Icon } from "../../components/Icon";
import { OVERVIEW_PROFESSIONAL_INFO } from "../../constants/overviewInputs";
import { OVERVIEW_EMPLOYEE_INFO } from "../../constants/overviewInputs";
import { updateExpert } from "../../api/updateExpert";
import { useParams } from "react-router-dom";

export function OverviewTab() {
  const [isRightBtnClicked, setIsRightBtnClicked] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const { userInfo, setUserInfo } = useOutletContext();
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!userInfo) return;

    Object.entries(userInfo).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        setValue(key, value, { shouldDirty: false });
      }
    });
  }, [userInfo, setValue]);
  const changeMode = () => {
    setIsRightBtnClicked((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log("RAW FORM DATA:", data);

    const {
      expertId,
      createdAt,
      fullName,
      firstName,
      lastName,
      title,
      ...rest
    } = data;

    const expertData = {
      ...rest,
      // Мапим поля обратно на то, что ожидает бэк
      firstname: firstName,
      lastname: lastName,
      jobTitle: title,
      yearsOfExperience: rest.yearsOfExperience
        ? Number(rest.yearsOfExperience)
        : 0,
      monthlySalaryUsd: rest.monthlySalaryUsd
        ? Number(rest.monthlySalaryUsd)
        : 0,
      programmingLanguages: (rest.programmingLanguages || "")
        .toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      technologies: (rest.technologies || "")
        .toString()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    console.log("TRANSFORMED DATA:", expertData);
    setIsRightBtnClicked(false);

    updateExpert({ token, expertData, expertId }).then((data) => {
      console.log("SERVER RESPONSE:", data);
      setUserInfo(data);
    });
  };

  const editButton = (
    <div className="absolute right-0 top-0">
      <button
        type="button"
        className="flex items-center gap-1 text-bgNavBlock"
        onClick={changeMode}
      >
        {isRightBtnClicked ? (
          <Icon id="close" className="w-5 h-5 text-red-500" />
        ) : (
          <>
            <Icon id="edit" className="w-6 h-6" />
            Edit overview
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-[20px]">
          <UiFieldSet
            editButton={editButton}
            title="Employee Information"
            isRightBtnClicked={isRightBtnClicked}
            register={register}
            arrToRender={OVERVIEW_EMPLOYEE_INFO}
          />
          <div className="h-1 w-full bg-bgApp"></div>
          <UiFieldSet
            title="Professional Information"
            isRightBtnClicked={isRightBtnClicked}
            register={register}
            arrToRender={OVERVIEW_PROFESSIONAL_INFO}
          >
            <div className="flex flex-col">
              <label className="text-sm text-navText font-bold">
                Interviewed
              </label>
              <div className="flex justify-between flex-1">
                <div className="flex gap-2 items-center">
                  <label>Yes</label>
                  <input
                    disabled={!isRightBtnClicked}
                    type="radio"
                    value="yes"
                    {...register("interviewed")}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label>No</label>
                  <input
                    disabled={!isRightBtnClicked}
                    type="radio"
                    value="no"
                    {...register("interviewed")}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-navText font-bold">Status</label>
              <div className="flex justify-between  flex-1">
                <div className="flex gap-2 items-center">
                  <label>ACTIVE</label>
                  <input
                    disabled={!isRightBtnClicked}
                    type="radio"
                    value="ACTIVE"
                    {...register("status")}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label>READY</label>
                  <input
                    disabled={!isRightBtnClicked}
                    type="radio"
                    value="READY"
                    {...register("status")}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label>DECLINED</label>
                  <input
                    disabled={!isRightBtnClicked}
                    type="radio"
                    value="DECLINED"
                    {...register("status")}
                  />
                </div>
              </div>
            </div>
          </UiFieldSet>
        </div>
        {isRightBtnClicked && (
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        )}
      </form>
    </>
  );
}
