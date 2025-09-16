import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/main-layout";
import { CircleCheck, CircleX, MonitorDot, Plus, Users } from "lucide-react";

import { TableGateways } from "@/components/tables/gateways";
import { dummyGateways } from "@/models/GatewayModel";
import { AddGatewayModal } from "@/components/modals/add-gateway-modal";

function Gateways() {
  const [addGateway, setAddGateway] = useState(false);

  return (
    <MainLayout title="Gateways" state="Gateways">
      <div className="flex flex-col mb-5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 mb-4">
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Total Devices</p>
                <p className="font-semibold text-3xl text-blue-500">9</p>
              </div>
              <MonitorDot className="w-10 h-10 text-blue-500" />
            </div>
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Online</p>
                <p className="font-semibold text-3xl text-green-500">6</p>
              </div>
              <CircleCheck className="w-10 h-10 text-green-500" />
            </div>
            <div className="w-full flex items-center justify-between p-6 rounded-xl bg-white border gap-2">
              <div className="">
                <p className="">Offline</p>
                <p className="font-semibold text-3xl text-red-500">3</p>
              </div>
              <CircleX className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-bold text-2xl">Gateway connected</p>
            {/* Button Add Device */}
            <div
              className="flex flex-row items-center bg-[#2B7FFF] rounded-2xl text-white font-bold py-2 px-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)] gap-2 cursor-pointer"
              onClick={() => setAddGateway(true)}
            >
              <Plus className="w-8 h-8" />
              <p>Add Device</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
            <div className="flex flex-row gap-4">
              <div className="w-full">
                {/* Table */}
                <TableGateways
                  data={dummyGateways}
                  goToPreviousPage={() => {}}
                  goToNextPage={() => {}}
                  goToPage={(page) => console.log("Go to page", page)}
                  currentPage={1}
                  totalPage={1}
                  limit={10}
                  search=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddGatewayModal
        isActive={addGateway}
        setInactive={() => setAddGateway(false)}
      />
    </MainLayout>
  );
}

export default Gateways;
