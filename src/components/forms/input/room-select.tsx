import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import debounce from "lodash.debounce";

const apiUrl = import.meta.env.VITE_API_URL;

export type RoomOption = {
  value: string;
  label: string;
};

interface RoomSelectProps {
  name: string;
  roomId?: string;
  onChange: (selectedRoom: RoomOption | null) => void;
  value: RoomOption | null;
  onBlur?: () => void;
  disabled?: boolean;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "0.75rem",
    backgroundColor: state.isDisabled ? "#f3f4f6" : "#ffffffff",
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

const RoomSelect: React.FC<RoomSelectProps> = ({
  name,
  roomId,
  onChange,
  value,
  onBlur,
  disabled,
}) => {
  const [options, setOptions] = useState<RoomOption[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchRooms = async (search: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/get-rooms-for-gateway`, {
        withCredentials: true,
        params: {
          query: search,
        },
      });

      const roomOptions = response.data.data.map((room: any) => ({
        value: room.id,
        label: room.label,
      }));

      setOptions(roomOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Memoized debounced function
  const debouncedFetch = useCallback(
    debounce((search: string) => {
      fetchRooms(search);
    }, 500),
    [roomId]
  );

  useEffect(() => {
    if (inputValue.length > 0) {
      debouncedFetch(inputValue);
    }
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, debouncedFetch]);

  // Fetch all room options when roomId changes and input kosong
  useEffect(() => {
    if (roomId && inputValue.length === 0) {
      fetchRooms("");
    }
  }, [roomId]);

  return (
    <Select
      name={name}
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
      placeholder="Select room"
      noOptionsMessage={() => "Room not found"}
      onMenuOpen={() => {
        if (options.length === 0) {
          fetchRooms("");
        }
      }}
      isDisabled={disabled}
    />
  );
};

export default RoomSelect;
