import { EllipsisVertical, Trash, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Room = {
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

export const RoomItems = ({ room }: { room: Room }) => {
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
        <div className="flex gap-2 items-center">
          <p className="font-bold text-xl">{room.roomNumber}</p>
          <p>-</p>
          <p className="bg-green-200 text-green-900 font-bold flex rounded-full px-4 items-center">
            {room.unit}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-red-200 text-red-900 font-bold flex rounded-full px-4 items-center">
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
          <p>{room.capacity.current}</p>
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
                      Entry: {patient.entryDate}
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
