import { useFormik } from "formik";

export const useConnectDevicesLanOrWifi = () => {
  const formik = useFormik({
    initialValues: {
      locale_ip: "",
      gateway: "",
      subnet: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return formik;
};
