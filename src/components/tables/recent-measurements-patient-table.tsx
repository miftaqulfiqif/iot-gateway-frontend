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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

type Data = {
  id: string;
  parameter: string;
  value: string;
  device: string;
  room: string;
  timestamp: string;
};
type Props = {
  data: Data[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
  currentPage?: number;
  totalPage?: number;
  limit?: number;
  search?: string;
  isDetailPatient?: boolean;
};

export const RecentMeasurementsPatientTable = ({
  data,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  currentPage,
  totalPage,
  limit,
  search,
  isDetailPatient,
}: Props) => {
  const [animateRows, setAnimateRows] = useState(false);

  console.log(data);

  useEffect(() => {
    setAnimateRows(false);
    setTimeout(() => {
      setAnimateRows(true);
    }, 50);
  }, [currentPage]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <Table className="min-w-full">
        <TableHeader className="min-w-full">
          <TableRow className="h-14 ">
            <TableHead className="text-center font-bold">No</TableHead>
            <TableHead className="text-left font-bold">Parameter</TableHead>
            <TableHead className="text-left font-bold">Value</TableHead>
            <TableHead className="text-left font-bold">Device</TableHead>
            <TableHead className="text-left font-bold">Room</TableHead>
            <TableHead className="text-center font-bold">Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <TableRow
                  key={item.id}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                      target.closest("button") ||
                      target.closest("[data-stop-click]")
                    )
                      return;
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    animateRows ? "opacity-100" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-left">
                    {item.parameter || "-"}
                  </TableCell>
                  <TableCell className="text-left text-blue-500 font-bold">
                    {item.value || "-"}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.device || "-"}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.room || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(new Date(item.timestamp), "d MMMM yyyy", {
                      locale: id,
                    })}
                  </TableCell>
                  {/* <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2
                          className="w-6 h-6 text-red-500 hover:text-red-700"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this item.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-black border">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => buttonAction("delete", item)}
                            className="bg-red-500 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell> */}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="p-4 text-center">
              <Pagination>
                <PaginationContent className="flex justify-between w-full gap-4">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={goToPreviousPage}
                      isActive={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  <div className="flex gap-2">
                    {[...Array(totalPage)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => goToPage(index + 1)}
                          className="cursor-pointer"
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </div>
                  <PaginationItem>
                    <PaginationNext
                      onClick={goToNextPage}
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
