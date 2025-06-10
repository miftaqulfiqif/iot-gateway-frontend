import axios from "axios";

type DigitProIDA = {
  patient_id: string;
  baby_id: string;
  device_id: string;
  weight_mother: number;
  weight_child: number;
};

export const createDataDigitProIDA = async ({
  patient_id,
  baby_id,
  device_id,
  weight_mother,
  weight_child,
}: DigitProIDA) => {
  try {
    await axios.post(
      "http://localhost:3000/api/measurement-histories-digit-pro-ida",
      {
        patient_id,
        baby_id,
        device_id,
        weight_mother: Number(weight_mother),
        weight_child: Number(weight_child),
      },
      {
        withCredentials: true,
      }
    );
    console.log("Baby created successfully");
  } catch (error) {
    console.error("Error creating data : ", error);
  }
};
