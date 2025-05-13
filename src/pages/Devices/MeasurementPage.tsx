import { PatientInfo } from "@/components/ui/patient-info";
import MainLayout from "../../components/layouts/main-layout";

const MeasurementPage = () => {
  return (
    <MainLayout title="Measurement" state="Measurement">
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <p className="font-bold text-2xl">Patient Info</p>
          <PatientInfo />
        </div>
        <div className="w-1/2 max-h-full bg-blue-500"></div>
      </div>
    </MainLayout>
  );
};

export default MeasurementPage;
