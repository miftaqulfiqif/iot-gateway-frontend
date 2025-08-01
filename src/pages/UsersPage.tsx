import { UsersPageFilter } from "@/components/filter/user-page";
import MainLayout from "@/components/layouts/main-layout";
import { AddNewUser } from "@/components/modals/add-new-user";
import { TableAdminUsers } from "@/components/tables/admin-users";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel, Search, UserRoundPlus } from "lucide-react";
import { useRef, useState } from "react";

// Dummy Admin
const dummyUsers = [
  {
    id: "ADM001",
    name: "Budi Santoso",
    email: "budi.admin@rsprima.com",
    phone: "081234567890",
    username: "budiadmin",
    role: "admin",
    created_at: "2025-06-01T10:15:00",
  },
  {
    id: "ADM002",
    name: "Siti Marlina",
    email: "siti.marlina@rsprima.com",
    phone: "081234567891",
    username: "sitimarlina",
    role: "admin",
    created_at: "2025-06-05T14:20:00",
  },
  {
    id: "DCT003",
    name: "Agus Wijaya",
    email: "agus.wijaya@rsprima.com",
    phone: "081234567892",
    username: "aguswijaya",
    role: "doctor",
    created_at: "2025-06-10T09:30:00",
  },
  {
    id: "DCT004",
    name: "Dewi Lestari",
    email: "dewi.lestari@rsprima.com",
    phone: "081234567893",
    username: "dewiles",
    role: "doctor",
    created_at: "2025-06-15T08:45:00",
  },
  {
    id: "NUR005",
    name: "Joko Prabowo",
    email: "joko.prabowo@rsprima.com",
    phone: "081234567894",
    username: "jokoprbw",
    role: "nurse",
    created_at: "2025-06-20T13:00:00",
  },
];

const role = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Doctor",
  },
  {
    id: 3,
    name: "Nurse",
  },
];

export const UsersPage = () => {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [userSelected, setUserSelected] = useState(null);

  const handleChangeShowTable = (value: string) => {
    alert(value);
  };

  return (
    <MainLayout title="Users" state="Users">
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => setLimit(Number(value))}
                >
                  <SelectTrigger className="w-fit bg-[rgba(117,195,255,0.5)]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10" className="hover:bg-[#ECECEC]">
                      10
                    </SelectItem>
                    <SelectItem value="20" className="hover:bg-[#ECECEC]">
                      20
                    </SelectItem>
                    <SelectItem value="30" className="hover:bg-[#ECECEC]">
                      30
                    </SelectItem>
                    <SelectItem value="50" className="hover:bg-[#ECECEC]">
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 items-center">
                <div ref={filterRef} className="flex flex-col gap-2">
                  <div
                    className="flex cursor-pointer bg-white items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFilter((prev) => !prev);
                    }}
                  >
                    <Funnel className="w-5 h-5" />
                    <p className="text-sm">Filter</p>
                  </div>
                  {/* Filter Dropdown */}
                  {showFilter && (
                    <UsersPageFilter
                      role={role}
                      closeFilter={() => setShowFilter(false)}
                      handleChangeShowTable={handleChangeShowTable}
                    />
                  )}
                </div>

                <div className="relative">
                  <div
                    className="flex bg-[#3885FD] items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)] cursor-pointer text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddUserModal(true);
                    }}
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    <p className="text-white">Add User</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
                    <label
                      htmlFor="search"
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <Search className="w-6 h-6" />
                      <input
                        type="text"
                        id="search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-2 focus:outline-none"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              {/* Table */}
              {!userSelected && (
                <TableAdminUsers
                  data={dummyUsers}
                  goToPreviousPage={() => {}}
                  goToNextPage={() => {}}
                  goToPage={(page) => console.log("Go to page", page)}
                  currentPage={1}
                  totalPage={1}
                  limit={10}
                  search=""
                />
              )}
              {userSelected && (
                <div className="w-full h-full">
                  <button
                    className="text-white bg-[#0D00FF] px-4 py-1.5 mb-2 rounded-lg cursor-pointer"
                    onClick={() => alert("BACK")}
                  >
                    Back
                  </button>
                  {/* <DetailPatient patientId={patientSelected} /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddNewUser
        isActive={addUserModal}
        setInactive={() => setAddUserModal(false)}
      />
    </MainLayout>
  );
};
