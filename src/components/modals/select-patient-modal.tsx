import { useState } from "react";
import {
  Bluetooth,
  Cpu,
  EthernetPort,
  Key,
  LandPlot,
  ScanSearch,
  Wifi,
} from "lucide-react";
import { useSocketHandler } from "@/hooks/SocketHandler";
import { Devices } from "@/models/DeviceModel";
import Sidebar from "../layouts/sidebar";

type Props = {
  isActive: boolean;
  state: string;
  openBarcodeModal: () => void;
  openSelectModal: () => void;
  openCreateModal: () => void;
};

export const SelectPatient = ({
  isActive,
  state,
  openBarcodeModal,
  openSelectModal,
  openCreateModal,
}: Props) => {
  return (
    <div
      onClick={openSelectModal}
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        <Sidebar state="Measurement" />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-3/5 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-4 h-[600px]">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Select patient</p>
            <div className="flex flex-row gap-4 bg-[#f0f0f0] px-4 py-2 rounded-xl text-sm">
              <div
                className={
                  state === "barcode"
                    ? `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer`
                }
                onClick={openBarcodeModal}
              >
                <p className="text-blue-700 font-semibold">Scan Barcode</p>
              </div>
              <div
                className={
                  state === "select"
                    ? `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer`
                }
                onClick={openSelectModal}
              >
                <p className="text-blue-700 font-semibold">Select Patient</p>
              </div>
              <div
                className={
                  state === "create"
                    ? `bg-white items-center px-4 py-2 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer `
                }
                onClick={openCreateModal}
              >
                <p className="text-blue-700 font-semibold">Create Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
