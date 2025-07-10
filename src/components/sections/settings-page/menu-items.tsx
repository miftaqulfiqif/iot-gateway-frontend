import person from "@/assets/icons/profile-icon.png";
import avatarIcon from "@/assets/icons/avatar.png";

import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

type MenuItemsProps = {
  state: string;
  animationKey: number;
  setAddGatewayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MenuItems = ({
  state,
  animationKey,
  setAddGatewayModal,
  setConfirmModal,
}: MenuItemsProps) => {
  const { user } = useAuth();
  const [categoryOpen, setCategoryOpen] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const logoUrl = URL.createObjectURL(file);
      setLogo(logoUrl);
    }
  };

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

  const toggleCategory = (id: number) => {
    setCategoryOpen((prevOpen) =>
      prevOpen.includes(id)
        ? prevOpen.filter((openId) => openId !== id)
        : [...prevOpen, id]
    );
  };

  return (
    <div
      key={animationKey}
      className="transition-all duration-500 ease-in-out animate-fade-slide"
    >
      {/* Edit Hospital Profile */}
      {state === "Edit Hospital Profile" && (
        <div className="flex flex-col gap-8">
          <p className="text-2xl font-bold">Hospital Profile</p>
          <div className="flex flex-col gap-2">
            <p>Logo</p>
            <div className="flex flex-row gap-6">
              <img
                src={logo || avatarIcon}
                className="w-26 h-26 rounded-full object-cover"
                alt="Logo"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef as React.RefObject<HTMLInputElement>}
                style={{ display: "none" }}
                onChange={handleLogoChange}
              />
              <div className="flex flex-col gap-2 ">
                <div
                  className="border-2 border-[#ECECEC] rounded-xl px-6 py-2 w-fit cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <p>Change new image</p>
                </div>
                <p className="text-gray-400">
                  At least 800 x 800 px recomended max: 3 Mb <br /> JPG, JPEG or
                  PNG
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Hospital Name</p>
            <div className="flex bg-[#ECECEC] rounded-xl px-6 py-4 gap-4">
              {/* <img src={person} className="w-8 h-8" alt="" /> */}
              <input
                type="text"
                name="hospital_name"
                placeholder={user?.hospital?.name || "Input hospital name here"}
                // onChange={(e) => setHospitalName(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div
            onClick={() => setConfirmModal(true)}
            className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
          >
            <p className="text-center"> Save Changes</p>
          </div>
        </div>
      )}

      {/* Edit Profile */}
      {state === "Edit Profile" && (
        <div className="flex flex-col gap-8">
          <p className="text-2xl font-bold">Profile</p>
          <div className="flex flex-col gap-2">
            <p>Avatar</p>
            <div className="flex flex-row gap-6">
              <img
                src={image || avatarIcon}
                className="w-26 h-26 rounded-full object-cover"
                alt="Avatar"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef as React.RefObject<HTMLInputElement>}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div className="flex flex-col gap-2 ">
                <div
                  className="border-2 border-[#ECECEC] rounded-xl px-6 py-2 w-fit cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <p>Change new image</p>
                </div>
                <p className="text-gray-400">
                  At least 800 x 800 px recomended max: 3 Mb <br /> JPG, JPEG or
                  PNG
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Name</p>
            <div className="flex bg-[#ECECEC] rounded-xl px-6 py-4 gap-4">
              <img src={person} className="w-8 h-8" alt="" />
              <input
                type="text"
                name="name"
                placeholder={user?.name || "Input your text name here"}
                // onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div
            onClick={() => setConfirmModal(true)}
            className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
          >
            <p className="text-center"> Save Changes</p>
          </div>
        </div>
      )}

      {/* Password */}
      {state === "Password" && (
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
            <p className="text-red-500 text-sm">
              {formik.errors.currentPassword}
            </p>
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
            <p className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </p>
            <button
              className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
      {/* Gateways */}
      {state === "Gateways" && (
        <div className="flex flex-col gap-8">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-bold">Gateways</p>
            <a
              className="cursor-pointer"
              onClick={() => setAddGatewayModal(true)}
            >
              <div className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 w-fit">
                <p>Add gateway</p>
              </div>
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <p>List gateways</p>
            <hr className="border-t-2 border-[#ECECEC]" />
            <div className="flex flex-col gap-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};
