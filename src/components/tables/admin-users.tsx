import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
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

// Utility function to format date
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
};

export const TableAdminUsers = ({
  data,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  currentPage,
  totalPage,
  limit,
  search,
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
            <TableHead className="text-center font-bold">Name</TableHead>
            <TableHead className="text-center font-bold">Email</TableHead>
            <TableHead className="text-center font-bold">Phone</TableHead>
            <TableHead className="text-center font-bold">Username</TableHead>
            <TableHead className="text-center font-bold">Role</TableHead>
            <TableHead className="text-center font-bold">Created At</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <TableRow
                  key={item.id}
                  onClick={() => {
                    if (item.role === "admin") {
                      navigate("/users/detail-user/admin/" + item.id);
                    } else if (item.role === "doctor") {
                      navigate("/users/detail-user/doctor/" + item.id);
                    } else if (item.role === "nurse") {
                      navigate("/users/detail-user/nurse/" + item.id);
                    } else {
                      navigate("/error");
                    }
                    // window.location.href = `/users/detail-user/${item.id}`;
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    animateRows ? "opacity-100" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-left">
                    {item.name || "-"}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.email || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.phone || "-"}
                  </TableCell>
                  <TableCell className="text-center">{item.username}</TableCell>
                  <TableCell className="text-center">{item.role}</TableCell>

                  <TableCell className="text-center">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell className=" px-2 py-1">
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
