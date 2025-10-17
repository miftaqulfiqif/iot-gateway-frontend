import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Trash2, Wifi, WifiOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { useNavigate } from "react-router-dom";
import { IotGatewayModel } from "@/models/GatewayModel";

// Utility function to format date
const formatDate = (dateStr: string, showTime = true) => {
  if (showTime) {
    return format(new Date(dateStr), "d MMMM yyyy, HH:mm", { locale: id });
  }

  return format(new Date(dateStr), "d MMMM yyyy", { locale: id });
};

type Props = {
  data: IotGatewayModel;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
  currentPage?: number;
  totalPage?: number;
};

export const TableGateways = ({
  data,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  currentPage,
  totalPage,
}: Props) => {
  const [animateRows, setAnimateRows] = useState(false);
  const navigate = useNavigate();

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
            <TableHead className="text-center font-bold">NO</TableHead>
            <TableHead className="text-center font-bold">Gateway ID</TableHead>
            <TableHead className="text-center font-bold">
              Name & Description
            </TableHead>
            <TableHead className="text-center font-bold">Location</TableHead>
            <TableHead className="text-center font-bold">Network</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Devices</TableHead>
            <TableHead className="text-center font-bold">Uptime</TableHead>
            <TableHead className="text-center font-bold">Firmware</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.data.length > 0 ? (
            data.data.map((item, index) => {
              return (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    // navigate("/users/detail-user/nurse/" + item.id);
                    alert("Detail Gateway is not ready yet");
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    animateRows ? "opacity-100" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-left">{item.id || "-"}</TableCell>

                  {/* Name & Description */}
                  <TableCell className="text-left">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {item.name || "-"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.description || "-"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-left">
                    {item.location || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.network || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status && (
                      <p
                        className={`font-semibold rounded-full py-2 px-3 flex items-center gap-2 justify-center w-fit mx-auto
      ${
        item.status ? "bg-green-100 text-green-900" : "bg-red-100 text-red-700"
      }`}
                      >
                        {" "}
                        <span>
                          {item.status ? (
                            <Wifi className="w-5" />
                          ) : (
                            <WifiOff className="w-5" />
                          )}
                        </span>
                        {item.status ? "Online" : "Offline"}
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <p className="font-bold bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center mx-auto">
                      {item.device_count || "0"}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.uptime || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="border-2 rounded-full">
                      {item.firmware || "-"}
                    </p>
                  </TableCell>

                  <TableCell className="px-2 py-1">
                    <div className="flex justify-center items-center">
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
                              This action cannot be undone. This will
                              permanently delete this item.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-black border">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => alert("delete")}
                              className="bg-red-500 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-6">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10} className="p-4 text-center">
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
