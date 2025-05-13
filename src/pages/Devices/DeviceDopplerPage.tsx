import DopplerChart from "@/components/chart-doppler";
import MainLayout from "../../components/layouts/main-layout";
import { ArrowLeft, PersonStanding, Weight } from "lucide-react";
import { PatientInfo } from "@/components/ui/patient-info";

const DeviceDopplerPage = () => {
  return (
    <MainLayout title="Doppler" state="Devices">
      <div className="flex flex-row h-full gap-4 ">
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
            <PatientInfo />
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <p className="font-bold text-2xl">Result</p>
          <div className="w-full max-w-[600px] space-y-6 pt-3 ">
            <DopplerChart />
            {/* <div className="flex flex-row gap-4">
              Square 1
              <div className="flex-1 aspect-square bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-5">
                <div className="aspect-square w-full border-2 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <Weight className="w-full h-full" />
                    <p className="bg-blue-400 px-4 rounded-full text-center w-20">
                      83 Kg
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <PersonStanding className="w-6 h-6" />
                  <p>Adult Weights</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDopplerPage;
