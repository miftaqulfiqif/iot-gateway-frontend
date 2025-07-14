import { InputSelect } from "@/components/ui/input-select";
import { InputText } from "@/components/ui/input-text";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

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
  const formik = useFormik({
    initialValues: {
      number: "",
      type: "",
      capacity: 0,
    },
    validationSchema: yup.object().shape({
      number: yup.string().required("Room number is required"),
      type: yup.string().required("Room type is required"),
      capacity: yup
        .number()
        .typeError("Room capacity must be a number")
        .min(1, "Minimum capacity is 1")
        .required("Room capacity is required"),
    }),
    onSubmit: (values) => {
      onSubmit({
        number: values.number,
        type: values.type,
        capacity: Number(values.capacity),
      });
      onClose();
    },
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex w-full gap-3">
            <InputText
              label="Room Number"
              name="number"
              placeholder="Room Number"
              value={formik.values.number}
              onChange={formik.handleChange}
              onTouch={formik.touched.number}
              onError={formik.errors.number}
              isRequired
            />
            <div className="w-1/4">
              <InputSelect
                name="type"
                label="Room Type"
                placeholder="Room Type"
                option={[
                  { value: "ICU", label: "ICU" },
                  { value: "HCU", label: "HCU" },
                ]}
                onChange={(value) => formik.setFieldValue("type", value)}
                value={formik.values.type}
                onTouch={formik.touched.type}
                onError={formik.errors.type}
                isRequired
              />
            </div>
          </div>

          <InputText
            label="Capacity"
            name="capacity"
            placeholder="Capacity"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.capacity}
            onTouch={formik.touched.capacity}
            onError={formik.errors.capacity}
            isRequired
          />

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
