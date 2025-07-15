import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * InputSelectWithSearch: Komponen Select dengan fitur search dan auto-focus
 */

export type InputSelectWithSearchProps = {
  label?: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  option: { value: string | boolean; label: string }[];
  onChange: (value: string) => void;
  value: string | boolean | undefined;
  onTouch?: boolean;
  onError?: string;
  isRequired?: boolean;
  className?: string;
};

export const InputSelectWithSearch = (props: InputSelectWithSearchProps) => {
  const {
    label,
    name,
    placeholder,
    disabled,
    option,
    onChange,
    value,
    onTouch,
    onError,
    isRequired,
    className,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredOptions = useMemo(() => {
    return option.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [option, searchTerm]);

  useEffect(() => {
    if (open && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  return (
    <label htmlFor={name} className={`w-full ${className}`}>
      {label && (
        <div className="flex">
          <p className="text-base ml-1 mb-2">{label}</p>
          {isRequired && <span className="text-red-500">*</span>}
        </div>
      )}

      <Select
        onValueChange={onChange}
        disabled={disabled}
        value={
          value !== undefined && value !== "" ? value.toString() : undefined
        }
        onOpenChange={(state) => {
          setOpen(state);
          if (state) setSearchTerm("");
        }}
      >
        <SelectTrigger className="w-full h-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-[9999] border border-gray-200 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <SelectItem
                key={item.value.toString()}
                value={item.value.toString()}
                className="hover:bg-[#ECECEC] text-sm px-4 py-2"
              >
                {item.label}
              </SelectItem>
            ))
          ) : (
            <div className="text-sm text-center text-gray-500 p-2">
              No options found.
            </div>
          )}
        </SelectContent>
      </Select>

      {onTouch && onError && (
        <p className="text-sm text-red-500 mt-1">{onError}</p>
      )}
    </label>
  );
};
