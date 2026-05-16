// app/dashboard/our-services/AddServiceForm.jsx
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

// Zod Schema
const serviceSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().min(1, "Subheading is required"),
  details: z.string().min(1, "Details are required"),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const AddServiceForm = ({
  editData,
  serviceType,
  onSuccess,
  onCancel,
}: {
  editData?: any;
  serviceType: string;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const { setTitle } = useContext(HeroContext);
  const isEditMode = !!editData;
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const methods = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      heading: editData?.heading || "",
      subheading: editData?.subheading || "",
      details: editData?.details || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addService, isPending: isAdding } = useAddData(
    ["services"],
    "/services",
  );
  const { mutate: updateService, isPending: isUpdating } = usePatchData(
    ["services"],
    `/services`,
  );

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
    return urls.map((url) => url.split("/").pop() || "").join(",");
  };

  const serviceTypeLabels: Record<string, string> = {
    GENERAL: "General Service",
    ETP: "Effluent Treatment Plant (ETP)",
    LABORATORY: "Our Laboratory",
  };

  useEffect(() => {
    setTitle(
      isEditMode
        ? `Edit ${serviceTypeLabels[serviceType]}`
        : `Add New ${serviceTypeLabels[serviceType]}`,
    );
  }, [setTitle, isEditMode, serviceType]);

  const onSubmit = (data: ServiceFormData) => {
    const formData = new FormData();

    formData.append("serviceType", serviceType);
    formData.append("heading", data.heading);
    formData.append("subheading", data.subheading);
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

    const mutation = isEditMode ? updateService : addService;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(
          response?.message ||
            `Service ${isEditMode ? "updated" : "added"} successfully!`,
        );
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        toast.error(
          error?.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "add"} service`,
        );
      },
    });
  };

  const handleCancel = () => {
    reset();
    setRemovedImages([]);
    onCancel();
  };

  const serviceTypeLabelsDisplay: Record<string, string> = {
    GENERAL: "General Service",
    ETP: "Effluent Treatment Plant (ETP)",
    LABORATORY: "Our Laboratory",
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-pBlue">
            {isEditMode
              ? `Edit ${serviceTypeLabelsDisplay[serviceType]}`
              : `Add New ${serviceTypeLabelsDisplay[serviceType]}`}
          </h4>
          <p className="text-sm text-pGray mt-1">
            {serviceTypeLabelsDisplay[serviceType]}
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
          {/* Product Image */}
          <ImageInputField
            name="image"
            required={false}
            label="Product Image"
            subLabel="Upload Image (PNG, JPG, JPEG, up to 10MB)"
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

          {/* Sub Heading Text */}
          <Input
            label="Sub Heading Text"
            name="subheading"
            placeholder="Enter Sub Heading Text"
            required={true}
          />

          {/* Details About Product - TipTapInputField */}
          <TipTapInputField
            label="Details About Product"
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
              {isPending
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Service"}
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

export default AddServiceForm;
