import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HistoryItem = {
  timestamp: string;
  systolic: number;
  diastolic: number;
  mean: number;
};

type Props = {
  historiesData: HistoryItem[];
};

export function HistoryPM9000Nibp({ historiesData }: Props) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatNumber = (value: number) => value.toFixed(1);

  return (
    <div className="overflow-x-auto rounded-2xl">
      <Table className="min-w-full table-auto bg-white">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700 text-sm">
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              No
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Systolic
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Diastolic
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Mean
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-800 text-sm">
          {historiesData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-400">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            historiesData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center px-3 py-2">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {item.systolic}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {item.diastolic}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {item.mean}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {formatDate(item.timestamp)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
