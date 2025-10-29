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
  weight: number;
  bmi: number;
  age: number;
  bodyFat: number;
  muscleMass: number;
  water: number;
  visceralFat: number;
  boneMass: number;
  metabolism: number;
  protein: number;
  obesity: number;
  bodyAge: number;
  lbm: number;
};

type Props = {
  historiesData: HistoryItem[];
};

export function HistoryBMI({ historiesData }: Props) {
  const formatNumber = (value: number) => value.toFixed(1);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full table-auto bg-white">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700 text-sm">
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              No
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Weight (kg)
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              BMI
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Body Fat (%)
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Muscle Mass
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Water (%)
            </TableHead>
            <TableHead className="text-center whitespace-nowrap px-3 py-2">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-800 text-sm">
          {historiesData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-400">
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
                  {formatNumber(item.weight)}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {formatNumber(item.bmi)}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {formatNumber(item.bodyFat)}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {formatNumber(item.muscleMass)}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {formatNumber(item.water)}
                </TableCell>
                <TableCell className="text-center px-3 py-2">
                  {new Date(item.timestamp).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
