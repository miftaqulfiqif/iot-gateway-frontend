import axios from "axios";

type DigitProBaby = {
  patient_id: string;
  baby_id: string;
  device_id: string;
  weight: number;
};

export const createBabyApi = async ({
  patient_id,
  baby_id,
  device_id,
  weight,
}: DigitProBaby) => {
  try {
    await axios.post(
      "http://localhost:3000/api/measurement-histories-digit-pro-baby",
      {
        patient_id,
        baby_id,
        device_id,
        weight: Number(weight),
      },
      {
        withCredentials: true,
      }
    );
    console.log("Baby created successfully");
  } catch (error) {
    console.error("Error creating baby : ", error);
  }
};

export const useDigitProBaby = ({}: DigitProBaby) => {};
