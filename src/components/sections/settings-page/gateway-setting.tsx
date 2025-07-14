import gatewayIcon from "@/assets/icons/gateway.png";
import gatewayWhiteIcon from "@/assets/icons/gateway-white.png";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { se } from "date-fns/locale";
import { useToast } from "@/context/ToastContext";

type Props = {
  setAddGatewayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGateway: React.Dispatch<React.SetStateAction<any>>;
  currentGateway: any;
  gateways: any[];
};

export const SettingGateway = ({
  setAddGatewayModal,
  setCurrentGateway,
  currentGateway,
  gateways,
}: Props) => {
  const { showToast } = useToast();
  const [selectedGateway, setSelectedGateway] = useState<any>(null);

  useEffect(() => {
    setSelectedGateway(selectedGateway);
    console.log("Selected Gateway:", selectedGateway);
  }, [selectedGateway]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between">
        <p className="text-2xl font-bold">Gateways</p>
        <a className="cursor-pointer" onClick={() => setAddGatewayModal(true)}>
          <div className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 w-fit">
            <p>Add gateway</p>
          </div>
        </a>
      </div>
      <div className="">
        <p className="mb-1">Current Gateway</p>
        <div className="flex w-full gap-2 h-26">
          <div className="flex flex-row w-full items-center justify-between  bg-gradient-to-b from-[#4956F4] to-[#6e79f4] text-white rounded-2xl p-1">
            <div className="flex justify-between w-1/2">
              <div className="flex gap-4 p-4">
                <img src={gatewayWhiteIcon} alt="" className="w-12 h-12" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{currentGateway.name}</p>
                  <p className="text-sm">{currentGateway.id}</p>
                </div>
              </div>
              <p
                className={`font-semibold px-4 py-1 rounded-full capitalize h-fit mr-4
    ${
      currentGateway.status === "active"
        ? "bg-green-200 text-green-900"
        : currentGateway.status === "inactive"
        ? "bg-gray-200 text-gray-800"
        : currentGateway.status === "maintenance"
        ? "bg-yellow-200 text-yellow-900"
        : ""
    }`}
              >
                {currentGateway.status}
              </p>
            </div>
            <div className="w-1/2 h-full border rounded-2xl p-2 bg-white border-blue-500 text-blue-500">
              <p className="text-sm">Description :</p>
              <p className="text-sm font-bold">{currentGateway.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p>List gateways</p>
          <div className="flex gap-2 items-center">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="border px-4 py-2 rounded-2xl focus:outline-blue-500 transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <hr className="border-t-2 border-blue-400" />

        <div className="flex flex-col gap-4 overflow-auto h-[300px]">
          {/* List Gateways */}
          {gateways.map((gateway) => (
            <div
              key={gateway.id}
              className={`flex flex-row justify-between items-center  rounded-2xl px-4 py-2 ${
                selectedGateway?.id === gateway.id
                  ? "border border-blue-500 transition duration-150 ease-in-out"
                  : "border hover:bg-gray-100"
              }`}
              onClick={() =>
                setSelectedGateway(
                  selectedGateway?.id === gateway.id ? null : gateway
                )
              }
            >
              <div className="flex items-center gap-4">
                <img src={gatewayIcon} alt="" className="w-12 h-12" />

                <div className="flex flex-col gap-2">
                  <div className="">
                    <p className="font-semibold">{gateway.name}</p>
                    <p className="text-xs text-[#A7A7A7]">{gateway.id}</p>
                  </div>
                  <p className="text-sm ">{gateway.description}</p>
                </div>
              </div>
              <p
                className={`font-semibold px-4 py-1 rounded-full capitalize 
    ${
      gateway.status === "active"
        ? "bg-green-200 text-green-900"
        : gateway.status === "inactive"
        ? "bg-gray-200 text-gray-800"
        : gateway.status === "maintenance"
        ? "bg-yellow-200 text-yellow-900"
        : ""
    }`}
              >
                {gateway.status}
              </p>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-xl font-bold cursor-pointer mt-10 disabled:bg-blue-200 disabled:cursor-not-allowed"
          onClick={() => {
            setCurrentGateway(selectedGateway);
            showToast(null, "Gateway changed successfully", "success");
          }}
          disabled={
            selectedGateway === null ||
            selectedGateway?.id === currentGateway?.id
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};
