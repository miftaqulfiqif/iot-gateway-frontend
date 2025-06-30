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
  } = props;

  return (
    <label htmlFor={name} className="w-full">
      <div className="flex">
        <p className="text-lg ml-1 mb-2">{label}</p>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <Select
        onValueChange={onChange}
        disabled={disabled}
        value={value?.toString()}
      >
        <SelectTrigger className="h-full w-full rounded-lg bg-gray-100 border-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-0">
          {option.map((item) => (
            <SelectItem
              key={item.value.toString()}
              value={item.value.toString()}
              className="hover:bg-[#ECECEC]"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {onTouch && onError && <p className="text-sm text-red-500">{onError}</p>}
    </label>
  );
};
