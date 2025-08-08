import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import debounce from "lodash.debounce";

const apiUrl = import.meta.env.VITE_API_URL;

export type DistrictOption = {
  value: string;
  label: string;
};

interface DistrictSelectProps {
  regencyId?: string;
  onChange: (selectedDistrict: DistrictOption | null) => void;
  value: DistrictOption | null;
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

const DistrictSelect: React.FC<DistrictSelectProps> = ({
  regencyId,
  onChange,
  value,
  onBlur,
}) => {
  const [options, setOptions] = useState<DistrictOption[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchCities = async (search: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/district`, {
        withCredentials: true,
        params: {
          codes: regencyId ?? "",
          name: search ?? "",
        },
      });

      const districtOptions = response.data.data.map((district: any) => ({
        value: district.id,
        label: district.name,
      }));

      setOptions(districtOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Memoized debounced function
  const debouncedFetch = useCallback(
    debounce((search: string) => {
      fetchCities(search);
    }, 500),
    [regencyId]
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
    if (regencyId && inputValue.length === 0) {
      fetchCities("");
    }
  }, [regencyId]);

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

export default DistrictSelect;
