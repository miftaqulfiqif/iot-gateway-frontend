import { InputText } from "@/components/ui/input-text";
import { useFormik } from "formik";
import * as yup from "yup";

export const PasswordSetting = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      currentPassword: yup.string().required("Current password is required"),
      newPassword: yup.string().required("New password is required"),
      confirmPassword: yup
        .string()
        .required("Confirm new password is required")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      alert("Password changed successfully!");
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-bold">Password</p>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <InputText
          label="Current Password"
          type="password"
          name="currentPassword"
          placeholder="Input your current password here"
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
          className="w-full focus:outline-none"
          onTouch={formik.touched.currentPassword}
          onError={formik.errors.currentPassword}
        />
        <InputText
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Input your new password here"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="w-full focus:outline-none"
          onTouch={formik.touched.newPassword}
          onError={formik.errors.newPassword}
        />
        <InputText
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Input confirm password here"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="w-full focus:outline-none"
          onTouch={formik.touched.confirmPassword}
          onError={formik.errors.confirmPassword}
        />
        <button
          className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
