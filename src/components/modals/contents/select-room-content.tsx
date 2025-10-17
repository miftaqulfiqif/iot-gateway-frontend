import { useRooms } from "@/hooks/api/use-room";
import { useEffect, useRef, useState } from "react";

// contoh data dummy
const rooms = [
  {
    id: "ICU-101",
    name: "ICU Room 101",
    number: "101",
    type: "Intensive Care",
    gateway: "GW-001",
  },
  {
    id: "ICU-102",
    name: "ICU Room 102",
    number: "102",
    type: "Intensive Care",
    gateway: "GW-002",
  },
  {
    id: "ER-103",
    name: "Emergency Room 103",
    number: "103",
    type: "Emergency",
    gateway: "GW-003",
  },
  {
    id: "ER-104",
    name: "Emergency Room 104",
    number: "104",
    type: "Emergency",
    gateway: "GW-004",
  },
  {
    id: "CARD-105",
    name: "Cardiology Room 105",
    number: "105",
    type: "Cardiology",
    gateway: "GW-005",
  },
  {
    id: "WARD-105",
    name: "General Ward 105",
    number: "105",
    type: "General",
    gateway: "GW-002",
  },
];

type Props = {
  roomSelected: any;
  setRoomSelected: (room: any) => void;
};

export const SelectRoomContent = ({ roomSelected, setRoomSelected }: Props) => {
  const { roomWithGateway, getRoomWithGateway } = useRooms();

  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch rooms when search changes
  useEffect(() => {
    getRoomWithGateway();
  }, [search]);

  return (
    <div className="flex flex-col h-full">
      {/* Form Search */}
      <form
        className="flex flex-row items-center"
        onSubmit={(e) => {
          e.preventDefault();
          // searchPatients(search);
        }}
      >
        <label htmlFor="room-name"></label>
        <div className="flex gap-2 w-full">
          <input
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="room-name"
            type="text"
            placeholder="Input room name here"
            className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Search
          </button>
        </div>
      </form>

      {/* List Rooms */}
      <div className="relative bg-white rounded-2xl mt-4 p-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] overflow-y-auto border max-h-[420px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[1000px]">
        <table className="w-full text-xs md:text-sm lg:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Name</th>
              <th className="py-2">Type</th>
              <th className="py-2">Gateway</th>
            </tr>
          </thead>
          <tbody>
            {roomWithGateway?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  {search.trim() === ""
                    ? "No rooms found."
                    : "No rooms found with the given search query."}
                </td>
              </tr>
            ) : (
              roomWithGateway?.map((room) => (
                <tr
                  key={room.id}
                  className={`cursor-pointer ${
                    roomSelected?.id === room.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setRoomSelected(room)}
                >
                  <td className="p-2">
                    <p>
                      {room.name} - {room.number}
                    </p>
                  </td>
                  <td className="p-2 text-center font-bold">{room.type}</td>
                  <td className="p-2 text-center flex items-center justify-center gap-1">
                    {room.iot_gateway.length > 0 ? (
                      room.iot_gateway.map((gateway) => (
                        <span
                          key={gateway.id}
                          className="bg-green-200 text-green-900 flex rounded-full px-4 font-bold text-xs"
                        >
                          {gateway.id}
                        </span>
                      ))
                    ) : (
                      <span className="bg-red-200 text-red-900 flex rounded-full px-4 font-bold text-xs">
                        No Gateway
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
