import axios from "axios";
import { useState } from "react";

export const useBabies = (patientId: string) => {
  const [babies, setBabies] = useState([]);

  const getBabiesByPatientId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/baby/${patientId}`,
        {
          withCredentials: true,
        }
      );
      setBabies(response.data.data);
    } catch (error) {
      console.error("Error fetching babies:", error);
    }
  };

  return { getBabiesByPatientId, babies };
};
