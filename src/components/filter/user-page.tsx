import { useState } from "react";

type Props = {
  role: any[];
  closeFilter: () => void;
  handleChangeShowTable: (value: string) => void;
};

export const UsersPageFilter = ({
  role,
  closeFilter,
  handleChangeShowTable,
}: Props) => {
  const [roleSelected, setRoleSelected] = useState("");

  return (
    <div
      className="absolute z-10 bg-white p-4  rounded-xl mt-12 min-w-[200px] text-sm"
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <span title="Filter users by role">Filter contents</span>
          <p className="cursor-pointer text-red-500" onClick={() => {}}>
            Reset filter
          </p>
        </div>
        {/* Filter Content */}
        <div className="flex flex-col gap2">
          <div className="flex justify-between bg-[#EDEDF9] p-2 rounded-sm gap-2">
            {role.map((item) => (
              <div
                key={item.id}
                className={`rounded-sm px-2 py-1 cursor-pointer ${
                  roleSelected === item.id
                    ? "bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    : "bg-[#EDEDF9]"
                }`}
                onClick={() => setRoleSelected(item.id)}
              >
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="text-white bg-[#0D00FF] px-4 py-1.5 rounded-lg"
          onClick={() => {
            closeFilter();
            handleChangeShowTable(roleSelected);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
