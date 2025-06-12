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

const MeasurementHistoriesPage = () => {
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
    <MainLayout title="Measurement Histories" state="Measurement Histories">
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
                <div className="w-full bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
                  <Table className="min-w-full">
                    <TableHeader className="min-w-full">
                      <TableRow className="h-14 ">
                        <TableHead className="text-center font-bold">
                          NO
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Name
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Phone
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Gender
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Place of birth
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Date of Birth
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients && patients.length > 0 ? (
                        patients.map((item, index) => (
                          <TableRow
                            key={item.id}
                            onClick={(e) => {
                              const target = e.target as HTMLElement;
                              if (
                                target.closest("button") ||
                                target.closest("[data-stop-click]")
                              ) {
                                return;
                              }

                              openDetail(item.id);
                            }}
                            className={`border-gray-300 transition-all duration-500 ease-in-out cursor-pointer ${
                              animateRows
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2"
                            }`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            <TableCell className="text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-left">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.phone}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.gender}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.place_of_birth}
                            </TableCell>
                            <TableCell className="text-center">
                              {new Intl.DateTimeFormat("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }).format(new Date(item.date_of_birth))}
                            </TableCell>

                            <TableCell className="text-center text-xl">
                              <div className="flex flex-row justify-center gap-5 text-base text-white items-center">
                                {/* Edit */}
                                <button
                                  className="flex flex-row items-center gap-2 bg-blue-500 px-5 py-1 rounded-full cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    buttonAction("edit", item);
                                  }}
                                >
                                  <SquarePen className="w-5 h-5" />
                                  Edit
                                </button>

                                {/* Delete */}
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Trash2
                                      className="w-7 h-7 cursor-pointer text-red-500"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    />
                                    {/* <MdDeleteOutline
                                  className="w-7 h-7 cursor-pointer"
                                  color="red"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                /> */}
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-white border-0">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this item and remove
                                        it from our system.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-0 text-black cursor-pointer">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => alert("Delete")}
                                        className="bg-red-500 text-white cursor-pointer"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center">
                            No data
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={7} className="p-4 text-center">
                          <Pagination>
                            <PaginationContent className="flex w-full justify-between">
                              <PaginationItem>
                                <PaginationPrevious
                                  onClick={() => goToPreviousPage("patient")}
                                  isActive={currentPage === 1}
                                  className={
                                    currentPage === 1
                                      ? "pointer-events-none opacity-50"
                                      : "cursor-pointer"
                                  }
                                />
                              </PaginationItem>
                              <PaginationItem className="flex flex-row gap-2">
                                {[...Array(totalPage)].map((_, index) => (
                                  <PaginationLink
                                    key={index}
                                    isActive={currentPage === index + 1}
                                    onClick={() =>
                                      goToPage("patient", index + 1)
                                    }
                                    className="cursor-pointer"
                                  >
                                    {index + 1}
                                  </PaginationLink>
                                ))}
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationNext
                                  onClick={() => goToNextPage("patient")}
                                  isActive={currentPage === totalPage}
                                  className={
                                    currentPage === totalPage
                                      ? "pointer-events-none opacity-50"
                                      : "cursor-pointer"
                                  }
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
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

export default MeasurementHistoriesPage;
