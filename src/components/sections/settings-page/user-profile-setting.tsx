import avatarIcon from "@/assets/icons/avatar.png";
import person from "@/assets/icons/profile-icon.png";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ConifmModalContext";
import { useToast } from "@/context/ToastContext";
import React, { ChangeEvent, useRef, useState } from "react";

export const UserProfileSetting = () => {
  const { user } = useAuth();
  const { showConfirm } = useModal();
  const { showToast } = useToast();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleChangeUserProfile = () => {
    showConfirm(({ username, password }) => {
      // Logic to change user profile
      console.log(username, password, name, selectedFile);
      // Toast Success
      showToast(null, "User profile changed successfully", "success");
    });
  };

  return (
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
              At least 800 x 800 px recomended max: 3 Mb <br /> JPG, JPEG or PNG
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
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>
      <div
        onClick={handleChangeUserProfile}
        className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
      >
        <p className="text-center"> Save Changes</p>
      </div>
    </div>
  );
};
