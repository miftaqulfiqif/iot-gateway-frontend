import DopplerChart from "@/components/chart-doppler";
import MainLayout from "../../components/layouts/main-layout";
import { ArrowLeft, PersonStanding, Weight } from "lucide-react";

const DeviceDopplerPage = () => {
  return (
    <MainLayout title="Doppler" state="Devices">
      <div className="flex flex-row">
        <div className="w-1/2">
          <div
            className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ArrowLeft />
            <p>Back</p>
          </div>
        </div>{" "}
        <div className="w-1/2">
          <p className="font-bold text-2xl">Result</p>
          <div className="flex flex-row gap-4 mt-3">
            <div className="aspect-square w-full bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-10">
              <div className="aspect-square border-2 w-full rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Weight className="w-full h-full" />
                  <p className="bg-blue-400 px-4 rounded-full text-center">
                    3 Kg
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 text-2xl">
                <PersonStanding className="w-8 h-8" />
                <p>Weights</p>
              </div>
            </div>
          </div>
          <DopplerChart />
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDopplerPage;
