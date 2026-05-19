// app/dashboard/domestic-branches/AddNewAddressForm.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroContext } from "@/context/HeroContext";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Plus, X, ChevronDown } from "lucide-react";
import Input from "@/components/Input";
import { useAddData, usePatchData } from "@/hooks/useApi";
import { COUNTRY_CODES } from "@/docs/data";



// Helper function to validate phone number length
const validatePhoneNumber = (number: string, countryCode: string) => {
  const country = COUNTRY_CODES.find((c) => c.code === countryCode);
  if (!country) return false;

  // Remove any spaces or hyphens
  const cleanNumber = number.replace(/[\s-]/g, "");

  // Check if it's only digits
  if (!/^\d+$/.test(cleanNumber)) {
    return false;
  }

  return cleanNumber.length === country.phoneLength;
};

// Helper function to parse phone number from API
const parsePhoneNumber = (phone: string) => {
  if (!phone) return { countryCode: "BD", number: "" };

  // Try to match with known country codes first (more reliable)
  for (const country of COUNTRY_CODES) {
    if (phone.startsWith(country.phone)) {
      const numberWithoutCode = phone.substring(country.phone.length);
      return {
        countryCode: country.code,
        number: numberWithoutCode,
      };
    }
  }

  // Fallback: try regex pattern
  const match = phone.match(/^(\+\d+)(.*)$/);
  if (match) {
    const countryCodeObj = COUNTRY_CODES.find((c) => c.phone === match[1]);
    if (countryCodeObj) {
      return {
        countryCode: countryCodeObj.code,
        number: match[2],
      };
    }
  }

  // If no match found, return as is with default country
  return { countryCode: "BD", number: phone };
};

// Zod Schema
const emailSchema = z.object({
  address: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
});

const phoneSchema = z
  .object({
    countryCode: z.string(),
    number: z.string().min(1, "Number is required"),
  })
  .refine(
    (data) => validatePhoneNumber(data.number, data.countryCode),
    (data) => {
      const country = COUNTRY_CODES.find((c) => c.code === data.countryCode);
      const cleanNumber = data.number.replace(/[\s-]/g, "");

      if (!/^\d+$/.test(cleanNumber)) {
        return {
          message: "Phone number must contain only digits",
          path: ["number"],
        };
      }

      return {
        message: `Phone number must be exactly ${country?.phoneLength} digits for ${country?.name}`,
        path: ["number"],
      };
    },
  );

const faxSchema = z.object({
  number: z.string().optional(),
});

const branchSchema = z.object({
  officeName: z.string().min(1, "Office/Factory Name is required"),
  location: z.string().min(1, "Location Address is required"),
  officeType: z.string().min(1, "Office Type is required"),
  emails: z.array(emailSchema).min(1, "At least one email is required"),
  phones: z.array(phoneSchema).min(1, "At least one phone number is required"),
  telephones: z.array(phoneSchema),
  faxes: z.array(faxSchema),
});

type BranchFormData = z.infer<typeof branchSchema>;

const AddNewAddressForm = ({
  editData,
  onSuccess,
  onCancel,
}: {
  editData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { setTitle } = useContext(HeroContext);
  const isEditMode = !!editData;
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const closeDropdown = (id: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const methods = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      officeName: editData?.officeName || "",
      location: editData?.location || "",
      officeType: "DOMESTIC", // Changed to DOMESTIC
      emails: editData?.emails?.map((email: string) => ({
        address: email,
      })) || [{ address: "" }],
      phones: editData?.phones?.map((phone: string) =>
        parsePhoneNumber(phone),
      ) || [{ countryCode: "BD", number: "" }],
      telephones: editData?.telephones?.map((tel: string) =>
        parsePhoneNumber(tel),
      ) || [{ countryCode: "BD", number: "" }],
      faxes: editData?.faxes?.map((fax: string) => ({ number: fax })) || [
        { number: "" },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
    watch,
    trigger,
    setValue,
    getValues,
  } = methods;

  const emails = watch("emails");
  const phones = watch("phones");
  const telephones = watch("telephones");
  const faxes = watch("faxes");

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phones",
  });

  const {
    fields: telFields,
    append: appendTel,
    remove: removeTel,
  } = useFieldArray({
    control,
    name: "telephones",
  });

  const {
    fields: faxFields,
    append: appendFax,
    remove: removeFax,
  } = useFieldArray({
    control,
    name: "faxes",
  });

  // Updated API URLs
  const { mutate: addBranch, isPending: isAdding } = useAddData(
    ["contact-addresses"],
    "/contact-addresses",
  );
  const { mutate: updateBranch, isPending: isUpdating } = usePatchData(
    ["contact-addresses"],
    "/contact-addresses",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  useEffect(() => {
    setTitle(isEditMode ? "Edit Branch" : "Add New Branch");
  }, [setTitle, isEditMode]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdowns(new Set());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (data: BranchFormData) => {
    // Format data for API - regular JSON, NOT FormData
    const apiData = {
      officeName: data.officeName,
      location: data.location,
      officeType: "DOMESTIC",
      emails: data.emails.filter((e) => e.address.trim()).map((e) => e.address),
      phones: data.phones
        .filter((p) => p.number.trim())
        .map((p) => {
          const countryCode =
            COUNTRY_CODES.find((c) => c.code === p.countryCode)?.phone ||
            "+880";
          return `${countryCode}${p.number}`;
        }),
      telephones: data.telephones
        .filter((t) => t.number.trim())
        .map((t) => {
          const countryCode =
            COUNTRY_CODES.find((c) => c.code === t.countryCode)?.phone ||
            "+880";
          return `${countryCode}${t.number}`;
        }),
      faxes: data.faxes
        .filter((f) => f.number && f.number.trim())
        .map((f) => f.number || ""),
    };

    const mutation = isEditMode ? updateBranch : addBranch;
    const payload = isEditMode
      ? { id: editData.id, payload: apiData }
      : apiData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Branch ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMsg =
          error?.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} branch`;
        toast.error(errorMsg);
      },
    });
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const canAddMore = (currentLength: number) => currentLength < 3;
  const shouldShowAddButton = (currentLength: number) => currentLength < 3;

  const handleAddEmail = async () => {
    const lastIndex = emailFields.length - 1;
    const isValid = await trigger(`emails.${lastIndex}.address`);
    if (!isValid) return;
    if (!canAddMore(emailFields.length)) return;
    appendEmail({ address: "" });
  };

  const handleAddPhone = async (
    fields: any[],
    append: (value: any) => void,
    name: "phones" | "telephones",
  ) => {
    const lastIndex = fields.length - 1;
    const isValid = await trigger(`${name}.${lastIndex}.number`);
    if (!isValid) return;
    if (!canAddMore(fields.length)) return;
    append({ countryCode: "BD", number: "" });
  };

  const handleAddFax = async () => {
    const lastIndex = faxFields.length - 1;
    const isValid = await trigger(`faxes.${lastIndex}.number`);
    if (!isValid) return;
    if (!canAddMore(faxFields.length)) return;
    appendFax({ number: "" });
  };

  // Handle phone number input with length restriction
  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: "phones" | "telephones",
    index: number,
  ) => {
    const value = e.target.value.replace(/[\s-]/g, "");
    const countryCode = getValues(`${name}.${index}.countryCode`);
    const country = COUNTRY_CODES.find((c) => c.code === countryCode);

    if (country) {
      const digitsOnly = value.replace(/\D/g, "");
      const truncatedValue = digitsOnly.slice(0, country.phoneLength);
      setValue(`${name}.${index}.number`, truncatedValue, { shouldValidate: false });
    } else {
      const digitsOnly = value.replace(/\D/g, "");
      setValue(`${name}.${index}.number`, digitsOnly, { shouldValidate: false });
    }
  };

  // Handle country code change - clear existing number when country changes
  const handleCountryCodeChange = (
    name: "phones" | "telephones",
    index: number,
    newCode: string,
    dropdownId: string,
  ) => {
    setValue(`${name}.${index}.countryCode`, newCode);
    setValue(`${name}.${index}.number`, "", { shouldValidate: false });
    closeDropdown(dropdownId);
  };

  const getEmailError = (index: number) => {
    const error = errors.emails?.[index]?.address;
    if (error && typeof error === "object" && "message" in error) {
      return error.message;
    }
    return null;
  };

  const getPhoneError = (fieldName: "phones" | "telephones", index: number) => {
    const fieldErrors = errors[fieldName] as any;
    const error = fieldErrors?.[index]?.number;
    if (error && typeof error === "object" && "message" in error) {
      return error.message;
    }
    return null;
  };

  const getFaxError = (index: number) => {
    const error = errors.faxes?.[index]?.number;
    if (error && typeof error === "object" && "message" in error) {
      return error.message;
    }
    return null;
  };

  const renderEmailFieldArray = () => (
    <div className="space-y-4">
      <label className="block font-bold text-pBlue">
        Email Address <span className="text-red-500">*</span>
      </label>
      {emailFields.map((field, index) => {
        const error = getEmailError(index);
        return (
          <div key={field.id} className="flex items-start gap-4">
            <div className="flex-1">
              <input
                {...methods.register(`emails.${index}.address`)}
                placeholder="Enter Email Address"
                className={`w-full px-5 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition text-pGray ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex gap-2">
              {emailFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmail(index)}
                  className="px-3 py-3 border border-gray-300 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <X size={20} />
                </button>
              )}
              {index === emailFields.length - 1 &&
                shouldShowAddButton(emailFields.length) && (
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="h-10.5 px-3 lg:px-5 py-2 border border-gray-300 rounded-lg text-pBlue font-semibold hover:bg-gray-50 transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus size={20} />
                    <span className="hidden lg:flex">Add New</span>
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPhoneFieldArray = (
    fields: any[],
    append: (value: any) => void,
    remove: (index: number) => void,
    name: "phones" | "telephones",
    label: string,
    placeholder: string,
  ) => (
    <div className="space-y-4">
      <label className="block font-bold text-pBlue">{label}</label>
      {fields.map((field, index) => {
        const error = getPhoneError(name, index);
        const currentCountryCode = getValues(`${name}.${index}.countryCode`);
        const country = COUNTRY_CODES.find(
          (c) => c.code === currentCountryCode,
        );
        const maxLength = country?.phoneLength || 15;

        const dropdownId = `country-${name}-${index}`;
        const isOpen = openDropdowns.has(dropdownId);

        return (
          <div key={field.id} className="flex items-start gap-4">
            <div className="flex-1 flex gap-3 items-start">
              <div className="relative dropdown-container">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(dropdownId);
                  }}
                  className="px-5 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer font-medium text-pGray flex items-center gap-2 hover:border-pBlue transition h-full min-w-25"
                >
                  {COUNTRY_CODES.find((c) => c.code === currentCountryCode)?.phone || "+880"}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div 
                    className="absolute left-0 mt-1 bg-white text-pGray rounded-lg shadow-lg z-50 min-w-48 border border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-1 p-1 max-h-60 scrollbar-modern overflow-y-auto">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCountryCodeChange(name, index, c.code, dropdownId);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-md text-sm transition ${
                            currentCountryCode === c.code
                              ? "bg-pBlue/10 text-pBlue"
                              : "hover:bg-gray-100 text-pGray"
                          }`}
                        >
                          {c.phone} {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  {...methods.register(`${name}.${index}.number`, {
                    onChange: (e) => handlePhoneNumberChange(e, name, index),
                  })}
                  placeholder={`${placeholder} (${maxLength} digits)`}
                  maxLength={maxLength}
                  className={`w-full px-5 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition text-pGray ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                {!error && field.number && (
                  <p className="text-gray-400 text-xs mt-1">
                    {field.number.length}/{maxLength} digits
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-3 border border-gray-300 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <X size={20} />
                </button>
              )}
              {index === fields.length - 1 &&
                shouldShowAddButton(fields.length) && (
                  <button
                    type="button"
                    onClick={() => handleAddPhone(fields, append, name)}
                    className="h-10.5 px-3 lg:px-5 py-2 border border-gray-300 rounded-lg text-pBlue font-semibold hover:bg-gray-50 transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus size={20} />
                    <span className="hidden lg:flex">Add New</span>
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderFaxFieldArray = () => (
    <div className="space-y-4">
      <label className="block font-bold text-pBlue">Fax Number</label>
      {faxFields.map((field, index) => {
        const error = getFaxError(index);
        return (
          <div key={field.id} className="flex items-start gap-4">
            <div className="flex-1">
              <input
                {...methods.register(`faxes.${index}.number`)}
                placeholder="Enter Fax Number"
                className={`w-full px-5 py-2 border rounded-lg focus:outline-none focus:border-pBlue transition text-pGray ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex gap-2">
              {faxFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFax(index)}
                  className="px-3 py-3 border border-gray-300 rounded-lg text-red-500 hover:bg-red-50 transition"
                >
                  <X size={20} />
                </button>
              )}
              {index === faxFields.length - 1 &&
                shouldShowAddButton(faxFields.length) && (
                  <button
                    type="button"
                    onClick={handleAddFax}
                    className="h-10.5 px-3 lg:px-5 py-2 border border-gray-300 rounded-lg text-pBlue font-semibold hover:bg-gray-50 transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus size={20} />
                    <span className="hidden lg:flex">Add New</span>
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-semibold text-pBlue">
          {isEditMode ? "Edit Branch" : "Add New Branch"}
        </h5>
        <button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Office/Factory Name"
              name="officeName"
              placeholder="Enter Office/Factory Name"
              required={true}
            />
            <Input
              label="Location Address"
              name="location"
              placeholder="Enter Location Address"
              required={true}
            />
          </div>

          {renderEmailFieldArray()}
          {renderPhoneFieldArray(
            phoneFields,
            appendPhone,
            removePhone,
            "phones",
            "Phone Number *",
            "Enter Phone Number",
          )}
          {renderPhoneFieldArray(
            telFields,
            appendTel,
            removeTel,
            "telephones",
            "Telephone No",
            "Enter Telephone Number",
          )}
          {renderFaxFieldArray()}

          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Branch"
                  : "Add Branch"}
              <MdOutlineKeyboardArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddNewAddressForm;