import { useEffect, useRef, useState } from "react";
import {
  ArrowBigLeftDash,
  Bluetooth,
  Cpu,
  EthernetPort,
  Key,
  LandPlot,
  Mars,
  ScanSearch,
  Venus,
  Wifi,
} from "lucide-react";
import { Devices } from "@/models/DeviceModel";
import Sidebar from "../layouts/sidebar";

import babyImg from "@/assets/imgs/baby.png";
import { useBabies } from "@/hooks/api/use-baby";
import { InputText } from "../ui/input-text";
import { InputSelect } from "../ui/input-select";
import { InputDate } from "../ui/input-date";

type Props = {
  isActive: boolean;
  baby: any;
  babySelected: (baby: any) => void;
  patientId: string;
};

export const SelectBaby = ({ isActive, babySelected, patientId }: Props) => {
  const {
    getBabiesByPatientId,
    babies,
    formik,
    showCreateModal,
    setShowCreateModal,
  } = useBabies(patientId);

  // Fetch babies by patient id
  useEffect(() => {
    if (isActive && patientId) {
      getBabiesByPatientId();
    }
  }, [isActive, patientId]);

  return (
    <div
      className={`fixed right-0 top-0 w-full h-full bg-transparent bg-opacity-50 z-40 transition-opacity duration-300  ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div className="w-full h-full p-4">
        {/* Component Sidebar */}
        <Sidebar state="Measurement" />
      </div>
      {/* Back */}
      <button
        className="absolute top-4 left-82 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 z-50"
        onClick={() => window.history.back()}
      >
        <div className="flex gap-2 items-center">
          <ArrowBigLeftDash />
          <p>Back</p>
        </div>
      </button>

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
          {/* Option Select Baby */}
          <div className="flex flex-row items-center justify-between">
            {!showCreateModal ? (
              <p className="font-bold text-xl">Select Baby</p>
            ) : (
              <p className="font-bold text-xl">Create Baby</p>
            )}

            {/* Button create baby */}
            <div
              className="cursor-pointer"
              onClick={() => setShowCreateModal(!showCreateModal)}
            >
              {!showCreateModal ? "Create Baby" : "Select baby"}
            </div>
          </div>

          {/* Content */}
          <div className="w-full h-full">
            {!showCreateModal ? (
              babies.length > 0 ? (
                <div className="flex flex-col gap-4 overflow-y-auto pb-4 max-h-[550px]">
                  {babies.map((baby: any) => (
                    <div
                      key={baby.id}
                      className="flex flex-row gap-2 bg-blue-500 items-center rounded-2xl cursor-pointer p-4 min-w-[300px]"
                      onClick={() => babySelected(baby)}
                    >
                      <img src={babyImg} alt="" className="w-42 h-42" />
                      <div className="flex flex-col gap-2 text-white">
                        <p className="text-2xl">{baby?.name || " -- "}</p>
                        {baby?.gender === "male" ? (
                          <div className="flex flex-row items-center gap-1 bg-blue-200 w-fit font-bold px-3 py-1 rounded-full shadow text-black text-sm">
                            <p>Male</p>
                            <Mars className="w-6 h-6" />
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-1 bg-pink-200 w-fit font-bold px-3 py-1 rounded-full shadow text-black text-sm">
                            <p>Female</p>
                            <Venus className="w-6 h-6" />
                          </div>
                        )}
                        <div className="flex flex-row gap-2 text-white">
                          <div className="flex flex-col gap-1">
                            <p>Place of birth</p>
                            <p>Date of birth</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>:</p>
                            <p>:</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p>{baby?.place_of_birth || " -- "}</p>
                            <p>
                              {baby?.date_of_birth
                                ? new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }).format(new Date(baby.date_of_birth))
                                : " -- "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 w-full h-full flex justify-center items-center">
                  No babies found
                </p>
              )
            ) : (
              <form
                className="flex flex-col gap-4 pt-6"
                onSubmit={formik.handleSubmit}
              >
                <InputText
                  name="name"
                  label="Name"
                  placeholder="Input name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onTouch={formik.touched.name}
                  onError={formik.errors.name}
                  isRequired
                />
                <InputSelect
                  label="Gender"
                  name="gender"
                  placeholder="Select gender"
                  option={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                  value={formik.values.gender}
                  onTouch={formik.touched.gender}
                  onError={formik.errors.gender}
                  isRequired
                />
                <InputText
                  name="place_of_birth"
                  label="Place of birth"
                  placeholder="Input place of birth"
                  onChange={formik.handleChange}
                  value={formik.values.place_of_birth}
                  onTouch={formik.touched.place_of_birth}
                  onError={formik.errors.place_of_birth}
                />
                <InputDate
                  name="date_of_birth"
                  label="Date of birth"
                  onChange={formik.handleChange}
                  value={formik.values.date_of_birth}
                  onTouch={formik.touched.date_of_birth}
                  onError={formik.errors.date_of_birth}
                  isRequired
                />
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-xl cursor-pointer mt-10"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
