import { UsePatientPage } from "@/hooks/pages/UsePatientPage";
import { useEffect, useRef, useState } from "react";

type Props = {
  patientSelected: (patient: any) => void;
};

export const SelectPatientContent = ({ patientSelected }: Props) => {
  const { patients, searchPatients } = UsePatientPage();

  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const handlePatientSelect = (patient: any) => {
    patientSelected(patient);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="h-[470px]">
      <form
        className="flex flex-row items-center "
        onSubmit={(e) => {
          e.preventDefault();
          searchPatients(search);
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
            // disabled={!search.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Search
          </button>
        </div>
      </form>
      <div className="relative bg-white rounded-2xl mt-4 p-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.1)] overflow-y-auto h-full border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2">NIK</th>
              <th className="py-2">Name</th>
              <th className="py-2">Place of Birth</th>
              <th className="py-2">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {patients?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  {search.trim() === ""
                    ? "No patients found."
                    : "No patients found with the given search query."}
                </td>
              </tr>
            ) : (
              patients?.map((patient) => (
                <tr
                  key={patient.id}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={handlePatientSelect.bind(null, patient)}
                >
                  <td className="p-2">{patient.nik}</td>
                  <td className="p-2">{patient.name}</td>
                  <td className="p-2">{patient.place_of_birth}</td>
                  <td className="p-2">
                    {new Intl.DateTimeFormat("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(patient.date_of_birth))}
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
