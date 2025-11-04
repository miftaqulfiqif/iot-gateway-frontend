import { useEffect, useRef, useState } from "react";

type Props = {
  beds: any;
  bedSelected: any;
  setBedSelected: (room: any) => void;
};

export const SelectBedContent = ({
  beds,
  bedSelected,
  setBedSelected,
}: Props) => {
  return (
    <div className="flex flex-col h-full">
      {/* List Rooms */}
      <div className="relative bg-white rounded-2xl mt-4 p-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] overflow-y-auto border max-h-[420px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[1000px]">
        <table className="w-full text-xs md:text-sm lg:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Bed Number</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {beds && beds.length > 0 ? (
              beds.map((bed: any) => (
                <tr
                  key={bed.id}
                  className={`cursor-pointer ${
                    bedSelected?.id === bed.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setBedSelected(bed)}
                >
                  <td className="p-2">
                    <p>{bed.bed_number}</p>
                  </td>
                  <td className="p-2 text-center font-bold">{bed.type}</td>
                  <td className="p-2 text-center font-bold">{bed.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No Beds found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
