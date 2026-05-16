// app/dashboard/our-units/AddUnitForm.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HeroContext } from "@/context/HeroContext";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Input from "@/components/Input";
import ImageInputField from "@/components/ImageInputField";
import TipTapInputField from "@/components/TipTapInputField";
import { useAddData, usePatchData3 } from "@/hooks/useApi";

// Zod Schema
const unitSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  details: z.string().min(1, "Details are required"),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type UnitFormData = z.infer<typeof unitSchema>;

const AddUnitForm = ({
  editData,
  unitType,
  onSuccess,
  onCancel,
}: {
  editData?: any;
  unitType: string;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { setTitle } = useContext(HeroContext);
  const isEditMode = !!editData;
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const methods = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      heading: editData?.heading || "",
      details: editData?.details || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addUnit, isPending: isAdding } = useAddData(["units"], "/units");
  const { mutate: updateUnit, isPending: isUpdating } = usePatchData3(["units"], `/units/${unitType}`);

  const isPending = isSubmitting || isAdding || isUpdating;

  const getExistingImage = () => {
    if (!isEditMode) return [];
    if (editData?.image) return [editData.image];
    return [];
  };

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const extractFilenames = (urls: string[]) => {
    return urls.map(url => url.split("/").pop() || "").join(",");
  };

  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  useEffect(() => {
    setTitle(isEditMode ? `Edit ${unitTypeLabels[unitType]}` : `Add New ${unitTypeLabels[unitType]}`);
  }, [setTitle, isEditMode, unitType]);

  const onSubmit = (data: UnitFormData) => {
    const formData = new FormData();

    formData.append("unitType", unitType);
    formData.append("heading", data.heading);
    formData.append("details", data.details);

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    if (isEditMode && removedImages.length > 0) {
      const filenamesToDelete = extractFilenames(removedImages);
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateUnit : addUnit;
    // For update, pass formData directly (not wrapped in an object)
    const payload = isEditMode ? formData : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(response?.message || `Unit ${isEditMode ? "updated" : "added"} successfully!`);
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(error?.response?.data?.message || `Failed to ${isEditMode ? "update" : "add"} unit`);
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedImages([]);
    onCancel();
  };

  const unitTypeLabelsDisplay: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-pBlue">
            {isEditMode ? `Edit ${unitTypeLabelsDisplay[unitType]}` : `Add New ${unitTypeLabelsDisplay[unitType]}`}
          </h4>
          <p className="text-sm text-pGray mt-1">
            {unitTypeLabelsDisplay[unitType]}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="px-8 py-3 bg-yellow-400 border border-gray-300 rounded-lg text-pBlue hover:text-white transition-colors duration-300 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Image */}
          <ImageInputField
            name="image"
            required={false}
            label="Main Image"
            subLabel="Upload Image or drag and drop PNG, JPG, GIF, up to 20MB"
            maxFiles={1}
            existingImages={getExistingImage()}
            onImageRemove={handleImageRemove}
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
              {isPending ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Save Changes" : "Add Unit")}
              <MdOutlineKeyboardArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddUnitForm;