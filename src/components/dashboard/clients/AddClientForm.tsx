// app/dashboard/clients/AddClientForm.jsx
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
import { useAddData, usePatchData } from "@/hooks/useApi";

// Zod Schema - matches API exactly
const clientSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.array(z.any()).max(1, "Only one image allowed").optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

const AddClientForm = ({
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

  const methods = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: editData?.name || "",
      description: editData?.description || "",
      image: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = methods;

  const { mutate: addClient, isPending: isAdding } = useAddData(["clients"], "/clients");
  const { mutate: updateClient, isPending: isUpdating } = usePatchData(["clients"], "/clients");

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

  const handleImageRemove = (imageUrl: string) => {
    setRemovedImageUrls((prev) => [...prev, imageUrl]);
  };

  const extractFilenameFromUrl = (url: string) => {
    return url.split("/").pop() || "";
  };

  useEffect(() => {
    setTitle(isEditMode ? "Edit Client" : "Add New Client");
  }, [setTitle, isEditMode]);

  const onSubmit = (data: ClientFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      const imageFile = data.image[0];
      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }
    }

    if (isEditMode && removedImageUrls.length > 0) {
      const filenamesToDelete = removedImageUrls.map(extractFilenameFromUrl).join(",");
      formData.append("delImg", filenamesToDelete);
    }

    const mutation = isEditMode ? updateClient : addClient;
    const payload = isEditMode
      ? { id: editData.id, payload: formData }
      : formData;

    mutation(payload as any, {
      onSuccess: (response) => {
        toast.success(response?.message || `Client ${isEditMode ? "updated" : "added"} successfully!`);
        reset();
        onSuccess();
      },
      onError: (error: any) => {
        console.error("Submission error:", error);
        const errorMsg = error?.response?.data?.message || `Failed to ${isEditMode ? "update" : "add"} client`;
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
          {isEditMode ? "Edit Client" : "Add New Client"}
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
          {/* Brand Name */}
          <Input
            label="Brand Name"
            name="name"
            placeholder="Enter Brand Name"
            required={true}
          />

          {/* Description */}
          <Input
            label="Description"
            name="description"
            placeholder="Enter Description"
            required={true}
          />

          {/* Upload Logo */}
          <ImageInputField
            name="image"
            required={false}
            label="Client Logo"
            subLabel="Upload logo (PNG, JPG, JPEG, up to 10MB)"
            maxFiles={1}
            existingImages={existingImage}
            onImageRemove={handleImageRemove}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Save Changes" : "Add Client")}
              <MdOutlineKeyboardArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddClientForm;