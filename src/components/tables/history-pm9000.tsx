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

const formatDate = (dateStr: string, showTime = true) => {
  if (showTime) {
    return format(new Date(dateStr), "d MMMM yyyy, HH:mm", { locale: id });
  }

  return format(new Date(dateStr), "d MMMM yyyy", { locale: id });
};

type Props = {
  data: any[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
  currentPage?: number;
  totalPage?: number;
  limit?: number;
  search?: string;
  isDetailPatient?: boolean;
};

export const TableHistoryPM9000 = ({
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
    setTimeout(() => setAnimateRows(true), 50);
  }, [currentPage]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
      <Table className="min-w-full">
        <TableHeader className="min-w-full">
          <TableRow className="h-14 ">
            <TableHead className="text-center font-bold">NO</TableHead>
            {!isDetailPatient && (
              <TableHead className="text-center font-bold">
                Patient Name
              </TableHead>
            )}
            <TableHead className="text-center font-bold">ECG</TableHead>
            <TableHead className="text-center font-bold">Sp02</TableHead>
            <TableHead className="text-center font-bold">RESP</TableHead>
            <TableHead className="text-center font-bold">Systolic</TableHead>
            <TableHead className="text-center font-bold">Diastolic</TableHead>
            <TableHead className="text-center font-bold">Mean</TableHead>
            <TableHead className="text-center font-bold">Temp 1</TableHead>
            <TableHead className="text-center font-bold">Temp 2</TableHead>
            <TableHead className="text-center font-bold">Delta Temp</TableHead>
            <TableHead className="text-center font-bold">Date / Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.slice(0, limit).map((item, index) => {
              const patient = item.patient_handler?.patient;
              return (
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
                  }}
                  className={`border-gray-300 transition-all duration-500 ease-in-out cursor-pointer ${
                    animateRows
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  {!isDetailPatient && (
                    <TableCell className="text-left">{patient?.name}</TableCell>
                  )}
                  <TableCell className="text-center">{item.ecg}</TableCell>
                  <TableCell className="text-center">{item.spo2}</TableCell>
                  <TableCell className="text-center">{item.resp}</TableCell>
                  <TableCell className="text-center">{item.systolic}</TableCell>
                  <TableCell className="text-center">
                    {item.diastolic}
                  </TableCell>
                  <TableCell className="text-center">{item.mean}</TableCell>
                  <TableCell className="text-center">{item.temp1}</TableCell>
                  <TableCell className="text-center">{item.temp2}</TableCell>
                  <TableCell className="text-center">
                    {item.delta_temp}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(new Date(item.timestamp), "MM/dd/yyyy, HH:mm")}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={12} className="text-center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12} className="p-4 text-center">
              <Pagination>
                <PaginationContent className="flex w-full justify-between">
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
                  <PaginationItem className="flex flex-row gap-2">
                    {[...Array(totalPage)].map((_, index) => (
                      <PaginationLink
                        key={index}
                        isActive={currentPage === index + 1}
                        onClick={() => goToPage(index + 1)}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    ))}
                  </PaginationItem>
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
