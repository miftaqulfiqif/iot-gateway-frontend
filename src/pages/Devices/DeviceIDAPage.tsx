import { Icon, PersonStanding } from "lucide-react";
import { babyPacifier } from "@lucide/lab";
import MainLayout from "../../components/layouts/main-layout";
import { useParams } from "react-router-dom";
import { PatientInfo } from "@/components/ui/patient-info";
import { HistoriesDigitProIda } from "@/components/charts/chart-ida";

import weighingIcon from "@/assets/icons/weighing-white.png";
import babyWeighingIcon from "@/assets/icons/pediatrics.png";
import { useEffect, useState } from "react";
import { SelectBaby } from "@/components/modals/select-baby-modal";
import { Patients } from "@/models/PatientModel";
import { useToast } from "@/context/ToastContext";
import { useDigitProIDA } from "@/hooks/api/devices/use-digit-pro-ida";
import { SaveMeasurementDigitProIDA } from "@/components/modals/save_measurement/save-measurement-digit-pro-ida";
import { useSocketDigitProIDA } from "@/hooks/socket/devices/SocketDigitProIDA";

const historiesData = [
  {
    timestamp: "2025-06-05 01:46:33.803",
    weight_mother: 186,
    weight_child: 80,
  },
  {
    timestamp: "2025-06-06 01:46:33.803",
    weight_mother: 305,
    weight_child: 200,
  },
  {
    timestamp: "2025-06-07 01:46:33.803",
    weight_mother: 237,
    weight_child: 120,
  },
  {
    timestamp: "2025-06-08 01:46:33.803",
    weight_mother: 73,
    weight_child: 190,
  },
  {
    timestamp: "2025-06-09 01:46:33.803",
    weight_mother: 209,
    weight_child: 130,
  },
  {
    timestamp: "2025-06-10 01:46:33.803",
    weight_mother: 214,
    weight_child: 140,
  },
];

const DeviceIDAPage = () => {
  const { mac } = useParams();
  // const { weightDigitProIDA } = useSocketHandler({
  //   macDevice: mac,
  // });
  const { data } = useSocketDigitProIDA(mac!);

  const [saveModal, setSaveModal] = useState(false);

  const [showHistories, setShowHistories] = useState(false);

  const [patient, setPatient] = useState<Patients>({
    nik: "",
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
    height: 0,
    age: 0,
  });
  const [baby, setBaby] = useState({
    id: "",
    name: "",
  });

  // Get patient from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <MainLayout title="Digit Pro IDA" state="Measurement">
      <div className="flex flex-col pb-5">
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
              <PatientInfo
                patient={patient}
                baby={baby}
                setShowHistories={setShowHistories}
              />
              {showHistories && (
                <div className="mt-6">
                  <HistoriesDigitProIda chartData={historiesData} />
                </div>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-2xl">Result</p>
              <div className="w-full space-y-6 pt-3">
                <div className="flex flex-row gap-4">
                  {/* Square 1 */}
                  <div className="flex-1 aspect-square bg-gradient-to-t from-[#6e79f4] to-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col gap-3 p-5">
                    <div className="flex flex-row gap-3 items-center font-semibold">
                      <div className="bg-[#ededf9] text-blue-800 rounded-xl p-2 w-fit h-fit shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]">
                        <PersonStanding className="w-6 h-6" />
                      </div>
                      <p>Mother Weights</p>
                    </div>
                    <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-4">
                        <img src={weighingIcon} alt="" className="w-12 h-12" />
                        <p className="bg-blue-400 px-6 py-2 rounded-full text-center w-fit text-4xl">
                          <span className="pr-2">
                            {data.weight_mother ? data.weight_mother : "--"}
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
                            {data.weight_baby ? data.weight_baby : "--"}
                          </span>
                          Kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-row border-2 bg-white border-[#3062E5] text-[#3062E5] w-[250px] items-center mx-auto px-6 py-2 font-bold rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-2xl mt-6 ${
                  data.weight_baby === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => setSaveModal(true)}
              >
                <div className="flex flex-row gap-3 mx-auto">
                  <p>Save</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {baby.id === "" && (
        <SelectBaby
          isActive={true}
          baby={baby}
          babySelected={(baby) => setBaby(baby)}
          patientId={patient.id}
        />
      )}
      <SaveMeasurementDigitProIDA
        isActive={saveModal}
        setInactive={() => setSaveModal(false)}
        patient={patient}
        baby={baby}
        deviceMac={mac!}
        result={data}
      />
    </MainLayout>
  );
};

export default DeviceIDAPage;
