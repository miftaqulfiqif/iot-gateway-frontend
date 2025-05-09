import MainLayout from "../components/layouts/main-layout";
import DeviceConnected from "../components/ui/device-connected";

const Dashboard = () => {
  const handleClickDevice = () => {
    alert("OK");
  };
  return (
    <MainLayout title="Dashboard" state="Dashboard">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-5">
          <DeviceConnected
            deviceIcon=""
            deviceName="Digit Pro IDA"
            deviceSerialNumber="1S3CB03BB2DF2CC"
            url="/device/digit-pro-ida"
          />
          <DeviceConnected
            deviceIcon=""
            deviceName="Digit Pro Baby"
            deviceSerialNumber="1S3CB03JBF0F2CC"
            url="/device/digit-pro-baby"
          />
          <DeviceConnected
            deviceIcon=""
            deviceName="Doppler"
            deviceSerialNumber="1S3CB03BG20F2CC"
            url="/device/doppler"
          />
          <DeviceConnected
            deviceIcon=""
            deviceName="BMI"
            deviceSerialNumber="F1:Q1:GA:NT:3N:GG"
            url="/device/bmi"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
