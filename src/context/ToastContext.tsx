import { Ban, CheckCheck, Info, TriangleAlert, X } from "lucide-react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Toast = {
  id: number;
  title?: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
};

const ToastContext = createContext<{
  showToast: (
    title: string | null | undefined,
    message: string,
    type: Toast["type"]
  ) => void;
} | null>(null);

export const useToast = () => useContext(ToastContext)!;

const getIcon = (type: Toast["type"]) => {
  const iconProps = { className: "w-6 h-6" };
  switch (type) {
    case "info":
      return <Info {...iconProps} />;
    case "success":
      return <CheckCheck {...iconProps} />;
    case "warning":
      return <TriangleAlert {...iconProps} />;
    case "error":
      return <Ban {...iconProps} />;
    default:
      return null;
  }
};

const getColorClass = (type: Toast["type"]) => {
  const base = "shadow-[0_4px_4px_rgba(0,0,0,0.25)]";
  switch (type) {
    case "info":
      return `text-blue-500 ${base} shadow-blue-500/50`;
    case "success":
      return `text-green-500 ${base} shadow-green-500/50`;
    case "warning":
      return `text-yellow-500 ${base} shadow-yellow-500/50`;
    case "error":
      return `text-red-500 ${base} shadow-red-500/50`;
    default:
      return "";
  }
};

const getBgColor = (type: Toast["type"]) => {
  switch (type) {
    case "info":
      return "bg-blue-200";
    case "success":
      return "bg-green-200";
    case "warning":
      return "bg-yellow-200";
    case "error":
      return "bg-red-200";
    default:
      return "bg-gray-200";
  }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    title: string | null | undefined,
    message: string,
    type: Toast["type"] = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      { id, title: title ?? undefined, message, type },
    ]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-10 right-8 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-4 w-fit px-4 py-3 rounded-xl bg-white border-2 ${getColorClass(
              toast.type
            )}`}
          >
            <div
              className={`w-12 h-12 ${getBgColor(
                toast.type
              )} rounded-sm flex items-center justify-center`}
            >
              {getIcon(toast.type)}
            </div>
            <div className="flex flex-col w-62">
              <p className="text-black font-bold capitalize">
                {toast.title ?? toast.type}
              </p>
              <p className="text-black text-sm">{toast.message}</p>
            </div>
            <X
              className="w-8 h-8 cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
