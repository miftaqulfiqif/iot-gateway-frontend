type InputTextProps = {
  label?: string;
  disabled?: boolean;
  placeholder: string;
  name: string;
  value: any;
  onTouch: any;
  onError?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  isRequired?: boolean;
  rows?: number;
  maxLength?: number;
};

export const InputLongtext = (props: InputTextProps) => {
  const {
    label,
    disabled,
    placeholder,
    name,
    onChange,
    value,
    onTouch,
    onError,
    className,
    isRequired,
    rows,
    maxLength,
  } = props;
  return (
    <div className="w-full">
      <label htmlFor={name} className="w-full">
        <div className="flex">
          <p className="text-lg ml-1 mb-2">{label}</p>
          {isRequired && <span className="text-red-500">*</span>}
        </div>
        <div className={`rounded-lg focus-within:outline-0 ${className}`}>
          <textarea
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            rows={rows}
            maxLength={maxLength}
            className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <div
          className={`flex ${
            onError && onTouch ? "justify-between" : "justify-end"
          }`}
        >
          {onError && onTouch && (
            <p className="text-sm text-red-500">{onError}</p>
          )}
          {maxLength && (
            <p className="flex items-end justify-end text-sm text-gray-500">
              {value.length}/{maxLength}
            </p>
          )}
        </div>
      </label>
    </div>
  );
};
