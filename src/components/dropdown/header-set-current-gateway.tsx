import { Check, Plus, Search } from "lucide-react";
import gatewayIcon from "@/assets/icons/gateway.png";
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentGateway: any;
  tempSelectedGateway: any;
  setTempSelectedGateway: React.Dispatch<React.SetStateAction<any>>;
  setCurrentGateway: React.Dispatch<React.SetStateAction<any>>;
  gateways: any[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  changeGateway: () => void;
};

export const SetCurrentGateway = ({
  isOpen,
  onClose,
  currentGateway,
  tempSelectedGateway,
  setTempSelectedGateway,
  setCurrentGateway,
  gateways,
  setQuery,
  changeGateway,
}: Props) => {
  const handleSelectGateway = () => {
    setCurrentGateway(tempSelectedGateway);
    changeGateway();
    onClose();
  };

  return (
    <div
      className={`absolute right-0 z-20 mt-2 w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p>List gateways</p>
          <div className="flex gap-2 items-center">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="border-2 px-4 py-2 rounded-2xl focus:outline-blue-500 transition duration-150 ease-in-out"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Plus className="bg-blue-500 text-white rounded" />
          </div>
        </div>

        <hr className="border-t-2 border-blue-400" />

        <div className="flex flex-col gap-4 overflow-auto h-[300px]">
          {/* List Gateways */}
          {[...gateways]
            .sort((a, b) => {
              if (a.id === currentGateway?.id) return -1;
              if (b.id === currentGateway?.id) return 1;
              return 0;
            })
            .map((gateway) => (
              <div
                key={gateway.id}
                className={`flex flex-row justify-between items-center rounded-2xl px-4 py-2 ${
                  tempSelectedGateway?.id === gateway.id
                    ? "border border-blue-500 transition duration-150 ease-in-out"
                    : "border hover:bg-gray-100"
                }`}
                onClick={() =>
                  setTempSelectedGateway(
                    tempSelectedGateway?.id === gateway.id ? null : gateway
                  )
                }
              >
                <div className="flex items-center gap-4">
                  <img src={gatewayIcon} alt="" className="w-12 h-12" />

                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-semibold">{gateway.name}</p>
                      <p className="text-xs text-[#A7A7A7]">{gateway.id}</p>
                    </div>
                    <p className="text-sm">{gateway.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentGateway?.id === gateway.id && (
                    <Check className="text-blue-500" />
                  )}
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
              </div>
            ))}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="bg-blue-500 text-white p-2 rounded-xl font-bold cursor-pointer mt-10 disabled:bg-blue-200 disabled:cursor-not-allowed"
              disabled={tempSelectedGateway?.id === currentGateway?.id}
            >
              Save Changes
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white z-60">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Change a gateway will replace the current gateway
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="text-black border"
                data-alert-dialog-content
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSelectGateway}
                className="bg-blue-500 text-white"
              >
                Change
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
