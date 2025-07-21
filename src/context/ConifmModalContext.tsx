import { InputText } from "@/components/ui/input-text";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { createContext, useContext, useState } from "react";

type ModalConfirmInput = {
  username: string;
  password: string;
};

type ModalContextType = {
  showConfirm: (onConfirm: (input: ModalConfirmInput) => void) => void;
  hide: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ConfirmModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<
    ((input: ModalConfirmInput) => void) | null
  >(null);

  const showConfirm = (callback: (input: ModalConfirmInput) => void) => {
    setVisible(true);
    setOnConfirm(() => callback);
  };

  const hide = () => {
    setVisible(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (onConfirm) onConfirm(values);
      hide();
    },
  });

  return (
    <ModalContext.Provider value={{ showConfirm, hide }}>
      {children}

      {visible && (
        <div
          onClick={hide}
          className={`fixed top-0 left-0 w-full h-full z-40 transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backdropFilter: "blur(5px)",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed top-1/2 left-1/2 transform bg-white rounded-xl p-8 z-50 w-[400px] h-fit transition-all duration-300 ease-in-out
            ${
              visible
                ? "opacity-100 scale-100 translate-x-[-50%] translate-y-[-50%]"
                : "opacity-0 scale-95 translate-x-[-50%] translate-y-[-40%]"
            }`}
          >
            <p className="font-semibold text-xl mb-5">Confirm Change</p>
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <InputText
                name="username"
                label="Username"
                placeholder="Input Username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onTouch={formik.touched.username}
                onError={formik.errors.username}
              />
              <InputText
                name="password"
                label="Password"
                placeholder="Input Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onTouch={formik.touched.password}
                onError={formik.errors.password}
              />
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={hide}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Konfirmasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
