/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { UiFieldSet } from "../../uikit/UiFieldSet";
import { Icon } from "../../components/Icon";
import { OVERVIEW_PROFESSIONAL_INFO } from "../../constants/overviewInputs";
import { OVERVIEW_EMPLOYEE_INFO } from "../../constants/overviewInputs";
import { updateExpert } from "../../api/updateExpert";
import { UiMultiSelect } from "../../uikit/UiMultiSelect";
import { useWatch } from "react-hook-form";
import {
  TECHNOLOGIES,
  PROGRAMMING_LANGUAGES,
  SPECIALIZATIONS,
} from "../../constants/overviewInputs";
import { UiSelect } from "../../uikit/UiSelect";
import { useAuth } from "../../hooks/useAuth";
import { Toast } from "../../components/Toast";

export function OverviewTab() {
  const [isRightBtnClicked, setIsRightBtnClicked] = useState(false);
  const [toast, setToast] = useState(null);
  const { register, handleSubmit, setValue, control } = useForm();
  const { userInfo, setUserInfo } = useOutletContext();
  const { hasRole } = useAuth();
  const token = sessionStorage.getItem("authToken");

  const technologies = useWatch({
    control,
    name: "technologies",
    defaultValue: [],
  });
  const programmingLanguages = useWatch({
    control,
    name: "programmingLanguages",
    defaultValue: [],
  });

  const expertSpecialization = useWatch({
    control,
    name: "expertSpecialization",
    defaultValue: "",
  });

  const canEditEmployee = hasRole(["CEO", "RECRUITER"]);

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

  const onSubmit = async (data) => {
    const {
      expertId,
      createdAt,
      fullName,
      firstName,
      lastName,
      title,
      expertSpecialization,
      ...rest
    } = data;

    const expertData = {
      ...rest,
      firstname: firstName,
      lastname: lastName,
      jobTitle: title,
      specialization: expertSpecialization,
      yearsOfExperience: rest.yearsOfExperience
        ? Number(rest.yearsOfExperience)
        : 0,
      monthlySalaryUsd: rest.monthlySalaryUsd
        ? Number(rest.monthlySalaryUsd)
        : 0,
      programmingLanguages: Array.isArray(rest.programmingLanguages)
        ? rest.programmingLanguages
        : (rest.programmingLanguages || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      technologies: Array.isArray(rest.technologies)
        ? rest.technologies
        : (rest.technologies || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    };

    console.log("TRANSFORMED DATA:", expertData);

    try {
      const updatedData = await updateExpert({ token, expertData, expertId });
      console.log("SERVER RESPONSE:", updatedData);
      setUserInfo(updatedData);
      setIsRightBtnClicked(false);
      setToast({
        message: "Employee data updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      setToast({
        message: "Failed to update employee data",
        type: "error",
      });
    }
  };

  const editButton = canEditEmployee ? (
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
  ) : null;

  const saveButton =
    isRightBtnClicked && canEditEmployee ? (
      <button
        type="submit"
        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Changes
      </button>
    ) : null;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-[20px]">
          <UiFieldSet
            editButton={editButton}
            saveButton={saveButton}
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
            <UiSelect
              label="Specialization"
              value={expertSpecialization || ""}
              onChange={(val) => setValue("expertSpecialization", val)}
              options={SPECIALIZATIONS.map((spec) => ({
                id: spec,
                name: spec,
              }))}
              placeholder="Select specialization"
              disabled={!isRightBtnClicked}
            />
            <UiMultiSelect
              label="Technologies"
              value={Array.isArray(technologies) ? technologies : []}
              onChange={(val) => setValue("technologies", val)}
              options={TECHNOLOGIES}
              placeholder="Select technologies"
              disabled={!isRightBtnClicked}
            />
            <UiMultiSelect
              label="Programming Languages"
              value={
                Array.isArray(programmingLanguages) ? programmingLanguages : []
              }
              onChange={(val) => setValue("programmingLanguages", val)}
              options={PROGRAMMING_LANGUAGES}
              placeholder="Select languages"
              disabled={!isRightBtnClicked}
            />
          </UiFieldSet>
        </div>
      </form>
    </>
  );
}
