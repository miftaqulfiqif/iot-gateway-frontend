import MainLayout from "@/components/layouts/main-layout";
import { useParams } from "react-router-dom";

export const DetailTcpIpDevice = () => {
  const { ip } = useParams();
  return (
    <MainLayout title="Detail TCP/IP Device" state="Devices">
      <div>
        <p>{ip}</p>
      </div>
    </MainLayout>
  );
};
