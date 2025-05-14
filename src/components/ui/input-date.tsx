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
        <p className="text-lg ml-1 mb-2">{label}</p>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <input
        type="date"
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        className="bg-gray-100 text-sm px-4 py-2 rounded-lg w-fit disabled:bg-slate-200"
      />
      {onTouch && onError && <p className="text-sm text-red-500">{onError}</p>}
    </label>
  );
}
