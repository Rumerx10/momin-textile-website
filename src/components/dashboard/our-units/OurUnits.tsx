// app/dashboard/our-units/page.jsx
"use client";
import { useState } from "react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";
import { useFetchData, usePatchData3, useAddData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UnitSkeleton from "./UnitSkeleton";

// Zod Schema
const unitSchema = z.object({
  heading: z.string().min(1, "Heading text is required"),
  details: z.string().min(1, "Details are required"),
  image: z.array(z.any()).optional(),
});

type UnitFormData = z.infer<typeof unitSchema>;

const unitTypes = [
  { value: "SPINNING", label: "Spinning Unit" },
  { value: "WOVEN", label: "Woven Dyeing & Finishing" },
  { value: "FABRIC", label: "Fabric Manufacturing" },
];

const OurUnits = () => {
  const [selectedUnitType, setSelectedUnitType] = useState("SPINNING");
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");

  // Fetch unit data for selected type
  const { data: apiData, isLoading, refetch } = useFetchData(
    ["units", selectedUnitType],
    `/units/${selectedUnitType}`,
    { enabled: true, refetchOnMount: true }
  );

  // Update unit data
  const { mutate: updateUnit, isPending: isUpdating } = usePatchData3(
    ["units"],
    `/units/${selectedUnitType}`
  );

  // Create new unit
  const { mutate: addUnit, isPending: isAdding } = useAddData(["units"], "/units");

  const methods = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      heading: "",
      details: "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const unitData = apiData?.data;
  const isDataAvailable = !!unitData;

  // Set form values when data loads
  if (unitData && !isEditMode && existingImageUrl === "") {
    reset({
      heading: unitData.heading || "",
      details: unitData.details || "",
      image: [],
    });
    setExistingImageUrl(unitData.image || "");
  }

  const onSubmit = (data: UnitFormData) => {
    const formData = new FormData();

    formData.append("unitType", selectedUnitType);
    formData.append("heading", data.heading);
    formData.append("details", data.details);

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    const mutation = isDataAvailable ? updateUnit : addUnit;
    mutation(formData as any, {
      onSuccess: (response) => {
        toast.success(response?.message || `Unit ${isDataAvailable ? "updated" : "added"} successfully!`);
        setIsEditMode(false);
        refetch();
        reset();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(error?.response?.data?.message || `Failed to ${isDataAvailable ? "update" : "add"} unit`);
      },
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
    if (unitData) {
      reset({
        heading: unitData.heading || "",
        details: unitData.details || "",
        image: [],
      });
      setExistingImageUrl(unitData.image || "");
    }
  };

  const handleUnitTypeChange = (type: string) => {
    setSelectedUnitType(type);
    setIsEditMode(false);
    setExistingImageUrl("");
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <DashboardBodyContent
        title="Our Units"
        addBtnText=""
        openAddModal={false}
        setOpenAddModal={() => {}}
        addBtn={false}
      >
        <div className="mb-6 flex gap-3 items-center justify-center">
          {unitTypes.map((type) => (
            <div
              key={type.value}
              className="h-10 w-32 bg-gray-200 rounded-sm animate-pulse"
            ></div>
          ))}
        </div>
        <UnitSkeleton />
      </DashboardBodyContent>
    );
  }

  return (
    <DashboardBodyContent
      title="Our Units"
      addBtnText=""
      openAddModal={false}
      setOpenAddModal={() => {}}
      addBtn={false}
    >
      {/* Unit Type Toggle Buttons */}
      <div className="mb-6 flex gap-3 items-center justify-center">
        {unitTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleUnitTypeChange(type.value)}
            className={`duration-300 font-medium rounded-sm py-2 px-8 ${
              selectedUnitType === type.value
                ? "bg-pBlue text-white"
                : "bg-gray-200 text-pBlue hover:bg-pBlue/80 hover:text-white"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg p-6">
        {/* Edit Button */}
        {!isEditMode && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditMode(true)}
              className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors"
            >
              {isDataAvailable ? "Edit Unit" : "Add Unit"}
            </button>
          </div>
        )}

        {isEditMode ? (
          // Edit Mode Form
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Main Image */}
              <ImageInputField
                name="image"
                required={false}
                label="Main Image"
                subLabel="Upload Image or drag and drop PNG, JPG, GIF, up to 20MB"
                maxFiles={1}
                existingImages={existingImageUrl ? [existingImageUrl] : []}
              />

              {/* Heading Text */}
              <Input
                label="Heading Text"
                name="heading"
                placeholder="Enter Heading Text"
                required={true}
              />

              {/* Details Text - TipTapInputField */}
              <TipTapInputField
                label="Details Text"
                name="details"
                placeholder="Enter detailed description..."
              />

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border bg-yellow-400 rounded-lg text-pBlue hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUpdating || isAdding}
                  className="px-6 py-2 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors flex items-center gap-2"
                >
                  {isSubmitting || isUpdating || isAdding ? "Saving..." : "Save Changes"}
                  <MdOutlineKeyboardArrowRight size={18} />
                </button>
              </div>
            </form>
          </FormProvider>
        ) : (
          // View Mode
          <div className="space-y-6">
            {/* Main Image */}
            {existingImageUrl && (
              <div>
                <h6 className="font-bold text-pBlue text-lg mb-3">Main Image</h6>
                <div className="relative w-60 h-60 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={existingImageUrl}
                    alt={unitData?.heading || "Unit image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Heading Text */}
            <div className="border rounded-md px-4 py-2">
              <h6 className="font-bold text-pBlue text-lg mb-2">Heading Text</h6>
              <p className="text-pGray">{unitData?.heading || "-"}</p>
            </div>

            {/* Details Text */}
            <div className="border rounded-md px-4 py-2">
              <h6 className="font-bold text-pBlue text-lg mb-2">Details Text</h6>
              <div 
                className="text-pGray prose max-w-none"
                dangerouslySetInnerHTML={{ __html: unitData?.details || "-" }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardBodyContent>
  );
};

export default OurUnits;