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
import { HistoriesMeasurement } from "@/models/HistoriesMeasurementModel";

type Props = {
  data: HistoriesMeasurement;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
  isDetailPatient?: boolean;
  currentPage?: number;
};

export const RecentMeasurementsPatientTable = ({
  data,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  isDetailPatient,
}: Props) => {
  const [animateRows, setAnimateRows] = useState(false);

  useEffect(() => {
    setAnimateRows(false);
    const timer = setTimeout(() => {
      setAnimateRows(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [data.current_page]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="h-14">
            <TableHead className="text-center font-bold">No</TableHead>
            {!isDetailPatient && (
              <>
                <TableHead className="text-center font-bold">
                  Patient ID
                </TableHead>
                <TableHead className="text-left font-bold">
                  Patient Name
                </TableHead>
              </>
            )}
            <TableHead className="text-left font-bold">Parameter</TableHead>
            <TableHead className="text-left font-bold">Value</TableHead>
            <TableHead className="text-left font-bold">Device</TableHead>
            <TableHead className="text-left font-bold">Room</TableHead>
            <TableHead className="text-center font-bold">Date & Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.data.length > 0 ? (
            data.data.map((item, index) => (
              <TableRow
                key={item.id}
                className={`transition-all duration-300 cursor-pointer ${
                  animateRows ? "opacity-100" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <TableCell className="text-center">
                  {index + 1 + (data.current_page - 1) * 10}
                </TableCell>

                {!isDetailPatient && (
                  <>
                    <TableCell className="text-center">
                      {item.patient_id || "-"}
                    </TableCell>
                    <TableCell className="text-left">
                      {item.name || "-"}
                    </TableCell>
                  </>
                )}

                <TableCell className="text-left">
                  {item.parameter || "-"}
                </TableCell>
                <TableCell className="text-left text-blue-500 font-bold">
                  {item.value || "-"}
                </TableCell>
                <TableCell className="text-left">
                  {item.device || "-"}
                </TableCell>
                <TableCell className="text-left">{item.room || "-"}</TableCell>
                <TableCell className="text-center">
                  {format(new Date(item.recorded_at), "d MMMM yyyy, HH:mm", {
                    locale: id,
                  })}
                </TableCell>
              </TableRow>
            ))
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
                      className={
                        data.current_page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  <div className="flex gap-2">
                    {[...Array(data.total_pages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={data.current_page === index + 1}
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
                      className={
                        data.current_page === data.total_pages
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
