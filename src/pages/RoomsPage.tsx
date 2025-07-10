import MainLayout from "@/components/layouts/main-layout";
import CreateRoomModal from "@/components/modals/room_page/create-room-modal";
import { RoomItems } from "@/components/sections/rooms-page/room-item";
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

export const dummyRooms = [
  {
    roomNumber: "312",
    unit: "ICU",
    status: "Full",
    capacity: {
      current: 2,
      total: 2,
    },
    patients: [
      {
        name: "Andi Saputra",
        entryDate: "5 July 2025",
        status: "Active",
      },
      {
        name: "Rina Aulia",
        entryDate: "3 August 2025",
        status: "Observe",
      },
    ],
  },
  {
    roomNumber: "208",
    unit: "HCU",
    status: "Available",
    capacity: {
      current: 1,
      total: 3,
    },
    patients: [
      {
        name: "Budi Hartono",
        entryDate: "9 July 2025",
        status: "Active",
      },
    ],
  },
  {
    roomNumber: "101",
    unit: "General Ward",
    status: "Available",
    capacity: {
      current: 0,
      total: 2,
    },
    patients: [],
  },
];

export const RoomsPage = () => {
  const { showToast } = useToast();
  const [showFilter, setShowFilter] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {/* List Room */}
          {dummyRooms.map((room) => (
            <RoomItems key={room.roomNumber} room={room} />
          ))}
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
