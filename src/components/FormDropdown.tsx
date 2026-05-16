// components/FormDropdown.jsx
"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface FormDropdownProps {
  label?: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  placeholder: string;
  error?: string;
  required?: boolean;
  onChange: (value: any) => void;
}

const FormDropdown = ({
  label,
  value,
  options,
  placeholder,
  error,
  required = false,
  onChange,
}: FormDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedLabel = () => {
    const option = options.find((opt) => opt.value === value);
    return option?.label || placeholder;
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-bold text-pBlue">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`px-5 py-2 border rounded-lg bg-white cursor-pointer flex justify-between items-center gap-2 transition-all
            ${error ? "border-red-500" : "hover:shadow"}`}
        >
          <span className={!value ? "text-pGray" : "text-pBlue"}>
            {getSelectedLabel()}
          </span>
          <div
            className={`duration-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
          >
            <IoIosArrowDown size={16} className="text-pGray" />
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 mt-1 bg-white text-pGray rounded-md shadow-lg z-10 min-w-full border border-gray-200">
            <div className="flex flex-col gap-1 p-1 max-h-60 overflow-y-auto scrollbar-modern">
              {options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 whitespace-nowrap text-sm rounded-md transition-all
                    ${
                      value === option.value
                        ? "bg-pBlue text-white"
                        : "hover:bg-pBlue/10 hover:text-pBlue"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormDropdown;
