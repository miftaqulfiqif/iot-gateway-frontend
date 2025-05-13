export const PatientInfo = () => {
  return (
    <div className="flex flex-row gap-2 bg-[#3062E5] rounded-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-3 h-fit">
      <div className="flex flex-col gap-4 px-8 py-4">
        <p className=" text-3xl">Miftaqul Fiqi Firmansyah</p>
        <div className="flex flex-row gap-4 items-center">
          <p className="bg-blue-400 px-4 py-1 rounded-full">Male</p>
          <p className="">23 years old</p>
        </div>
      </div>
    </div>
  );
};
