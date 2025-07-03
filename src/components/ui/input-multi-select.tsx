import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // jika kamu pakai shadcn untuk class merge

type InputMultiSelectProps = {
  label?: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  option: { value: string; label: string }[];
  onChange: (value: string[]) => void;
  value: string[];
  onTouch?: boolean;
  onError?: string;
  isRequired?: boolean;
};

export const InputMultiSelect = ({
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
}: InputMultiSelectProps) => {
  const handleCheckboxChange = (checked: boolean, selectedValue: string) => {
    if (checked) {
      onChange([...value, selectedValue]);
    } else {
      onChange(value.filter((v) => v !== selectedValue));
    }
  };

  return (
    <label htmlFor={name} className="w-full">
      <div className="flex">
        <p className="text-lg ml-1 mb-2">{label}</p>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-full justify-start bg-gray-100"
          >
            {value.length > 0
              ? option
                  .filter((opt) => value.includes(opt.value))
                  .map((opt) => opt.label)
                  .slice(0, 4)
                  .join(", ") + (value.length > 4 ? "...." : "")
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={4}
          className="w-full p-2 space-y-1"
        >
          {option.map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={value.includes(item.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(!!checked, item.value)
                }
              />
              <span>{item.label}</span>
            </label>
          ))}
        </PopoverContent>
      </Popover>
      {onTouch && onError && <p className="text-sm text-red-500">{onError}</p>}
    </label>
  );
};
