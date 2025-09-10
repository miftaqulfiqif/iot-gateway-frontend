import avatarIcon from "@/assets/icons/avatar.png";
import { InputText } from "@/components/ui/input-text";

import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ConifmModalContext";
import { useToast } from "@/context/ToastContext";
import React, { ChangeEvent, useRef, useState } from "react";

export const HospitalProfileSetting = () => {
  const { user } = useAuth();
  const { showConfirm } = useModal();
  const { showToast } = useToast();

  const [hospitalName, setHospitalName] = useState("");
  const [logo, setLogo] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const logoUrl = URL.createObjectURL(file);
      setLogo(logoUrl);
    }
  };

  const handleChangeHospitalProfile = () => {
    showConfirm(({ username, password }) => {
      // Logic to change hospital profile
      console.log(username, password, hospitalName, selectedFile);
      // Toast Success
      showToast(null, "Hospital profile changed successfully", "success");
    });
  };

  return (
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
              className="rounded-xl px-6 py-2 w-fit cursor-pointer bg-blue-400 text-white"
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
        <p>Hospital Name</p>
        <InputText
          type="text"
          name="hospital_name"
          placeholder={user?.hospital?.name || "Input hospital name here"}
          onChange={(e) => setHospitalName(e.target.value)}
          value={hospitalName}
          onTouch={() => {}}
        />
      </div>
      {/* <hr className="border-1 border-gray-300 mt-4" />
      <div className="w-full">
        <p className="font-bold text-xl mb-4">Location</p>
        <div className="flex flex-row gap-2">
          <InputText
            type="number"
            label="Longitude"
            name="longitude"
            placeholder="Input longitude here"
            value={longitude}
            onTouch={""}
            onError={""}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
          />
          <InputText
            type="number"
            label="Latitude"
            name="latitude"
            placeholder="Input longitude here"
            value={latitude}
            onTouch={""}
            onError={""}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
          />
        </div>
      </div> */}
      <div
        onClick={handleChangeHospitalProfile}
        className="border-2 bg-[#35AAFF] text-white rounded-xl px-6 py-2 mt-10 cursor-pointer"
      >
        <p className="text-center"> Save Changes</p>
      </div>
    </div>
  );
};
