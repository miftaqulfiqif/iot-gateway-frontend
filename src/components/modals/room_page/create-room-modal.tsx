import { useEffect } from "react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomData: {
    number: string;
    type: string;
    capacity: number;
  }) => void;
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRoomModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      number: form.number.value,
      type: form.type.value,
      capacity: parseInt(form.capacity.value, 10),
    };
    onSubmit(data);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className={`fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(5px)", background: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-2xl h-fit transition-all duration-300 ease-in-out
        ${
          isOpen
            ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
            : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
        }
      `}
      >
        <h2 className="text-xl font-bold mb-4">Create Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Room Number</label>
            <input
              name="number"
              type="text"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Type</label>
            <select
              name="type"
              required
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="ICU">ICU</option>
              <option value="VIP">VIP</option>
              <option value="Reguler">Reguler</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Capacity</label>
            <input
              name="capacity"
              type="number"
              min="1"
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
