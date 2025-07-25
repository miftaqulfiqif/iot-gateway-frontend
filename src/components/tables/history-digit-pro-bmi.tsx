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

export const TableHistoryBMI = ({
  data,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  currentPage,
  totalPage,
  isDetailPatient,
}: Props) => {
  const [animateRows, setAnimateRows] = useState(false);

  useEffect(() => {
    setAnimateRows(false);
    setTimeout(() => {
      setAnimateRows(true);
    }, 50);
  }, [currentPage]);

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
      <Table className="min-w-full">
        <TableHeader className="min-w-full">
          <TableRow className="h-14 text-xs ">
            <TableHead className="text-center font-bold">NO</TableHead>
            {!isDetailPatient && (
              <>
                <TableHead className="text-center font-bold">Name</TableHead>
                <TableHead className="text-center font-bold">Gender</TableHead>
                <TableHead className="text-center font-bold">Age</TableHead>
              </>
            )}
            <TableHead className="text-center font-bold">Weight</TableHead>
            <TableHead className="text-center font-bold">BMI</TableHead>
            <TableHead className="text-center font-bold">FAT</TableHead>
            <TableHead className="text-center font-bold">Muscle</TableHead>
            <TableHead className="text-center font-bold">Water</TableHead>
            <TableHead className="text-center font-bold">Visceral</TableHead>
            <TableHead className="text-center font-bold">Bone Mass</TableHead>
            <TableHead className="text-center font-bold">Metabolism</TableHead>
            <TableHead className="text-center font-bold">Protein</TableHead>
            <TableHead className="text-center font-bold">Obesity</TableHead>
            <TableHead className="text-center font-bold">Body Age</TableHead>
            <TableHead className="text-center font-bold">LBM</TableHead>
            <TableHead className="text-center font-bold">Date / Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
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
                  className={`border-gray-300 transition-all duration-500 ease-in-out cursor-pointer text-xs ${
                    animateRows
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  {!isDetailPatient && (
                    <>
                      <TableCell className="text-left">
                        {patient?.name || "-"}
                      </TableCell>
                      <TableCell className="text-left">
                        {patient?.gender || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {patient?.age || "-"}
                      </TableCell>
                    </>
                  )}

                  <TableCell className="text-center">
                    {item.weight || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.bmi || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.body_fat || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.muscle_mass || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.water || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.visceral_fat}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.bone_mass || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.metabolism || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.protein || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.obesity || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.body_age || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lbm || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(item.timestamp)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={19} className="text-center ">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={19} className="p-4 text-center">
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
