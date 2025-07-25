import MainLayout from "@/components/layouts/main-layout";
import UpdateRoomModal from "@/components/modals/room_page/update-room-modal";
import {
  User,
  Bed,
  Activity,
  Clock,
  NotebookTabs,
  Users,
  History,
  SquarePen,
} from "lucide-react";
import { useState } from "react";

const dummyData = {
  room: {
    id: 1,
    number: "312",
    type: "ICU",
    status: "Full",
    capacity: 5,
    occupied: 5,
    nurseManager: {
      id: "1",
      name: "Juleha",
    },
    doctor: {
      id: "2",
      name: "dr. Yulia Pratiwi",
    },
  },
  stats: {
    admittedToday: 2,
    dischargedToday: 1,
    observation: 1,
  },
  patients: [
    { name: "Andi Saputra", admittedAt: "2025-07-05", status: "Aktif" },
    { name: "Rina Aulia", admittedAt: "2025-07-04", status: "Observasi" },
    { name: "Bayu Wijaya", admittedAt: "2025-07-03", status: "Aktif" },
    { name: "Nina Kartika", admittedAt: "2025-07-02", status: "Aktif" },
    { name: "Dedi Prasetyo", admittedAt: "2025-07-01", status: "Aktif" },
  ],
  activityLog: [
    { time: "2025-07-05 14:00", desc: "Pasien Bayu dipindahkan ke ICU 314" },
    { time: "2025-07-05 11:15", desc: "Pasien Rina masuk" },
    { time: "2025-07-05 08:40", desc: "Pasien Nina keluar" },
  ],
};

export default function DetailRoomPage() {
  const { room, stats, patients, activityLog } = dummyData;

  const [updateRoomModal, setUpdateRoomModal] = useState(false);

  return (
    <MainLayout title="Detail Room" state="Rooms">
      <div className="p-6 w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Room {room.number} - {room.type}
          </h1>
          <span
            className={`px-4 py-1 rounded-full font-semibold text-white 
          ${room.status === "Full" ? "bg-red-500" : "bg-green-500"}`}
          >
            {room.status}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Bed className="w-6 h-6" />}
            title="Capacity"
            value={`${room.occupied}/${room.capacity}`}
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            title="Admissions Today"
            value={stats.admittedToday}
          />
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            title="Observations Today"
            value={stats.observation}
          />
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-full">
            {/* Room Info */}
            <div className="bg-[#EDEDF9] rounded-xl p-4 shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)]">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-2">
                  <NotebookTabs className="w-6 h-6 text-blue-600" />
                  <h2 className="text-lg font-semibold"> Room Information</h2>
                </div>
                <div
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer"
                  onClick={() => setUpdateRoomModal(true)}
                >
                  <SquarePen className="w-6 h-6 " />
                  <h2 className="text-lg font-semibold"> Edit room</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-gray-700">
                <p>
                  <strong>Room Number:</strong> {room.number}
                </p>
                <p>
                  <strong>Nurse Manager:</strong> {room.nurseManager.name}
                </p>
                <p>
                  <strong>Type:</strong> {room.type}
                </p>
                <p>
                  <strong>Doctor:</strong> {room.doctor.name}
                </p>
              </div>
            </div>

            {/* Patients */}
            <div>
              <div className="flex flex-row gap-2 items-center mb-4 mt-10">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold">Patient List</h2>
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-8 rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {patients.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex justify-between items-center"
                  >
                    <div className="flex gap-3 items-start">
                      <User className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          Entry: {p.admittedAt}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full
                ${
                  p.status === "Aktif"
                    ? "bg-green-200 text-green-800 font-semibold"
                    : "bg-yellow-200 text-yellow-800 font-semibold"
                }`}
                    >
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Activity Log */}
          <div className="w-1/2">
            <div className="bg-white rounded-xl h-full p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] space-y-2 text-sm text-gray-700">
              <div className="flex flex-row gap-2 items-center mb-4">
                <History className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              {activityLog.map((log, idx) => (
                <p key={idx} className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <strong>{log.time}</strong> - {log.desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <UpdateRoomModal
        isOpen={updateRoomModal}
        onClose={() => setUpdateRoomModal(false)}
        room={room}
      />
    </MainLayout>
  );
}

// Reusable StatCard
function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
}) {
  return (
    <div className="bg-gradient-to-b to-[#6e79f4] from-[#4956F4] shadow-[4px_4px_4px_rgba(0,0,0,0.16),-4px_-4px_4px_rgba(255,255,255,1)] p-4 rounded-xl flex items-center gap-4 text-white">
      <div className="">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}
