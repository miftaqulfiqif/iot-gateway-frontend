import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HistoryItem = {
  recorded_at: string;
  systolic: number;
  diastolic: number;
  mean: number;
};

type Props = {
  historiesData: HistoryItem[];
};

export function HistoryPM9000Nibp({ historiesData }: Props) {
  const formatDate = (recorded_at: string) => {
    const date = new Date(recorded_at);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="overflow-x-auto rounded-2xl h-full">
        <Table className="min-w-full table-auto h-full">
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
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-400"
                >
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
                    {formatDate(item.recorded_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
