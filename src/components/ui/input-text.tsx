import React, { forwardRef } from "react";

type InputTextProps = {
  ref?: any;
  label?: string;
  disabled?: boolean;
  type?: string;
  placeholder: string;
  name: string;
  value: any;
  onTouch: any;
  onError?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isRequired?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
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
      onFocus,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label htmlFor={name} className="w-full">
          <div className="flex">
            <p className="text-base ml-1 mb-2">{label}</p>
            {isRequired && <span className="text-red-500">*</span>}
          </div>
          <div className={`rounded-lg focus-within:outline-1 ${className}`}>
            <input
              ref={ref}
              type={type || "text"}
              name={name}
              disabled={disabled}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              className=" bg-gray-100 text-sm px-4 py-2 rounded-lg w-full disabled:bg-slate-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          {onError && onTouch && (
            <p className="text-sm text-red-500">{onError}</p>
          )}
        </label>
      </div>
    );
  }
);
