import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MeasurementParameter } from "@/constants/measurement-parameter";
import { useDevices } from "@/hooks/api/use-device";

type Props = {
  gatewayId: {
    id: string;
  }[];
  deviceSelected: any;
  setDeviceSelected: (device: any) => void;
  isBaby?: boolean;
};

export const SelectDeviceContent = ({
  gatewayId,
  deviceSelected,
  setDeviceSelected,
  isBaby,
}: Props) => {
  const {
    devices,
    deviceMeasurementParameter,
    getAllDevices,
    getDeviceMeasurementParameters,
  } = useDevices();

  const inputRef = useRef<HTMLInputElement>(null);
  const [measurementType, setMeasurementType] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
    getDeviceMeasurementParameters();
  }, []);

  // create device types options from deviceMeasurementParameter
  const deviceTypes = [
    { value: "all", label: "All" },
    ...Object.keys(deviceMeasurementParameter)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => ({
        value: key,
        label: key
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      })),
  ];

  // fetch devices when search or gatewayId changes
  useEffect(() => {
    getAllDevices(
      gatewayId,
      measurementType === "all" ? undefined : measurementType,
      isBaby
    );
  }, [search, measurementType, gatewayId]);

  return (
    <div className="flex flex-col h-full">
      {/* Select Measurement Type */}
      <p className="font-bold mb-2 pl-1 text-sm md:text-lg lg:text-lg">
        Select Measurement Type
      </p>
      <div className="flex justify-between items-center">
        <Select
          value={measurementType}
          onValueChange={(value) => setMeasurementType(value)}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Select measurement type" />
          </SelectTrigger>
          <SelectContent>
            {deviceTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select Device */}
      {measurementType && (
        <div className="flex flex-col justify-between mt-4">
          <p className="font-bold mb-2 pl-1 text-sm md:text-lg lg:text-lg">
            Select device
          </p>

          {/* Form Search */}
          <form
            className="flex flex-row items-center"
            onSubmit={(e) => {
              e.preventDefault();
              // searchPatients(search);
            }}
          >
            <label htmlFor="device-name"></label>
            <div className="flex gap-2 w-full">
              <input
                ref={inputRef}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                id="device-name"
                type="text"
                placeholder="Input device name here"
                className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
              >
                Search
              </button>
            </div>
          </form>

          {/* List devices */}
          <div className="relative bg-white rounded-2xl mt-4 p-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] overflow-y-auto border max-h-[420px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[1000px]">
            <table className="w-full text-xs md:text-sm lg:text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2">Device Name</th>
                  <th className="py-2">Model</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Gateway</th>
                </tr>
              </thead>
              <tbody>
                {devices?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      {search.trim() === ""
                        ? "No devices found."
                        : "No devices found with the given search query."}
                    </td>
                  </tr>
                ) : (
                  devices?.map((device) => (
                    <tr
                      key={device.id}
                      className={`cursor-pointer ${
                        deviceSelected?.id === device.id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setDeviceSelected(device)}
                    >
                      <td className="p-2 text-center">{device.name}</td>
                      <td className="p-2">{device.model}</td>
                      <td className="p-2 text-center font-bold">
                        <p
                          className={`px-3 py-1 rounded-full w-fit mx-auto ${
                            device.is_connected
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {device.is_connected ? "Connected" : "Disconnected"}
                        </p>
                      </td>
                      <td className="p-2 text-center flex items-center justify-center gap-1">
                        {device.gateway_id}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
