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

const DeviceIDAPage = () => {
  return (
    <MainLayout title="Digit Pro IDA" state="Devices">
      <div className="flex flex-row">
        <div className="flex flex-col w-full gap-8">
          <div
            className="flex flex-row items-center gap-2 bg-white w-fit font-bold px-5 py-2 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ArrowLeftCircle />
            <p>Back</p>
          </div>
          {/* <p className="font-bold text-2xl">Result</p> */}
          <div className="w-1/2">
            <p className="font-bold text-2xl">Patient Info</p>
            <div className="flex flex-row gap-2 bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-3 h-fit">
              <div className="flex flex-col gap-4 px-8 py-4">
                <p className=" text-4xl">Miftaqul Fiqi Firmansyah</p>
                <div className="flex flex-row gap-4 items-center">
                  <p className="bg-blue-400 px-4 py-1 rounded-full">Male</p>
                  <p className="">23 years old</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="aspect-square w-1/2 bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-12">
              <div className="aspect-square border-2 w-full rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Weight className="w-full h-full" />
                  <p className="bg-blue-400 px-4 rounded-full text-center">
                    83 Kg
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <PersonStanding className="w-6 h-6" />
                <p>Adult Weights</p>
              </div>
            </div>
            <div className="aspect-square w-1/2 bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center gap-3 p-12">
              <div className="aspect-square border-2 w-full rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Weight className="w-full h-full" />
                  <p className="bg-blue-400 px-4 rounded-full text-center">
                    3 Kg
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Icon iconNode={babyPacifier} />
                <p>Baby Weights</p>
              </div>
            </div>
          </div>
          <DopplerChart />
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceIDAPage;
