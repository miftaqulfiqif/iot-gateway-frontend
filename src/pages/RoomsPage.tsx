import MainLayout from "@/components/layouts/main-layout";
import CreateRoomModal from "@/components/modals/room_page/create-room-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/context/ToastContext";
import {
  EllipsisIcon,
  EllipsisVertical,
  Funnel,
  Search,
  Trash,
  User,
  UserRoundPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const RoomsPage = () => {
  const { showToast } = useToast();
  const [showFilter, setShowFilter] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateRoom = (data: {
    number: string;
    type: string;
    capacity: number;
  }) => {
    console.log("Room Created:", data);
    showToast(null, "Room created successfully", "success");
  };
  return (
    <MainLayout title="Rooms" state="Rooms">
      <div className="flex flex-col w-full">
        {/* Sticky Top */}
        <div className="sticky top-0 z-50 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-end">
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
                    <div
                      className="absolute z-10 bg-white p-4  rounded-xl mt-12 min-w-[200px] text-sm"
                      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between">
                          <span title="Filter users by role">
                            Filter contents
                          </span>
                          {/* <p
                          className="cursor-pointer text-red-500"
                          onClick={() => {}}
                        >
                          Reset filter
                        </p> */}
                        </div>
                        <button
                          className="text-white bg-[#0D00FF] px-4 py-1.5 rounded-lg"
                          onClick={() => {
                            alert("OK");
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div
                    className="flex bg-[#3885FD] items-center gap-2 px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)] cursor-pointer text-white "
                    onClick={(e) => {
                      e.stopPropagation();
                      setCreateModal(true);
                    }}
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    <p className="text-white">Add Room</p>
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

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* List Room */}
          <div className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-xl">312</p>
                <p>-</p>
                <p className="bg-green-200 text-green-900 font-bold flex rounded-full px-4 items-center">
                  ICU
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="bg-red-200 text-red-900 font-bold flex rounded-full px-4 items-center">
                  Full
                </p>
                <div className="relative" ref={dropdownRef}>
                  <EllipsisVertical
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                      <ul className="py-1 text-sm text-gray-700">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            window.location.href = `/room/312`;
                          }}
                        >
                          Lihat Detail
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Edit Ruangan
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 flex items-center gap-2">
                          <Trash className="w-4 h-4" />
                          Hapus
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <p>Capacity</p>
              </div>
              <div className="flex bg-blue-200 font-bold rounded-sm px-2 items-center">
                <p>2</p>
                <p>/</p>
                <p>4</p>
              </div>
            </div>
            {/* List Patient */}
            <p className="font-semibold mt-2">Patients</p>
            <div className="flex flex-col gap-2 w-full bg-[#ededf9] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-lg p-4">
              {/* Patient 1 */}
              <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Andi Saputra</p>
                    <p className="text-sm text-gray-500">Entry: 5 July 2025</p>
                  </div>
                </div>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>

              {/* Patient2 */}
              <div className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <div className="flex flex-col">
                    <p className="font-semibold">Rina Aulia</p>
                    <p className="text-sm text-gray-500">
                      Entry: 3 August 2025
                    </p>
                  </div>
                </div>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  Observe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateRoomModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onSubmit={handleCreateRoom}
      />
    </MainLayout>
  );
};
