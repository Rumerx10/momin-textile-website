import { Controller, useFormContext } from "react-hook-form";

const Input = ({
  label,
  name,
  placeholder,
  required = false,
  requiredMessage,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  requiredMessage?: string;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-pBlue">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: required ? (requiredMessage || `${label} is required`) : false 
        }}
        render={({ field }) => (
          <div>
            <input
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              className={`
                rounded-lg px-5 border p-2 w-full
                ${errors[name] 
                  ? 'focus:ring-red-200' 
                  : 'border-borderGray'
                }
                focus:outline-none focus:ring-2 transition-all
              `}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors[name]?.message)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Input;