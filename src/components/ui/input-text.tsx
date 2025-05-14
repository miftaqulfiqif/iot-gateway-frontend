type InputTextProps = {
  label?: string;
  disabled?: boolean;
  type?: string;
  placeholder: string;
  name: string;
  value: any;
  onTouch: any;
  onError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isRequired?: boolean;
};

export const InputText = (props: InputTextProps) => {
  const {
    label,
    type,
    disabled,
    placeholder,
    name,
    onChange,
    value,
    onTouch,
    onError,
    className,
    isRequired,
  } = props;
  return (
    <div className="w-full">
      <label htmlFor={name} className="w-full">
        <div className="flex">
          <p className="text-lg ml-1 mb-2">{label}</p>
          {isRequired && <span className="text-red-500">*</span>}
        </div>
        <div className={`rounded-lg focus-within:outline-1 ${className}`}>
          <input
            type={type || "text"}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={
              "bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 focus:outline-none"
            }
          />
        </div>
        {onError && onTouch && (
          <p className="text-sm text-red-500">{onError}</p>
        )}
      </label>
    </div>
  );
};
