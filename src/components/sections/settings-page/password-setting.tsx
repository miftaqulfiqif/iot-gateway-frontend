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
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-2xl font-bold">Password</p>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <p>Current Password</p>
        <div className="flex bg-[#ECECEC] rounded-xl px-6 py-4 gap-4">
          <input
            type="password"
            placeholder="Input your current password here"
            name="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            className="w-full focus:outline-none"
          />
        </div>
        <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
        <p>New Password</p>
        <div className="flex bg-[#ECECEC] rounded-xl px-6 py-4 gap-4">
          <input
            type="password"
            placeholder="Input your new password here"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            className="w-full focus:outline-none"
          />
        </div>
        <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
        <p>Confirm Password</p>
        <div className="flex bg-[#ECECEC] rounded-xl px-6 py-4 gap-4">
          <input
            id="confirm-password"
            type="password"
            placeholder="Input your new password here"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            className="w-full focus:outline-none"
          />
        </div>
        <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
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
