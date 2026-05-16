// app/dashboard/media/AddMediaForm.jsx
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
import FormDropdown from "@/components/FormDropdown";
import { useAddData, usePatchData } from "@/hooks/useApi";

const mediaTypeOptions = [
  { value: "IMAGE", label: "Image" },
  { value: "VIDEO", label: "Video" },
];

const unitTypeOptions = [
  { value: "SPINNING", label: "Spinning Unit" },
  { value: "WOVEN", label: "Woven Dyeing & Finishing" },
  { value: "FABRIC", label: "Fabric Manufacturing" },
];

const mediaSchema = z.object({
  mediaType: z.string().min(1, "Media type is required"),
  unitType: z.string().min(1, "Category unit is required"),
  caption: z.string().optional(),
  subheading: z.string().optional(),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
  url: z.string().optional(),
});

type MediaFormData = z.infer<typeof mediaSchema>;

const AddMediaForm = ({
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
  const [selectedMediaType, setSelectedMediaType] = useState(
    editData?.mediaType || "IMAGE",
  );
  const [selectedUnitType, setSelectedUnitType] = useState(
    editData?.unitType || "",
  );
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);

  const methods = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      mediaType: editData?.mediaType || "IMAGE",
      unitType: editData?.unitType || "",
      caption: editData?.caption || "",
      subheading: editData?.subheading || "",
      image: [],
      url: editData?.url || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = methods;

  const { mutate: addMedia, isPending: isAdding } = useAddData(
    ["media"],
    "/media",
  );
  const { mutate: updateMedia, isPending: isUpdating } = usePatchData(
    ["media"],
    "/media",
  );

  const isPending = isSubmitting || isAdding || isUpdating;

  const getExistingImage = () => {
    if (!isEditMode) return [];
    if (editData?.image) return [editData.image];
    return [];
  };

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImageUrls((prev) => [...prev, imageUrl]);
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Media" : "Add New Media");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: MediaFormData) => {
    const formData = new FormData();

    formData.append("mediaType", data.mediaType);
    formData.append("unitType", data.unitType);
    if (data.caption) formData.append("caption", data.caption);
    if (data.subheading) formData.append("subheading", data.subheading);
    if (data.url) formData.append("url", data.url);

    if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
      formData.append("image", data.image[0]);
    }

    const mutation = isEditMode ? updateMedia : addMedia;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Media ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} media`,
        );
      },
    });
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-semibold text-pBlue">
          {isEditMode ? "Edit Media" : "Add New Media"}
        </h5>
        <button
          type="button"
          onClick={onCancel}
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
            existingImages={getExistingImage()}
            onImageRemove={handleImageRemove}
          />

          {/* Caption Text */}
          <Input
            label="Caption Text"
            name="caption"
            placeholder="Enter Caption Text"
          />

          {/* Subheading Text */}
          <Input
            label="Subheading Text"
            name="subheading"
            placeholder="Enter Subheading Text"
          />

          {/* Row: Media Type & Category Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDropdown
              label="Media Type"
              value={selectedMediaType}
              options={mediaTypeOptions}
              placeholder="Select Media Type"
              error={errors.mediaType?.message}
              required={true}
              onChange={(value) => {
                setSelectedMediaType(value);
                setValue("mediaType", value, { shouldValidate: true });
              }}
            />

            <FormDropdown
              label="Category Unit"
              value={selectedUnitType}
              options={unitTypeOptions}
              placeholder="Select Category Unit"
              error={errors.unitType?.message}
              required={true}
              onChange={(value) => {
                setSelectedUnitType(value);
                setValue("unitType", value, { shouldValidate: true });
              }}
            />
          </div>

          {/* Video URL (only if media type is VIDEO) */}
          {selectedMediaType === "VIDEO" && (
            <Input
              label="Video URL"
              name="url"
              placeholder="Enter YouTube or Video URL"
            />
          )}

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
                  : "Add Media"}
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

export default AddMediaForm;
