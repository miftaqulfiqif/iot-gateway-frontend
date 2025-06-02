import { ArrowLeft, Icon, Square, Triangle } from "lucide-react";
import { PersonStanding, Weight } from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import MainLayout from "../../components/layouts/main-layout";
import DopplerChart from "@/components/chart-doppler";
import { PatientInfo } from "@/components/ui/patient-info";
import { IdaChart } from "@/components/chart-ida";

import weighingIcon from "@/assets/icons/pediatrics.png";
import tareIcon from "@/assets/icons/tare.png";
import { useSocketHandler } from "@/hooks/SocketHandler";
import { useEffect, useState } from "react";
import { SelectBaby } from "@/components/modals/select-baby-modal";
import { Patients } from "@/models/PatientModel";

const DeviceDigitProBabyPage = () => {
  const {
    eventStartDigitProBaby,
    eventStopDigitProBaby,
    eventTareDigitProBaby,
    weightDigitProBaby,
  } = useSocketHandler();

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
    <MainLayout title="Digit Pro Baby" state="Measurement">
      <div className="flex flex-col pb-20">
        <div className="flex flex-row h-full gap-6">
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

          <div className="w-1/2 flex flex-col">
            <p className="font-bold text-2xl">Result</p>
            <div className="w-full space-y-6 pt-3">
              <div className="bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-4 p-4 w-full h-fit">
                <div className="flex flex-row gap-3 items-center font-semibold">
                  <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                    <Icon iconNode={babyPacifier} className="w-8 h-8" />
                  </div>
                  <p className="text-xl">Baby Weights</p>
                </div>
                <div className="flex flex-row gap-10 px-4 pb-2">
                  <div className="aspect-square border-2 rounded-full flex items-center justify-center w-1/4">
                    <div className="flex flex-col items-center gap-4">
                      <img src={weighingIcon} alt="" className="w-16 h-16" />
                    </div>
                  </div>
                  <div className="flex w-full justify-center">
                    <div className="flex flex-row gap-10 my-auto items-end">
                      <p className="text-8xl">
                        {weightDigitProBaby.weight
                          ? weightDigitProBaby.weight
                          : "--"}
                      </p>
                      <p className="text-3xl">kg</p>
                    </div>
                  </div>
                </div>
              </div>
              <DopplerChart />
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="flex flex-row items-center gap-3 border-2 bg-white border-green-500 text-green-500 w-38 justify-center text-center mx-auto px-4 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={eventStartDigitProBaby}
                >
                  <Triangle className="rotate-90 " />
                  <p>START</p>
                </div>
                <div
                  className="flex flex-row gap-3 border-2 items-center bg-white border-red-500 text-red-500 w-38 justify-center text-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={eventStopDigitProBaby}
                >
                  <Square className="" />
                  <p>STOP</p>
                </div>
                <div
                  className="flex flex-row gap-3 border-2 bg-white border-[#3062E5] text-[#3062E5] w-fit text-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl cursor-pointer"
                  onClick={eventTareDigitProBaby}
                >
                  <img src={tareIcon} alt="" className="w-8 h-8" />
                  <p>TARE</p>
                </div>
              </div>
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

export default DeviceDigitProBabyPage;
