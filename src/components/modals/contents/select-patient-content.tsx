import { usePatient } from "@/hooks/api/use-patient";
import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { Patients } from "@/models/PatientModel";
import { Mars, Venus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  patientSelected: any;
  setPatientSelected: (patient: any) => void;
};

const calculateAge = (dateString: string) => {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const SelectPatientContent = ({
  patientSelected,
  setPatientSelected,
}: Props) => {
  const { patients, getPatients } = usePatient({});

  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    getPatients(search, 99);
  }, [search]);

  return (
    <div className="flex flex-col h-full">
      {/* Form Search */}
      <form
        className="flex flex-row items-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="patient-name"></label>
        <div className="flex gap-2 w-full">
          <input
            ref={inputRef}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            id="patient-name"
            type="text"
            placeholder="Input patient name here"
            className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Search
          </button>
        </div>
      </form>

      {/* List Patient */}
      <div className="relative bg-white rounded-2xl mt-4 p-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] overflow-y-auto border h-[calc(320px+theme(spacing.8))] sm:h-[calc(450px+theme(spacing.8))] md:h-[calc(400px+theme(spacing.8))] lg:h-[calc(420px+theme(spacing.8))]">
        <table className="w-full text-xs md:text-sm lg:text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Patient ID</th>
              <th className="py-2 hidden md:table-cell lg:table-cell">NIK</th>
              <th className="py-2">Name</th>
              <th className="py-2">Age</th>
              <th className="py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {patients?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  {search.trim() === ""
                    ? "No patients found."
                    : "No patients found with the given search query."}
                </td>
              </tr>
            ) : (
              patients?.map((patient) => (
                <tr
                  key={patient.id}
                  className={`cursor-pointer ${
                    patientSelected?.id === patient.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100 "
                  }`}
                  onClick={() => setPatientSelected(patient)}
                >
                  <td className="p-2 text-center">{patient.id}</td>
                  <td className="p-2 text-center hidden md:table-cell lg:table-cell">
                    {patient.nik}
                  </td>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2 text-center font-bold">
                    {calculateAge(patient.date_of_birth)}{" "}
                    <span className="font-normal">years</span>
                  </td>
                  <td className="p-2 text-center flex items-center justify-center gap-1">
                    {patient.gender === "male" ? (
                      <Mars className="inline w-4 h-4 mr-1 text-blue-500" />
                    ) : (
                      <Venus className="inline w-4 h-4 mr-1 text-pink-500" />
                    )}
                    <p
                      className={`text-center font-bold rounded-full px-2 hidden md:block lg:block ${
                        patient.gender === "male"
                          ? "bg-blue-200 text-blue-900"
                          : "bg-pink-200 text-pink-900"
                      }`}
                    >
                      {patient.gender === "male" ? "Male" : "Female"}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
