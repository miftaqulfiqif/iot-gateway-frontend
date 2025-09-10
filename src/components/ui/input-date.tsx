type InputDateProps = {
  label: string;
  disabled?: boolean;
  name: string;
  value: string;
  onError?: string;
  onTouch: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
};

export function InputDate(props: InputDateProps) {
  const {
    label,
    disabled,
    name,
    onChange,
    value,
    onTouch,
    onError,
    isRequired,
  } = props;
  return (
    <label htmlFor="" className="w-full">
      <div className="flex">
        <p className="text-base ml-1 mb-2">{label}</p>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <input
        type="date"
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
            className={`text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out ${disabled ? "bg-gray-100" : "bg-white"}`}
      />
      {onTouch && onError && <p className="text-sm text-red-500">{onError}</p>}
    </label>
  );
}
