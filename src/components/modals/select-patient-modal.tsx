import { useEffect, useRef, useState } from "react";
import {
  Bluetooth,
  Cpu,
  EthernetPort,
  Key,
  LandPlot,
  ScanSearch,
  Wifi,
} from "lucide-react";
import { Devices } from "@/models/DeviceModel";
import Sidebar from "../layouts/sidebar";

import barcodeImg from "@/assets/gif/scan-barcode.gif";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { SelectPatientContent } from "./contents/select-patient-content";
import { UsePatient } from "@/hooks/api/use-patient";
import { CreatePatientContent } from "./contents/create-patient-content";

type Props = {
  isActive: boolean;
  state: string;
  openBarcodeModal: () => void;
  openSelectModal: () => void;
  openCreateModal: () => void;
  patientSelected: (patient: any) => void;
  stateSidebar: string;
};

export const SelectPatient = ({
  isActive,
  state,
  openBarcodeModal,
  openSelectModal,
  openCreateModal,
  patientSelected,
  stateSidebar,
}: Props) => {
  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        {/* Component Sidebar */}
        <Sidebar state={stateSidebar} />
      </div>

      {/* Show Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-3/5 transform bg-white rounded-xl p-8 z-50 w-4xl h-fit transition-all duration-300 ease-in-out
        ${
          isActive
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <div className="flex flex-col gap-4 h-[600px]">
          {/* Option Select Patient */}
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-xl">Select patient</p>
            <div className="flex flex-row gap-4 bg-[#f0f0f0] px-4 py-2 rounded-xl text-sm">
              {/* Scan Barcode */}
              <div
                className={
                  state === "barcode"
                    ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer`
                }
                onClick={openBarcodeModal}
              >
                <p className="text-blue-700 font-semibold">Scan Barcode</p>
              </div>

              {/* Select Patient by Name */}
              <div
                className={
                  state === "select"
                    ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer`
                }
                onClick={openSelectModal}
              >
                <p className="text-blue-700 font-semibold">Select Patient</p>
              </div>

              {/* Create Patient */}
              <div
                className={
                  state === "create"
                    ? `bg-white items-center px-4 py-2 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.2)]`
                    : ` items-center px-4 py-2 rounded-xl cursor-pointer `
                }
                onClick={openCreateModal}
              >
                <p className="text-blue-700 font-semibold">Create Patient</p>
              </div>
            </div>
          </div>

          {/* Show Content */}
          <div className="w-full h-full">
            {/* Barcode content */}
            {state === "barcode" && (
              <div className="h-full flex items-center justify-center">
                <img src={barcodeImg} alt="" />
              </div>
            )}

            {/* Select Patient Content */}
            {state === "select" && (
              <div className="h-full">
                <SelectPatientContent patientSelected={patientSelected} />
              </div>
            )}

            {/* Create new patient content */}
            {state === "create" && (
              <div className="h-full">
                <CreatePatientContent patientSelected={patientSelected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
