import avatarIcon from "@/assets/icons/avatar.png";
import person from "@/assets/icons/profile-icon.png";
import { InputText } from "@/components/ui/input-text";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ConifmModalContext";
import { useToast } from "@/context/ToastContext";
import { Camera, Save } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";

export const UserProfileSetting = () => {
  const { user } = useAuth();
  const { showConfirm } = useModal();
  const { showToast } = useToast();

  const [image, setImage] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [ihsNumber, setIhsNumber] = useState("");

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
        <p>Profile Picture</p>
        <div className="flex flex-row gap-6">
          <div className="w-26 h-26 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-200">
            {image ? (
              <img
                src={image}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold text-gray-700">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .substring(0, 3)
                      .toUpperCase()
                  : "?"}
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef as React.RefObject<HTMLInputElement>}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="flex flex-col gap-2 ">
            <div
              className="flex rounded-xl px-4 py-2 w-fit cursor-pointer bg-blue-500 text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="inline mr-2" />
              <p>Change avatar</p>
            </div>
            <p className="text-gray-400">
              At least 800 x 800 px recomended max: 3 Mb <br /> JPG, JPEG or PNG
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <InputText
          label="Name"
          name="name"
          type="text"
          placeholder={"Input your name here"}
          onChange={(e) => setName(e.target.value)}
          className="w-full outline-none"
          value={name}
          onTouch={() => {}}
        />
        <InputText
          label="Email"
          name="email"
          type="email"
          placeholder={"Input your email here, ex: email@example.com"}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full outline-none"
          value={email}
          onTouch={() => {}}
        />
        <InputText
          label="Phone Number"
          name="phone"
          type="text"
          placeholder={"Input your Phone Number here, ex: +6281234567890"}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full outline-none"
          value={phoneNumber}
          onTouch={() => {}}
        />
        <div
          className="bg-blue-500 text-white rounded-xl px-4 py-2 w-fit cursor-pointer flex mt-10 font-semibold hover:bg-blue-400"
          onClick={() => alert("OK")}
        >
          <Save className="inline mr-2" />
          <p>Save Profile</p>
        </div>
      </div>
      <hr className="border-1 border-gray-300 mt-4" />
      <div className="w-full">
        <p className="font-bold text-xl mb-4">Change Password</p>
        <div className="flex flex-col gap-2">
          <InputText
            type="password"
            label="Current Password "
            name="current_password"
            placeholder="Input your Current Password here"
            value={currentPassword}
            onTouch={""}
            onError={""}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <div className="flex gap-4">
            <InputText
              type="password"
              label="New Password "
              name="new_password"
              placeholder="Input your New Password here"
              value={newPassword}
              onTouch={""}
              onError={""}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <InputText
              type="password"
              label="Confirm New Password "
              name="confirm_new_password"
              placeholder="Input your New Password here"
              value={confirmNewPassword}
              onTouch={""}
              onError={""}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            />
          </div>
          <div
            className="bg-white border-1 rounded-xl px-4 py-2 w-fit cursor-pointer flex mt-10 font-semibold hover:bg-blue-400 hover:text-white"
            onClick={() => alert("OK")}
          >
            <Save className="inline mr-2" />
            <p>Update Password</p>
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <p className="font-bold text-xl mb-4">SATUSEHAT</p>
        <div className="flex flex-row gap-2">
          <InputText
            type="text"
            label="IHS Number "
            name="longitude"
            placeholder="Input your IHS Number here"
            value={ihsNumber}
            onTouch={""}
            onError={""}
            onChange={(e) => {
              setIhsNumber(e.target.value);
            }}
          />
        </div>
      </div> */}
      <div
        onClick={handleChangeUserProfile}
        className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
      >
        <p className="text-center"> Save Changes</p>
      </div>
    </div>
  );
};
