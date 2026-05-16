// app/dashboard/news-events/AddNewsForm.jsx
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

const newsSchema = z.object({
  heading: z.string().min(1, "Heading text is required"),
  shortParagraph: z.string().min(1, "Short paragraph is required"),
  details: z.string().optional(),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type NewsFormData = z.infer<typeof newsSchema>;

const AddNewsForm = ({
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
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);

  const methods = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      heading: editData?.heading || "",
      shortParagraph: editData?.shortParagraph || "",
      details: editData?.details || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = methods;

  const { mutate: addNews, isPending: isAdding } = useAddData(
    ["news-events"],
    "/news-events",
  );
  const { mutate: updateNews, isPending: isUpdating } = usePatchData(
    ["news-events"],
    "/news-events",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  // Get existing image from editData
  const getExistingImage = () => {
    if (!isEditMode) return [];
    if (editData?.image) {
      return [editData.image];
    }
    return [];
  };

  const existingImage = getExistingImage();

  // Handle image removal
  const handleImageRemove = (imageUrl: string) => {
    setRemovedImageUrls((prev) => [...prev, imageUrl]);
  };

  // Extract filename from URL
  const extractFilenameFromUrl = (url: string) => {
    return url.split("/").pop() || "";
  };

  const onSubmit = (data: NewsFormData) => {
    const formData = new FormData();

    // Add text fields
    formData.append("heading", data.heading);
    formData.append("shortParagraph", data.shortParagraph);
    if (data.details) formData.append("details", data.details);

    // Handle image (only one image allowed)
    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    // Send deleted image filename for backend to remove
    if (isEditMode && removedImageUrls.length > 0) {
      const filenamesToDelete = removedImageUrls
        .map(extractFilenameFromUrl)
        .join(",");
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateNews : addNews;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `News ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMsg =
          error?.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} news`;
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
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-semibold text-pBlue">
          {isEditMode ? "Edit News & Event" : "Add News & Event"}
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Thumbnail Image */}
          <ImageInputField
            name="image"
            required={false}
            label="Thumbnail Image"
            subLabel="Upload image (PNG, JPG, JPEG, up to 10MB)"
            maxFiles={1}
            existingImages={existingImage}
            onImageRemove={handleImageRemove}
          />

          {/* Heading Text */}
          <Input
            label="Heading Text"
            name="heading"
            placeholder="Enter Heading Text"
            required={true}
          />

          {/* Short Paragraph */}
          <Input
            label="Short Paragraph"
            name="shortParagraph"
            placeholder="Enter Short Paragraph Text"
            required={true}
          />

          {/* Details About Product (Rich Text Editor) */}
          <TipTapInputField
            label="Details About Product"
            name="details"
            placeholder="Enter detailed description about the news..."
          />

          {/* Action Buttons */}
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
                  ? "Save Changes"
                  : "Add News"}
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

export default AddNewsForm;
