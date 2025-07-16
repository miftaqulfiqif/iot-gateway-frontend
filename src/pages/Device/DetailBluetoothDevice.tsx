import MainLayout from "@/components/layouts/main-layout";
import { useParams } from "react-router-dom";

export const DetailBluetoothDevice = () => {
  const { mac } = useParams();
  return (
    <MainLayout title="Detail Bluetooth Device" state="Devices">
      <div>
        <p>{mac}</p>
      </div>
    </MainLayout>
  );
};
