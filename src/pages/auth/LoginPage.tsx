import { useAuthHook } from "@/hooks/UseAuth";
import { Eye, EyeClosed, KeyRound, UserRound } from "lucide-react";
import { useState } from "react";
import doctorImg from "@/assets/imgs/doctor-login.png";

export const LoginPage = () => {
  const formik = useAuthHook();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-row bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl w-full">
        {/* Kiri: Gambar dan Slogan */}
        <div className="w-1/2 bg-blue-600 text-white p-10 flex-col justify-center hidden md:flex">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Elitech Gateway
          </h1>
          <p className="text-lg font-semibold mb-4">
            Official Access to Elitech Medical Devices
          </p>
          <p className="text-sm opacity-90 mb-6">
            "Exclusive IoT Solution for Smarter Healthcare Services"
          </p>
          <img
            src={doctorImg}
            alt="Doctor"
            className="w-full max-w-sm mx-auto"
          />
        </div>

        {/* Kanan: Form Login */}
        <div className="w-full md:w-1/2 lg:w-1/2 p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Login</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 group focus-within:ring-2 focus-within:ring-blue-500">
                <UserRound className="text-gray-400 mr-2 group-focus-within:text-blue-500 transition-colors duration-100" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>

              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 group focus-within:ring-2 focus-within:ring-blue-500">
                <KeyRound className="text-gray-400 mr-2 group-focus-within:text-blue-500 transition-colors duration-100" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full outline-none text-sm bg-transparent"
                />
                <span
                  className="text-gray-400 cursor-pointer ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
