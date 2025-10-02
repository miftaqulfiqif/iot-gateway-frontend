import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";

type Props = {
  patients: any;
  animateRows: boolean;
  buttonAction: (action: string, patient: any) => void;
  setPatientSelected?: (id: string) => void;
  goToPreviousPage: (state: string) => void;
  goToNextPage: (state: string) => void;
  goToPage: (state: string, page: number) => void;
  currentPage?: number;
  totalPage?: number;
};

const conditionClass = {
  critical: "text-red-900 bg-red-200 font-bold",
  stable: "text-greny-900 bg-green-200 font-bold",
  "under observation": "text-yellow-900 bg-yellow-200 font-bold",
  recovered: "text-green-900 bg-green-200 font-bold",
};

export const TablePatients = ({
  patients,
  animateRows,
  buttonAction,
  setPatientSelected,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  currentPage,
  totalPage,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
      <Table className="min-w-full">
        <TableHeader className="min-w-full">
          <TableRow className="h-14 ">
            <TableHead className="text-center font-bold">NO</TableHead>
            <TableHead className="text-center font-bold">Patient ID</TableHead>
            <TableHead className="text-center font-bold">Name</TableHead>
            <TableHead className="text-center font-bold">Age</TableHead>
            <TableHead className="text-center font-bold">Gender</TableHead>
            <TableHead className="text-center font-bold">Room</TableHead>
            <TableHead className="text-center font-bold">Condition</TableHead>
            <TableHead className="text-center font-bold">
              Admission Date
            </TableHead>
            <TableHead className="text-center font-bold">
              Last Measurement
            </TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients && patients.length > 0 ? (
            patients.map((item, index) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  window.location.href = `/detail-patient/${item.id}`;
                }}
                className={`border-gray-300 transition-all duration-500 ease-in-out cursor-pointer ${
                  animateRows
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-left">{item.name}</TableCell>
                <TableCell className="text-center">{item.age}</TableCell>
                <TableCell className="text-center">{item.gender}</TableCell>
                <TableCell className="text-center">
                  {item?.patient_room
                    ? `${item?.patient_room?.room?.name} - ${item?.patient_room?.room?.number} - ${item?.patient_room?.room?.type}`
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  <p
                    className={`text-center rounded-full py-1 ${
                      conditionClass[item.condition] || "-"
                    }`}
                  >
                    {item.condition ?? "-"}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  {format(item.created_at, "yyyy-MM-dd")}
                </TableCell>
                <TableCell className="text-center">
                  {item.last_measurement ? (
                    format(item.last_measurement, "yyyy-MM-dd HH:mm")
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>

                <TableCell className="text-center text-xl">
                  <div className="flex flex-row justify-center gap-5 text-base text-white items-center">
                    {/* Edit */}
                    <button
                      className="flex flex-row items-center gap-2 border-blue-500 border-1 px-3 py-1 rounded-full cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        buttonAction("edit", item);
                      }}
                    >
                      <SquarePen className="w-5 h-5 text-blue-500" />
                    </button>
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
            <TableCell colSpan={10} className="p-4 text-center">
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
                        onClick={() => goToPage("patient", index + 1)}
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
  );
};
