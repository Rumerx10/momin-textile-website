// app/dashboard/our-concerns/AddConcernForm.jsx
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
import { useAddData, usePatchData } from "@/hooks/useApi";

// Zod Schema - matching API exactly
const concernSchema = z.object({
  cardHeading: z.string().min(1, "Card heading is required"),
  shortParagraph: z.string().min(1, "Short paragraph is required"),
  businessMotto: z.string().min(1, "Business motto is required"),
  description: z.string().min(1, "Description is required"),
  details: z.string().optional(),
  logo: z.array(z.any()).max(1, "Only one logo allowed").optional(),
  images: z.array(z.any()).max(5, "Maximum 5 images allowed").optional(),
});

type ConcernFormData = z.infer<typeof concernSchema>;

const AddConcernForm = ({
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
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [removedLogo, setRemovedLogo] = useState<string[]>([]);

  const methods = useForm<ConcernFormData>({
    resolver: zodResolver(concernSchema),
    defaultValues: {
      cardHeading: editData?.cardHeading || "",
      shortParagraph: editData?.shortParagraph || "",
      businessMotto: editData?.businessMotto || "",
      description: editData?.description || "",
      details: editData?.details || "",
      logo: [],
      images: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addConcern, isPending: isAdding } = useAddData(
    ["concerns"],
    "/concerns",
  );
  const { mutate: updateConcern, isPending: isUpdating } = usePatchData(
    ["concerns"],
    "/concerns",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  // Get existing logo from editData
  const getExistingLogo = () => {
    if (!isEditMode) return [];
    if (editData?.logo) return [editData.logo];
    return [];
  };

  // Get existing images from editData
  const getExistingImages = () => {
    if (!isEditMode) return [];
    if (editData?.images && Array.isArray(editData.images)) {
      return editData.images;
    }
    return [];
  };

  const handleLogoRemove = (logoUrl: string) => {
    setRemovedLogo((prev) => [...prev, logoUrl]);
  };

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImages((prev) => [...prev, imageUrl]);
  };

  const extractFilenames = (urls: string[]) => {
    return urls.map((url) => url.split("/").pop() || "").join(",");
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Concern" : "Add New Concern");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: ConcernFormData) => {
    const formData = new FormData();

    formData.append("cardHeading", data.cardHeading);
    formData.append("shortParagraph", data.shortParagraph);
    formData.append("businessMotto", data.businessMotto);
    formData.append("description", data.description);
    if (data.details) formData.append("details", data.details);

    // Add new logo
    if (data.logo && data.logo.length > 0) {
      const logoFile = data.logo[0];
      if (logoFile instanceof File) {
        formData.append("logo", logoFile);
      }
    }

    // Add new images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });
    }

    // Combine both removed logo and removed images into single delImg
    const allDeletedImages = [...removedLogo, ...removedImages];
    if (isEditMode && allDeletedImages.length > 0) {
      const filenamesToDelete = extractFilenames(allDeletedImages);
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateConcern : addConcern;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Concern ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(
          error?.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} concern`,
        );
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedImages([]);
    setRemovedLogo([]);
    onCancel();
  };

  return (
    <div className="bg-white rounded-md p-6">
      {/* Top Cancel Button */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-semibold text-pBlue">
          Add New Sister Concern
        </h4>
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
          {/* Upload Sister Concern Logo */}

          <ImageInputField
            name="logo"
            required={false}
            label="Upload Logo"
            subLabel=""
            maxFiles={1}
            existingImages={getExistingLogo()}
            onImageRemove={handleLogoRemove}
          />

          {/* Upload Hero Image */}

          <ImageInputField
            name="images"
            required={false}
            label="Upload Hero Image"
            subLabel=""
            maxFiles={5}
            existingImages={getExistingImages()}
            onImageRemove={handleImageRemove}
          />

          {/* Card Heading Text */}
          <Input
            label="Card Heading Text"
            name="cardHeading"
            placeholder="Enter Heading Text"
            required={true}
          />

          {/* Short Paragraph Text */}
          <Input
            label="Short Paragraph Text"
            name="shortParagraph"
            placeholder="Enter Short Paragraph Text"
            required={true}
          />

          {/* Business Moto Text */}
          <Input
            label="Business Moto Text"
            name="businessMotto"
            placeholder="Enter Business Moto Text"
            required={true}
          />

          {/* Description Heading Text */}
          <Input
            label="Description Heading Text"
            name="description"
            placeholder="Description Heading Text"
            required={true}
          />

          {/* Details Description - Using TipTapInputField */}
          <TipTapInputField
            label="Details Description"
            name="details"
            placeholder="Enter detailed description here..."
          />

          {/* Action Buttons - Bottom Cancel beside Submit */}
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
                  ? "Save Changes"
                  : "Add New Sister Concern"}
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

export default AddConcernForm;
