import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

const ToastContext = createContext<{
  showToast: (message: string, type: Toast["type"]) => void;
} | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toast.map((toast) => (
          <div
            className={`px-4 py-2 rounded shadow text-white ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
