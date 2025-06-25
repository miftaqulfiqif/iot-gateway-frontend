import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MainLayout from "../components/layouts/main-layout";
import {
  CircleArrowLeft,
  Download,
  Funnel,
  Search,
  SquarePen,
  Trash2,
  User2Icon,
  UserRoundPlus,
} from "lucide-react";
import { InputDate } from "@/components/ui/input-date";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Patients } from "@/models/PatientModel";
import { useHistoryMeasurement } from "@/hooks/UseHistoryMeasurement";
import axios from "axios";
import { CreateNewPatient } from "@/components/modals/create-new-patient";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { TablePatients } from "@/components/tables/patients";

const Patients = () => {
  const {
    isVisible,
    limit,
    handleLimitChange,
    filterRef,
    setShowFilter,
    showFilter,
    setPatientEdit,
    setForm,
    search,
    handleSearchChange,
    patientId,
    patients,
    openDetail,
    animateRows,
    goToNextPage,
    goToPreviousPage,
    currentPage,
    totalPage,
    goToPage,
    isDetailVisible,
    setIsExiting,
    setIsVisible,
    setPatientId,
    selectedPatient,
    isExiting,
    form,
    closeForm,
    setPatients,
    fetchPatients,
    patientEdit,
    buttonAction,
  } = UsePatientPage();
  return (
    <MainLayout title="Patients" state="Patients">
      <div className="flex flex-col">
        <div className="sticky top-0 z-50 bg-[#ededf9] mb-2">
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-6 w-full justify-between">
              <div className="flex items-center gap-2">
                <p>Showing</p>
                <Select
                  value={limit.toString()}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="w-fit bg-[rgba(117,195,255,0.5)]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10" className="hover:bg-[#ECECEC]">
                      10
                    </SelectItem>
                    <SelectItem value="20" className="hover:bg-[#ECECEC]">
                      20
                    </SelectItem>
                    <SelectItem value="30" className="hover:bg-[#ECECEC]">
                      30
                    </SelectItem>
                    <SelectItem value="50" className="hover:bg-[#ECECEC]">
                      50
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                      setPatientEdit(undefined);
                      setForm(true);
                    }}
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    <p className="text-white">Add Patient</p>
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="bg-white rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                    style={{ opacity: isVisible ? 0.5 : 1 }}
                  >
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
                        onChange={handleSearchChange}
                        className="px-2 focus:outline-none"
                        disabled={isVisible}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              {/* Table */}
              {!patientId ? (
                <TablePatients
                  patients={patients}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  openDetail={openDetail}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              ) : (
                <div className="">
                  {isVisible && (
                    <div
                      className={`transition-all duration-300 transform ${
                        isDetailVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {isVisible && (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-row gap-4">
                            <div className="w-1/2 p-5 bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)] flex flex-col gap-4">
                              <div className="flex flex-row justify-between">
                                <div
                                  className="flex items-center gap-2 bg-blue-200 w-fit h-fit px-4 py-2 rounded-full cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.3)]"
                                  onClick={() => {
                                    setIsExiting(true);
                                    setTimeout(() => {
                                      setIsExiting(false);
                                      setIsVisible(false);
                                      setPatientId(0);
                                    }, 300);
                                  }}
                                >
                                  <CircleArrowLeft className="w-6 h-6" />
                                  <p className="text-lg font-semibold">
                                    Back to list Patient
                                  </p>
                                </div>
                                <img
                                  src={selectedPatient?.barcode_image}
                                  alt=""
                                  className="h-15 mr-4 mt-2"
                                />
                              </div>

                              {/* CARD DETAIL PATIENT */}
                              <div className="flex flex-col bg-blue-200 p-4 rounded-2xl gap-2">
                                <div className="flex gap-2">
                                  <User2Icon />
                                  <p className="text-xl font-semibold">
                                    Detail Patient
                                  </p>
                                </div>

                                <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Name</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.name}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Gender</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.gender}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Phone</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.phone ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Work</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.work ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Last Education</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.last_education ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Place of Birth</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient?.place_of_birth ?? "-"}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <p className="w-32">Date of Birth</p>
                                    <p className="mr-2">:</p>
                                    <p className="font-semibold flex-1">
                                      {selectedPatient
                                        ? new Intl.DateTimeFormat("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          }).format(
                                            new Date(
                                              selectedPatient?.date_of_birth
                                            )
                                          )
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`w-1/2 bg-white rounded-2xl transition-all duration-300 ease-in-out transform ${
                                isExiting
                                  ? "translate-y-4 opacity-0"
                                  : "translate-y-0 opacity-100"
                              }`}
                            >
                              <div className="w-full h-full p-5 bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)] flex flex-col gap-4">
                                <p className="text-blue-700">
                                  History Measurement Patient
                                </p>

                                {/* <Component chartData={chartData} /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateNewPatient
        form={form}
        closeModal={closeForm}
        setPatient={setPatients}
        fetchPatients={fetchPatients}
        patient={patientEdit}
      />
    </MainLayout>
  );
};

export default Patients;
