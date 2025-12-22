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
    if (userInfo) {
      Object.keys(userInfo).forEach((key) => {
        setValue(key, userInfo[key] ? userInfo[key] : "");
      });
    }
  }, [userInfo, setValue]);

  const changeMode = () => {
    setIsRightBtnClicked((prev) => !prev);
  };

  const onSubmit = (data) => {
    const { expertId, createdAt, fullName, title, ...rest } = data; // убираем лишние поля
    const expertData = {
      ...rest,
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
      setUserInfo(data);
      console.log(data);
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
            changeMode={changeMode}
            isRightBtnClicked={isRightBtnClicked}
            register={register}
            arrToRender={OVERVIEW_EMPLOYEE_INFO}
          ></UiFieldSet>
          <div className="h-1 w-full bg-bgApp"></div>
          <UiFieldSet
            title="Professional Information"
            changeMode={changeMode}
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
  // const { id } = useParams(); // получаем id из url
  // const token = sessionStorage.getItem("authToken"); // получаем token из сессии
  // console.log(token);
  // console.log(typeof id);

  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   shortName: "",
  //   jobTitle: "",
  //   specialization: "",
  //   sourcingMethod: "",
  //   yearsOfExperience: 0,
  //   monthlySalaryUsd: 0,
  //   interviewed: "",
  //   status: "",
  //   country: "",
  //   city: "",
  //   linkedInUrl: "",
  //   contacts: "",
  //   education: "",
  //   fullCv: "",
  //   technologies: [""],
  //   programmingLanguages: [""],
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "technologies" || name === "programmingLanguages") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value.split(",").map((v) => v.trim()),
  //     }));
  //   } else if (name === "yearsOfExperience" || name === "monthlySalaryUsd") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: Number(value),
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!token) return alert("Нет токена!");
  //   if (!id) return alert("Нет ID эксперта!");

  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/v1/experts/${Number(id)}/overview`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  //     if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
  //     const data = await response.json();
  //     console.log("Success:", data);
  //     alert("Данные успешно отправлены!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Ошибка при отправке");
  //   }
  // };

  // return (
  //   <form className="p-4 space-y-2" onSubmit={handleSubmit}>
  //     {Object.keys(formData).map((key) => (
  //       <div key={key} className="flex flex-col">
  //         <label className="font-bold text-sm">{key}</label>
  //         <input
  //           type={typeof formData[key] === "number" ? "number" : "text"}
  //           name={key}
  //           value={
  //             Array.isArray(formData[key])
  //               ? formData[key].join(", ")
  //               : formData[key]
  //           }
  //           onChange={handleChange}
  //           className="border p-1"
  //         />
  //         {Array.isArray(formData[key]) && (
  //           <small className="text-gray-500">
  //             Ввод через запятую для массивов
  //           </small>
  //         )}
  //       </div>
  //     ))}
  //     <button
  //       type="submit"
  //       className="bg-blue-500 text-white px-4 py-2 rounded"
  //     >
  //       Отправить
  //     </button>
  //   </form>
  // );
}
