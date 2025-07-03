import { useToast } from "@/context/ToastContext";
import { DigitProIDAMeasurementHistory } from "@/models/Devices/DigitProIDAModel";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export const useDigitProIDA = () => {
  const { showToast } = useToast();
  const [historiesDigitProIDA, setHistoriesDigitProIDA] = useState<
    DigitProIDAMeasurementHistory[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [animateRows, setAnimateRows] = useState(false);

  // History Measurement
  useEffect(() => {
    setAnimateRows(false);
    setTimeout(() => {
      setAnimateRows(true);
    }, 50);

    return () => searchHistroiesDigitProIDA.cancel();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (search !== "") {
        await searchHistroiesDigitProIDA(search);
      } else {
        await getAllHistories();
      }

      // setDetail(false);
      // setPatient(patients?.filter((patient) => patient.id === patientId));
      setAnimateRows(false);
      setTimeout(() => setAnimateRows(true), 50);
    };

    fetchData();

    return () => {
      searchHistroiesDigitProIDA.cancel();
    };
  }, [currentPage, limit, search]);

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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

  const getAllHistories = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/measurement-histories-digit-pro-ida",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setHistoriesDigitProIDA(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalItems(response.data.total_items);
        setTotalPage(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  }, []);

  const searchHistroiesDigitProIDA = debounce(async (searchQuery: string) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/patients-by-hospital",
        {
          withCredentials: true,
          params: {
            page: currentPage,
            limit: limit,
            query: searchQuery,
          },
        }
      );

      console.log(response.data.total_pages);

      if (response.data.total_pages < currentPage) {
        setCurrentPage(response.data.total_pages);
      }

      setHistoriesDigitProIDA(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalItems(response.data.total_items);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, 500);

  return { historiesDigitProIDA, getAllHistories };
};
