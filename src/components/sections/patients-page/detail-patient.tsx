type Props = {
  patientId: string;
};

const DetailPatient = ({ patientId }: Props) => {
  console.log(patientId);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 w-full p-4 rounded-xl bg-gradient-to-b from-[#4956F4] to-[#6e79f4]">
        <div className="flex flex-row text-white gap-4">
          <div className="rounded-full bg-gray-500 w-20 h-20"></div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-bold">Patient Name</p>
            <p className="text-lg">{patientId} </p>
          </div>
        </div>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
};

export default DetailPatient;
