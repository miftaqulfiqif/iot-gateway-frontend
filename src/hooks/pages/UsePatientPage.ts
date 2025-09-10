import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistoryMeasurement } from "../UseHistoryMeasurement";
import { Patients } from "@/models/PatientModel";
import { debounce } from "lodash";

const apiUrl = import.meta.env.VITE_API_URL;

export const UsePatientPage = () => {
  const { fetchAndFormatData, chartData } = useHistoryMeasurement();

  // Data
  const [patients, setPatients] = useState<Patients[]>([]);
  const [patientId, setPatientId] = useState(0);
  const [patient, setPatient] = useState<Patients[]>([]);
  const [countCriticalPatient, setCountCriticalPatient] = useState(0);
  const [patientEdit, setPatientEdit] = useState<Patients>();
  const selectedPatient = patients?.find(
    (item) => item.id === String(patientId)
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Detail
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [animateRows, setAnimateRows] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHistoryTable, setShowHistoryTable] = useState(false);

  // Form
  const [form, setForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Delete Patient
  const deletePatient = async (id: string) => {
    try {
      await axios
        .delete(`${apiUrl}/api/patient/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
          }
        })
        .catch((error) => {
          console.error("Error deleting patient:", error);
        })
        .finally(() => {
          fetchPatients();
        });
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Get Patient / Fetch Patient
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/patients`, {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      setPatients(response.data.data);
      setCountCriticalPatient(response.data.critical_patient);
      setCurrentPage(response.data.current_page);
      setTotalItems(response.data.total_items);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Search Patients
  const searchPatients = debounce(async (searchQuery: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/patients`, {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: limit,
          query: searchQuery,
        },
      });

      console.log(response.data.total_pages);

      if (response.data.total_pages < currentPage) {
        setCurrentPage(response.data.total_pages);
      }

      setPatients(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalItems(response.data.total_items);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, 500);

  useEffect(() => {
    if (patientId !== 0) {
      setIsVisible(true);
    }
  }, [patientId]);

  useEffect(() => {
    const fetchData = async () => {
      if (search !== "") {
        await searchPatients(search);
      } else {
        await fetchPatients();
      }

      // Re-fetch detail & measurements if visible
      if (isVisible && patientId !== 0) {
        await fetchAndFormatData(patientId.toString());
      }

      // setDetail(false);
      // setPatient(patients?.filter((patient) => patient.id === patientId));
      setAnimateRows(false);
      setTimeout(() => setAnimateRows(true), 50);
    };

    fetchData();

    return () => {
      searchPatients.cancel();
    };
  }, [currentPage, limit, search]);

  // History Measurement
  useEffect(() => {
    setAnimateRows(false);
    setTimeout(() => {
      setAnimateRows(true);
    }, 50);

    return () => searchPatients.cancel();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
  };
  const goToPage = (state: string, page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };
  const goToNextPage = (state: string) => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPreviousPage = (state: string) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const closeForm = () => {
    setForm(false);
  };

  //Filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const openDetail = (id: number) => {
    // Jika sedang terbuka dan klik item yang sama, tutup dengan animasi
    if (isVisible && patientId === id) {
      setIsDetailVisible(false);
      setTimeout(() => {
        setIsVisible(false);
        setPatientId(0);
      }, 300); // harus sesuai dengan duration animasi
      return;
    }

    // Jika sedang terbuka dan klik item berbeda, tutup dulu lalu buka baru
    if (isVisible) {
      setIsDetailVisible(false);
      setTimeout(() => {
        setPatientId(id);
        fetchAndFormatData(id.toString());
        setPatient(patients?.filter((patient) => patient.id === String(id)));
        setIsDetailVisible(true);
      }, 300);
    } else {
      // Jika belum terbuka, langsung buka
      setPatientId(id);
      fetchAndFormatData(id.toString());
      setPatient(patients?.filter((patient) => patient.id === String(id)));
      setIsVisible(true);
      setTimeout(() => {
        setIsDetailVisible(true);
      }, 10);
    }
  };

  const buttonAction = (action: string, patient: Patients) => {
    console.log(patient);
    if (action === "edit") {
      setPatientEdit(patient);
      setForm(true);
    } else if (action === "delete") {
      deletePatient(patient.id);
    }
  };

  return {
    isVisible,
    limit,
    handleLimitChange,
    filterRef,
    setShowFilter,
    showFilter,
    setPatientEdit,
    setForm,
    search,
    handleSearchChange,
    patientId,
    patients,
    countCriticalPatient,
    openDetail,
    animateRows,
    goToPreviousPage,
    goToNextPage,
    currentPage,
    totalPage,
    goToPage,
    isDetailVisible,
    setIsExiting,
    setIsVisible,
    setPatientId,
    selectedPatient,
    isExiting,
    form,
    closeForm,
    setPatients,
    fetchPatients,
    patientEdit,
    buttonAction,
    searchPatients,
    totalItems,
  };
};
