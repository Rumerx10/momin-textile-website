// app/dashboard/machines/AddMachineForm.jsx
"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";
import { useAddData, usePatchData } from "@/hooks/useApi";

const machineSchema = z.object({
  name: z.string().min(1, "Machine name is required"),
  brandName: z.string().min(1, "Brand name is required"),
  origin: z.string().min(1, "Origin is required"),
  quantity: z.string().min(1, "Quantity is required"),
  productionCapacity: z.string().min(1, "Production capacity is required"),
  unitType: z.string().min(1, "Unit type is required"),
  details: z.string().optional(),
  images: z.array(z.any()).max(5, "Maximum 5 images allowed").optional(),
});

type MachineFormData = z.infer<typeof machineSchema>;

const unitTypeOptions = [
  { value: "SPINNING", label: "Spinning Unit" },
  { value: "WOVEN", label: "Woven Dyeing & Finishing" },
  { value: "FABRIC", label: "Fabric Manufacturing" },
];

const AddMachineForm = ({
  editData,
  onSuccess,
  onCancel,
}: {
  editData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const isEditMode = !!editData;
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [selectedUnitType, setSelectedUnitType] = useState(
    editData?.unitType || "",
  );
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);

  const methods = useForm<MachineFormData>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      name: editData?.name || "",
      brandName: editData?.brandName || "",
      origin: editData?.origin || "",
      quantity: editData?.quantity || "",
      productionCapacity: editData?.productionCapacity || "",
      unitType: editData?.unitType || "",
      details: editData?.details || "",
      images: [],
    },
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        name: editData?.name || "",
        brandName: editData?.brandName || "",
        origin: editData?.origin || "",
        quantity: editData?.quantity || "",
        productionCapacity: editData?.productionCapacity || "",
        unitType: editData?.unitType || "",
        details: editData?.details || "",
        images: [],
      });
      setSelectedUnitType(editData?.unitType || "");
      setRemovedImageUrls([]);
    }
  }, [editData, methods.reset]);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = methods;

  const { mutate: addMachine, isPending: isAdding } = useAddData(
    ["machines"],
    "/machines",
  );
  const { mutate: updateMachine, isPending: isUpdating } = usePatchData(
    ["machines"],
    "/machines",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  // Get existing images from editData
  const getExistingImages = () => {
    if (!isEditMode) return [];
    if (editData?.images && Array.isArray(editData.images)) {
      // Filter out images that have been marked for removal
      return editData.images.filter(
        (img: string) => !removedImageUrls.includes(img),
      );
    }
    return [];
  };

  const existingImages = getExistingImages();

  // Handle image removal - track which images were removed
  const handleImageRemove = (imageUrl: string) => {
    setRemovedImageUrls((prev) => [...prev, imageUrl]);
  };

  const handleUnitTypeSelect = (value: string, label: string) => {
    setSelectedUnitType(value);
    setValue("unitType", value, { shouldValidate: true, shouldDirty: true });
    setIsUnitDropdownOpen(false);
  };

  const getSelectedUnitLabel = () => {
    const option = unitTypeOptions.find(
      (opt) => opt.value === selectedUnitType,
    );
    return option?.label || "Select Unit Type";
  };

  // Extract filename from URL
  const extractFilenameFromUrl = (url: string) => {
    return url.split("/").pop() || "";
  };

  const onSubmit = (data: MachineFormData) => {
    const formData = new FormData();

    // Add text fields
    formData.append("name", data.name);
    formData.append("brandName", data.brandName);
    formData.append("origin", data.origin);
    formData.append("quantity", data.quantity);
    formData.append("productionCapacity", data.productionCapacity);
    formData.append("unitType", data.unitType);
    if (data.details) formData.append("details", data.details);

    // Handle new images (File objects)
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    // IMPORTANT: Send deleted image filenames for backend to remove
    if (removedImageUrls.length > 0) {
      const filenamesToDelete = removedImageUrls
        .map(extractFilenameFromUrl)
        .join(",");
      formData.append("delImg", filenamesToDelete);
      console.log("Deleting images:", filenamesToDelete);
    }

    const mutation = isEditMode ? updateMachine : addMachine;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Machine ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          `Failed to ${isEditMode ? "update" : "add"} machine`;
        toast.error(errorMsg);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedImageUrls([]);
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold text-pBlue mb-6">
          {isEditMode ? "Edit Machine" : "Add New Machine"}
        </h5>
        <button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 border border-gray-300 rounded-lg bg-yellow-400
         hover:text-white text-pBlue transition-colors duration-300 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Machine Name & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Machine Name"
              name="name"
              placeholder="Enter Machine Name"
              required={true}
            />
            <Input
              label="Brand Name"
              name="brandName"
              placeholder="Enter Brand Name"
              required={true}
            />
          </div>

          {/* Row 2: Origin & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Origin"
              name="origin"
              placeholder="Enter Origin Country"
              required={true}
            />
            <Input
              label="Quantity"
              name="quantity"
              placeholder="Enter Quantity (e.g., 03 Set)"
              required={true}
            />
          </div>

          {/* Row 3: Production Capacity & Unit Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Production Capacity"
              name="productionCapacity"
              placeholder="Enter Production Capacity (e.g., 70000 MTR/DAY)"
              required={true}
            />

            <div className="space-y-2">
              <label className="block font-bold text-pBlue">
                Unit Type <span className="text-red-500">*</span>
              </label>
              <div className="relative group h-full">
                <div
                  onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                  className={`px-5 py-2 border rounded-lg bg-white cursor-pointer flex justify-between items-center whitespace-nowrap gap-2 transition-all
                    ${errors.unitType ? "border-red-500" : "border-gray-300 hover:border-pBlue"}`}
                >
                  <span
                    className={`${!selectedUnitType ? "text-pGray" : "text-pBlue"}`}
                  >
                    {getSelectedUnitLabel()}
                  </span>
                  <div
                    className={`duration-300 transition-transform ${isUnitDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <IoIosArrowDown size={16} className="text-pGray" />
                  </div>
                </div>

                {isUnitDropdownOpen && (
                  <div className="absolute left-0 mt-1 bg-white text-pGray rounded-md shadow-lg z-10 min-w-full border border-gray-200">
                    <div className="flex flex-col gap-1 p-1">
                      {unitTypeOptions.map((option, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            handleUnitTypeSelect(option.value, option.label)
                          }
                          className={`w-full text-left px-4 py-2 whitespace-nowrap text-sm rounded-md transition-all
                            ${
                              selectedUnitType === option.value
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
              {errors.unitType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.unitType.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload Images - with removal tracking */}
          <ImageInputField
            name="images"
            required={false}
            label="Machine Images"
            subLabel="Upload machine images (max 5 images, PNG, JPG, JPEG, up to 10MB each)"
            maxFiles={5}
            existingImages={existingImages}
            onImageRemove={handleImageRemove}
          />

          {/* Machine Details */}
          <TipTapInputField
            label="Machine Details"
            name="details"
            placeholder="Enter detailed description about the machine..."
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium cursor-pointer"
            >
              Cancel
            </button>
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
                  ? "Update Machine"
                  : "Add Machine"}
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

export default AddMachineForm;
