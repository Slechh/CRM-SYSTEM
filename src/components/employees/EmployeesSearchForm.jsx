import { Icon } from "../Icon";

export function EmployeesSearchForm() {
  return (
    <div className="w-full bg-bgBlock px-5 py-3 rounded-2xl">
      <form action="">
        <div className="flex items-center">
          <input
            type="search"
            name="asdad"
            placeholder="Search"
            className="bg-transparent w-full outline-none mr-4"
          />
          <button className="ml-5">
            <Icon id="search" className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
