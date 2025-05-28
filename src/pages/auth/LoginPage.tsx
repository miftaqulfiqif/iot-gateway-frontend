import { useAuthHook } from "@/hooks/UseAuth";
import { Eye, EyeClosed, KeyRound, Mail, UserRound } from "lucide-react";
import { useState } from "react";

export const LoginPage = () => {
  const formik = useAuthHook();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="m-30">
      <div className="bg-blue-500 flex flex-row h-[700px] p-4 rounded-4xl">
        <div className="w-1/2 rounded-2xl p-4">
          <p className="font-bold">Image</p>
        </div>
        <div className="w-1/2 bg-white rounded-2xl p-4">
          <div className="flex flex-col border">
            <p className="font-bold text-2xl">Login</p>
            <p className="text-sm text-red-500">{formik.status}</p>
            <form onSubmit={formik.handleSubmit} className="mx-auto space-y-2">
              {/* Input Email */}
              <label
                htmlFor="username"
                className="flex flex-row items-center gap-2 px-2 focus-within:outline outline-1 outline-blue-500 rounded-sm h-10"
              >
                <UserRound className="w-10" />
                <input
                  name="username"
                  type="text"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="w-full outline-none"
                />
              </label>
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-red-500">{formik.errors.username}</p>
              )}

              {/* Input Password */}
              <label
                htmlFor="password"
                className="flex flex-row items-center gap-2 px-2 focus-within:outline outline-1 outline-blue-500 rounded-sm h-10"
              >
                <KeyRound className="w-10" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full outline-none"
                />
                {showPassword ? (
                  <Eye
                    className="cursor-pointer w-10"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeClosed
                    className="cursor-pointer w-10"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
