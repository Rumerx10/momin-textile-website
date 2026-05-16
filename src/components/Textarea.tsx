import { Controller, useFormContext } from "react-hook-form";

const Textarea = ({
  label,
  name,
  placeholder,
  required,
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
      <label className="font-bold text-pBlue">{label}</label>
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
            <textarea
              rows={5}
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              className="resize-none rounded-lg p-5 shadow border border-borderGray w-full"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm">
                {String(errors[name]?.message)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Textarea;
