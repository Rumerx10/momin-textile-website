import { Controller, useFormContext } from "react-hook-form";
import { TiptapEditor } from "./TiptapEditor";

const TipTapInputField = ({
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
          required: required
            ? requiredMessage || `${label} is required`
            : false,
        }}
        render={({ field }) => (
          <div>
            <TiptapEditor
              {...field}
              value={field.value ?? ""}
              onChange={field.onChange}
              placeholder={placeholder}
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

export default TipTapInputField;
