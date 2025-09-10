import { RoomsModel } from "@/models/RoomModel";
import { EllipsisVertical, Trash, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Room = {
  roomName: string;
  roomNumber: string;
  unit: string;
  status: string;
  capacity: { current: number; total: number };
  patients: {
    name: string;
    entryDate: string;
    status: string;
  }[];
};

export const RoomItems = ({ room }: { room: RoomsModel }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col gap-2 bg-white rounded-2xl p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">{room.name}</p>
          <div className="flex gap-2 items-center">
            <p className="bg-green-200 text-green-900 flex rounded-full px-4 font-bold text-xl">
              {room.number}
            </p>
            <p>-</p>
            <p className="font-bold items-center">{room.type}</p>
          </div>
        </div>
        <div className="flex items-start   gap-4">
          <p
            className={`font-bold flex rounded-full px-4 items-center ${
              room.status === "full"
                ? "bg-red-200 text-red-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {room.status}
          </p>
          <div className="relative" ref={dropdownRef}>
            <EllipsisVertical
              className="w-5 h-5 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <ul className="py-1 text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
                    <a href={`/room/${room.id}`} className="block w-full">
                      Lihat Detail
                    </a>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 flex items-center gap-2"
                    onClick={() => alert("Room deleted")}
                  >
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
          <p>{room.capacity.used}</p>
          <p>/</p>
          <p>{room.capacity.total}</p>
        </div>
      </div>
      {/* List Patient */}
      <p className="font-semibold mt-2">Patients</p>
      <div className="flex flex-col gap-2 w-full bg-[#ededf9] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-lg p-4">
        {room.patients.length === 0 ? (
          <div className="text-center text-gray-500 italic py-4">
            No patients available
          </div>
        ) : (
          <>
            {/* Tampilkan 2 pasien pertama */}
            {room.patients.slice(0, 2).map((patient, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-gray-500">
                      Entry:{" "}
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(patient.assigned_at))}
                    </p>
                  </div>
                </div>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                  {patient.status}
                </span>
              </div>
            ))}

            {/* Jika ada lebih dari 2 pasien, tampilkan indikator tambahan */}
            {room.patients.length > 2 && (
              <div className="flex justify-center">
                <span className="text-sm text-gray-500 italic">
                  ...and more
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
