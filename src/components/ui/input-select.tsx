import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InputSelectProps = {
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

export const InputSelect = (props: InputSelectProps) => {
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
        value={value?.toString()}
      >
        <SelectTrigger className="w-full h-full rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-[9999] border border-gray-200 rounded-md shadow-lg">
          {option.map((item) => (
            <SelectItem
              key={item.value.toString()}
              value={item.value.toString()}
              className="hover:bg-[#ECECEC] text-sm px-4 py-2"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {onTouch && onError && (
        <p className="text-sm text-red-500 mt-1">{onError}</p>
      )}
    </label>
  );
};
