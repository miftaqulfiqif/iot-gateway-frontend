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
import DetailPatient from "@/components/sections/patients-page/detail-patient";
import { useToast } from "@/context/ToastContext";

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
  const [patientSelected, setPatientSelected] = useState("");
  const { showToast } = useToast();

  return (
    <MainLayout title="Patients" state="Patients">
      <div className="flex flex-col">
        {!patientSelected && (
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
        )}
        <div className="flex flex-col gap-4 pb-20 mt-4 px-2 h-full">
          <div className="flex flex-row gap-4">
            <div className="w-full">
              {/* Table */}
              {!patientSelected && (
                <TablePatients
                  patients={patients}
                  animateRows={animateRows}
                  buttonAction={buttonAction}
                  setPatientSelected={(id: string) => setPatientSelected(id)}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  currentPage={currentPage}
                  totalPage={totalPage}
                />
              )}
              {patientSelected && (
                <div className="w-full h-full">
                  <button
                    className="text-white bg-[#0D00FF] px-4 py-1.5 mb-2 rounded-lg cursor-pointer"
                    onClick={() => setPatientSelected("")}
                  >
                    Back
                  </button>
                  <DetailPatient patientId={patientSelected} />
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
        showToast={showToast}
      />
    </MainLayout>
  );
};

export default Patients;
