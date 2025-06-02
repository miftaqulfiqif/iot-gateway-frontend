import {
  ArrowLeft,
  ArrowLeftCircle,
  Icon,
  PersonStanding,
  SkipBackIcon,
  Weight,
} from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import MainLayout from "../../components/layouts/main-layout";
import { href } from "react-router-dom";
import DopplerChart from "@/components/chart-doppler";
import { PatientInfo } from "@/components/ui/patient-info";
import { IdaChart } from "@/components/chart-ida";

import weighingIcon from "@/assets/icons/weighing-white.png";
import babyWeighingIcon from "@/assets/icons/pediatrics.png";
import { useSocketHandler } from "@/hooks/SocketHandler";
import { useEffect, useState } from "react";
import { SelectBaby } from "@/components/modals/select-baby-modal";
import { Patients } from "@/models/PatientModel";

const DeviceIDAPage = () => {
  const { startDigitProIDA, weightDigitProIDA } = useSocketHandler();
  // Start Digit Pro IDA
  startDigitProIDA();

  const [patient, setPatient] = useState<Patients>({
    id: "",
    barcode_image: "",
    name: "",
    gender: "",
    address: "",
    phone: "",
    work: "",
    last_education: "",
    place_of_birth: "",
    date_of_birth: "",
    religion: "",
    weight: 0,
    age: 0,
  });
  const [baby, setBaby] = useState(null);

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="Digit Pro IDA" state="Measurement">
      <div className="flex flex-col pb-20">
        <div className="flex flex-row gap-6">
          <div className="w-1/2">
            {/* <div
                    className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    <ArrowLeft />
                    <p>Back</p>
                  </div> */}
            <div className="w-full">
              <p className="font-bold text-2xl">Patient Info</p>
              <PatientInfo patient={patient} baby={baby} />
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <p className="font-bold text-2xl">Result</p>
            <div className="w-full space-y-6 pt-3">
              <div className="flex flex-row gap-4">
                {/* Square 1 */}
                <div className="flex-1 aspect-square bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-3 p-5">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <PersonStanding className="w-6 h-6" />
                    </div>
                    <p>Adult Weights</p>
                  </div>
                  <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <img src={weighingIcon} alt="" className="w-15 h-15" />
                      <p className="bg-blue-400 px-6 py-2 rounded-full text-center w-fit text-4xl">
                        <span className="pr-2">
                          {weightDigitProIDA.adultWeight
                            ? weightDigitProIDA.adultWeight
                            : "--"}
                        </span>
                        Kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Square 2 */}
                <div className="flex-1 aspect-square bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-3 p-5">
                  <div className="flex flex-row gap-3 items-center font-semibold">
                    <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                      <Icon iconNode={babyPacifier} />
                    </div>
                    <p>Baby Weights</p>
                  </div>
                  <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={babyWeighingIcon}
                        alt=""
                        className="w-15 h-15"
                      />
                      <p className="bg-blue-400 px-6 py-2 rounded-full text-center w-fit text-4xl">
                        <span className="pr-2">
                          {weightDigitProIDA.babyWeight
                            ? weightDigitProIDA.babyWeight
                            : "--"}
                        </span>
                        Kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <IdaChart />
            </div>
          </div>
        </div>
      </div>
      {baby === null && (
        <SelectBaby
          isActive={true}
          baby={baby}
          babySelected={(baby) => setBaby(baby)}
          patientId={patient.id}
        />
      )}
    </MainLayout>
  );
};

export default DeviceIDAPage;
