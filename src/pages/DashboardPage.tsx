import MainLayout from "../components/layouts/main-layout";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-row gap-5 bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center">
            <img src="" alt="" className="bg-gray-400 w-20 h-20 rounded-full" />
            <div className="flex flex-col text-xl gap-2">
              <p className="font-bold">IDA</p>
              <p className="text-gray-500 text-lg">MAC : 00:1A:2B:3C:4D:5E</p>
            </div>
          </div>
          <div className="flex flex-row gap-5 bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center">
            <img src="" alt="" className="bg-gray-400 w-20 h-20 rounded-full" />
            <div className="flex flex-col text-xl gap-2">
              <p className="font-bold">BMI</p>
              <p className="text-gray-500 text-lg">MAC : 00:1A:2B:3C:4D:5E</p>
            </div>
          </div>
          <div className="flex flex-row gap-5 bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center">
            <img src="" alt="" className="bg-gray-400 w-20 h-20 rounded-full" />
            <div className="flex flex-col text-xl gap-2">
              <p className="font-bold">Digit Pro Baby</p>
              <p className="text-gray-500 text-lg">MAC : 00:1A:2B:3C:4D:5E</p>
            </div>
          </div>
          <div className="flex flex-row gap-5 bg-white rounded-4xl p-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center">
            <img src="" alt="" className="bg-gray-400 w-20 h-20 rounded-full" />
            <div className="flex flex-col text-xl gap-2">
              <p className="font-bold">Dopler</p>
              <p className="text-gray-500 text-lg">MAC : 00:1A:2B:3C:4D:5E</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
