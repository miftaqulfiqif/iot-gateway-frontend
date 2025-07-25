import { InputSelect } from "@/components/ui/input-select";
import { InputSelectWithSearch } from "@/components/ui/input-select-with-search";
import { InputText } from "@/components/ui/input-text";
import { useToast } from "@/context/ToastContext";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

interface UpdateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    id: number;
    number: string;
    type: string;
    capacity: number;
    nurseManager: {
      id: string;
      name: string;
    };
    doctor: {
      id: string;
      name: string;
    };
  };
}

const dummyNurses = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Brian Smith" },
  { id: "3", name: "Carla Martinez" },
  { id: "4", name: "David Lee" },
  { id: "5", name: "Eva Chen" },
  { id: "6", name: "Frank Miller" },
  { id: "7", name: "Grace Kim" },
  { id: "8", name: "Henry Nguyen" },
  { id: "9", name: "Isabel Garcia" },
  { id: "10", name: "Jack Wilson" },
];
const dummyDoctors = [
  { id: "1", name: "dr. Andika Prasetya" },
  { id: "2", name: "dr. Yulia Pratiwi" },
  { id: "3", name: "dr. Budi Santoso" },
];

export default function UpdateRoomModal({
  isOpen,
  onClose,
  room,
}: UpdateRoomModalProps) {
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      id: room.id,
      number: room.number,
      type: room.type,
      capacity: room.capacity,
      nurseManager: room.nurseManager.id || "",
      doctor: room.doctor.id || "",
    },
    validationSchema: yup.object().shape({
      number: yup.string().required("Room number is required"),
      type: yup.string().required("Room type is required"),
      capacity: yup
        .number()
        .typeError("Room capacity must be a number")
        .min(1, "Minimum capacity is 1")
        .required("Room capacity is required"),
      nurseManager: yup.string().required("Nurse manager is required"),
      doctor: yup.string().required("Doctor is required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    console.log({
      id: values.id,
      number: values.number,
      type: values.type,
      capacity: Number(values.capacity),
      nurseManager: values.nurseManager,
      doctor: values.doctor,
    });
    onClose();
    showToast(null, "Update room successfuly", "success");
  };

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
        <h2 className="text-xl font-bold mb-4">Update Room</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
          <InputSelectWithSearch
            label="Nurse Manager"
            name="nurseManager"
            placeholder="Select Nurse Manager"
            onChange={(value) => formik.setFieldValue("nurseManager", value)}
            value={formik.values.nurseManager}
            onTouch={formik.touched.nurseManager}
            onError={formik.errors.nurseManager}
            option={dummyNurses.map((nurse) => ({
              value: nurse.id,
              label: nurse.name,
            }))}
            isRequired
          />
          <InputSelectWithSearch
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => formik.setFieldValue("doctor", value)}
            value={formik.values.doctor}
            onTouch={formik.touched.doctor}
            onError={formik.errors.doctor}
            option={dummyDoctors.map((doctor) => ({
              value: doctor.id,
              label: doctor.name,
            }))}
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
