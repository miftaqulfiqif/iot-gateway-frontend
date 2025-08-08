import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import debounce from "lodash.debounce";

const apiUrl = import.meta.env.VITE_API_URL;

export type ProvinceOption = {
  value: string;
  label: string;
};

interface ProvinceSelectProps {
  provinceId?: string;
  onChange: (selectedProvince: ProvinceOption | null) => void;
  value: ProvinceOption | null;
  onBlur?: () => void;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    backgroundColor: "#f3f4f6",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
    "&:hover": {
      borderColor: "#2563eb",
    },
    minHeight: "38px",
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e7ff" : "white",
    color: state.isFocused ? "#1e40af" : "#111827",
    padding: "10px 15px",
    margin: "5px 0",
    cursor: "pointer",
  }),
};

const ProvinceSelect: React.FC<ProvinceSelectProps> = ({
  provinceId,
  onChange,
  value,
  onBlur,
}) => {
  const [options, setOptions] = useState<ProvinceOption[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchCities = async (search: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/province`, {
        withCredentials: true,
        params: {
          codes: provinceId ?? "",
          name: search ?? "",
        },
      });

      const provinceOptions = response.data.data.map((province: any) => ({
        value: province.id,
        label: province.name,
      }));

      setOptions(provinceOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Memoized debounced function
  const debouncedFetch = useCallback(
    debounce((search: string) => {
      fetchCities(search);
    }, 500),
    [provinceId]
  );

  useEffect(() => {
    if (inputValue.length > 0) {
      debouncedFetch(inputValue);
    }
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, debouncedFetch]);

  // Fetch all province options when provinceId changes and input kosong
  useEffect(() => {
    if (provinceId && inputValue.length === 0) {
      fetchCities("");
    }
  }, [provinceId]);

  return (
    <Select
      styles={customStyles}
      value={value}
      onChange={onChange}
      onInputChange={(val) => {
        setInputValue(val);
      }}
      onBlur={onBlur}
      options={options}
      isClearable
      isSearchable
      placeholder="Select province"
      noOptionsMessage={() => "Province not found"}
      onMenuOpen={() => {
        if (options.length === 0) {
          fetchCities("");
        }
      }}
    />
  );
};

export default ProvinceSelect;
